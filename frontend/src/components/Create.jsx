import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

const Create = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle File Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Drag & Drop Upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("feedImage", image); // ✅ Match backend multer key
    formData.append("caption", caption);

    setLoading(true);
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
            "http://localhost:8000/f/uploadFeedImage", // ✅ Updated API endpoint
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

      if (response.status === 200) { // ✅ Changed status code from 201 to 200
        alert("Post created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("Failed to create post. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div 
      className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Create a New Post</h2>
      
      {/* Drag & Drop Image Upload */}
      <div 
        className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full rounded-lg object-cover" />
        ) : (
          <div className="flex flex-col items-center">
            <Upload size={40} className="text-gray-500" />
            <p className="text-gray-600 mt-2">Drag & Drop an image or</p>
            <label className="text-blue-500 cursor-pointer hover:underline">
              Click to Upload
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>
          </div>
        )}
      </div>

      {/* Caption Input */}
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full mt-4 p-3 border rounded-md resize-none focus:ring-2 focus:ring-blue-400"
        rows="3"
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className={`w-full mt-4 py-2 text-white rounded-md transition-all ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </motion.div>
  );
};

export default Create;
