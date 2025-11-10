import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const CommunityLayout = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [enrollment, setEnrollment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunities = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found, please log in.");
        setLoading(false);
        navigate("/login");
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:8000/cm/getAllCommunity", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // console.log(response.data.details); // Debugging
  
        if (response.data?.details) {
          setCommunities(response.data.details); // Ensure it's not undefined
        } else {
          setCommunities([]); // Set empty array if details are missing
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
        setCommunities([]); // Ensure it's not undefined
      } finally {
        setLoading(false);
      }
    };
  
    fetchCommunities();
  }, []);


  const handleOpenModal = (community) => {
    setSelectedCommunity(community);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEnrollment("");
  };

  const handleAddMember = async () => {
    if (!selectedCommunity || !enrollment.trim()) {
      alert("Please enter an enrollment number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8000/cm/addMember`,
        { name: selectedCommunity.name, userEnrollment:enrollment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message || "Member added successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member.");
    }
  };

  

  return (
    <div className="flex h-screen">
  {/* Left Side - Community List */}
  <div className="w-2/5 bg-gray-100 p-4 border-r">
    <h2 className="text-xl font-semibold mb-4">Communities</h2>
    {loading ? (
      <div className="animate-pulse bg-gray-300 h-12 w-full mb-2 rounded-md"></div>
    ) : communities.length > 0 ? (
      communities.map((community) => (
        <NavLink to={`/community/${community.name}`} key={community._id} className="mb-2 p-4 bg-white shadow-md rounded-md flex justify-between items-center">
          <div className="block">
            <h3 className="text-lg font-medium">{community.name}</h3>
          </div>
          
          {/* Show Add Member button only if the user is the creator */}
          {community.isCreator && (
            <button
              className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => handleOpenModal(community)}
            >
              Add Member
            </button>
          )}
        </NavLink>
      ))
    ) : (
      <p className="text-gray-500">No communities found.</p>
    )}
  </div>

  {/* Right Side - Community Posts (Changes with Outlet) */}
  <div className="w-3/4 p-4">
    <Outlet />
  </div>

  {/* Modal for Adding Member */}
  {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Member</h2>
            <p className="mb-2">Community: <strong>{selectedCommunity?.name}</strong></p>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter enrollment number"
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-gray-300 rounded-md mr-2" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" onClick={handleAddMember}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
</div>

  );
};

export default CommunityLayout;
