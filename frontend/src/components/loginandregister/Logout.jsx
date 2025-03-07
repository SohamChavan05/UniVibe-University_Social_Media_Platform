import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const enrollment = localStorage.getItem("userId");

    try {
        const response = await axios.post(
            `http://localhost:8000/lr/logout/${enrollment}`,
            {}, // Empty request body
            {
                headers: { Authorization: `Bearer ${token}` }, // ✅ Corrected `headers`
            }
        );

        if (response.status === 200) {
            localStorage.removeItem("token"); // ✅ Clear token after successful logout
            localStorage.removeItem("userId");
            navigate("/login");
        } else {
            console.log("Logout unsuccessful");
        }
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
};

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Logout
    </button>
  );
};

export default LogoutButton;
