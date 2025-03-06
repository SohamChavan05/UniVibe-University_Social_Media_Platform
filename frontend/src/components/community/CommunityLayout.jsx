import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const CommunityLayout = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setCommunities(response.data.details.joinedCommunity);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Side - Community List */}
      <div className="w-2/5 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-semibold mb-4">Communities</h2>
        {loading ? (
          <div className="animate-pulse bg-gray-300 h-12 w-full mb-2 rounded-md"></div>
        ) : communities.length > 0 ? (
          communities.map((community) => (
            <NavLink key={community._id} to={`/community/${community.name}`}>
              <div className="mb-2 p-4 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100 transition">
                <h3 className="text-lg font-medium">{community.name}</h3>
              </div>
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
    </div>
  );
};

export default CommunityLayout;
