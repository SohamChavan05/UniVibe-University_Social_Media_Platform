// Get all comments with nested replies 
app.get('/api/comments', async (req, res) => {
    const userId = req.query.userId;
    try {
      const { rows } = await pool.query(`
        SELECT 
          c.id,
          c.text,
          c.parent_id as "parentId",
          c.likes,
          c.user_name as "userName",
          c.user_profile_pic as "userProfilePic",
          c.created_at as "createdAt",
          EXISTS (SELECT 1 FROM comment_likes WHERE user_id = $1 AND comment_id = c.id) as "likedByUser"
        FROM comments c
        ORDER BY c.created_at DESC
      `, [userId]);
  
      const buildTree = (comments, parentId = null) => {
        return comments
          .filter(comment => comment.parentId === parentId)
          .map(comment => ({
            ...comment,
            replies: buildTree(comments, comment.id)
          }));
      };
  
      res.json(buildTree(rows));
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Create new comment
  app.post('/api/comments', async (req, res) => {
    const { text, parentId, userName, userProfilePic } = req.body;
    try {
      const { rows } = await pool.query(
        'INSERT INTO comments (text, parent_id, user_name, user_profile_pic) VALUES ($1, $2, $3, $4) RETURNING *',
        [text, parentId, userName, userProfilePic]
      );
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Update comment
  app.put('/api/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { text, userName } = req.body;
    
    try {
      const { rows } = await pool.query(
        'UPDATE comments SET text = $1 WHERE id = $2 AND user_name = $3 RETURNING *',
        [text, id, userName]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Comment not found or unauthorized' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Delete comment
  app.delete('/api/comments/:id', async (req, res) => {
    const { id } = req.params;
    const { userName } = req.body;
  
    try {
      const { rowCount } = await pool.query(
        'DELETE FROM comments WHERE id = $1 AND user_name = $2',
        [id, userName]
      );
  
      if (rowCount === 0) {
        return res.status(404).json({ error: 'Comment not found or unauthorized' });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  // Toggle like ka function
  app.post('/api/comments/:id/like', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
      await pool.query('BEGIN');
      
      const likeExists = await pool.query(
        'SELECT 1 FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
        [userId, id]
      );
  
      if (likeExists.rowCount > 0) {
        await pool.query(
          'DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2',
          [userId, id]
        );
        await pool.query(
          'UPDATE comments SET likes = likes - 1 WHERE id = $1',
          [id]
        );
      } else {
        await pool.query(
          'INSERT INTO comment_likes (user_id, comment_id) VALUES ($1, $2)',
          [userId, id]
        );
        await pool.query(
          'UPDATE comments SET likes = likes + 1 WHERE id = $1',
          [id]
        );
      }
      
      await pool.query('COMMIT');
      res.json({ success: true });
    } catch (error) {
      await pool.query('ROLLBACK');
      console.error(error);
      res.status(500).send('Server error');
    }
  });