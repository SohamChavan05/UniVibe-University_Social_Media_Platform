import React, { useState, useEffect } from "react";
import axios from "axios";
import feedData from "../home/feedData.json";
import InforCard from "../home/InforCard";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", bio: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [userFeeds,setUserFeeds] = useState(null)

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/u/getUser", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.details);
        setUpdatedUser({
          name: response.data.details.name,
          bio: response.data.details.bio || "",
          profilePic: response.data.details.imageUrl || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeed = async()=>{
      try{
        const response = await axios.get('http://localhost:8000/feed/getFeed',{
          headers: {Authorization: `Bearer ${token}`},
        })
        if(response.status===200){
          setUserFeeds(response.data.details)
        }else{
        console.log(response.data.message)
        }
      }catch (error) {
        console.error("Error fetching feed:", error.response?.data || error.message);
      }
    }
    fetchFeed();
    fetchUserProfile();
  },[] );  // <- Avoid infinite re-renders
  
  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    try {
        // Update Name & Bio
        await axios.put(
            "http://localhost:8000/u/updateUser",
            { name: updatedUser.name, bio: updatedUser.bio },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Upload Profile Picture if selected
        let updatedProfilePic = user.profilePic;
        if (selectedFile) {
            const formData = new FormData();
            formData.append("profilePic", selectedFile);

            const response = await axios.post(
                "http://localhost:8000/u/uploadProfilePicture",
                formData,
                { 
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`  
                    } 
                }
            );

            updatedProfilePic = response.data.details.imageUrl; // Update profile picture URL
        }

        // ✅ Update state immediately (No need to fetch again)
        setUser(prev => ({
            ...prev,
            name: updatedUser.name,
            bio: updatedUser.bio,
            profilePic: updatedProfilePic
        }));

        setIsEditing(false); // Close modal

    } catch (error) {
        console.error("Error updating profile:", error);
    }
};



  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;


  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-8">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border">
          {console.log(user)}
          {user ?  (
            <img src={`http://localhost:8000${user.imageUrl}`} alt="Profile Picture" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
              {user?.name?.charAt(0)}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name}</h2>
            <button
              className="px-4 py-1 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          </div>
          <p className="text-gray-600">{user?.enrollment}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around text-center my-6">
        <div>
          <span className="text-lg font-bold">{user?.joinedCommunity?.length || 0}</span>
          <p className="text-gray-500">Communities</p>
        </div>
        <div>
          <span className="text-lg font-bold">{user?.requests?.length || 0}</span>
          <p className="text-gray-500">Requests</p>
        </div>
        <div>
          <span className="text-lg font-bold">{user?.contacts?.length || 0}</span>
          <p className="text-gray-500">Contacts</p>
        </div>
      </div>

      {/* Bio Section */}
      <p className="text-gray-700 text-sm text-center italic">{user?.bio || "No bio added yet."}</p>

      {/* User's Posts Section */}
      <p className="text-lg font-semibold text-gray-800 mt-6">My Posts</p>

      {userFeeds && userFeeds.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {userFeeds.map((userFeed, index) => (
            <div key={index} className="w-70 h-90">
              <InforCard name={userFeed.createdBy.name} enrollment={userFeed.createdBy.enrollment} feedImage={userFeed.feedImageUrl} caption={userFeed.caption} profilePic={userFeed.createdBy.imageUrl}/>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No posts yet.</p>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            
            {/* Name Field */}
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Bio Field */}
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              value={updatedUser.bio}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            ></textarea>

            {/* Profile Picture Upload */}
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-1 bg-gray-300 rounded-md" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md" onClick={handleSaveChanges}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
