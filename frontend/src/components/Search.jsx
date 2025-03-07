import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

<<<<<<< HEAD
const Search = ({loginLogout,setLoginLogout}) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      console.log(localStorage.getItem('userId'))
      setLoginLogout(false)
=======
const Search = ({ loginLogout, setLoginLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoginLogout(false);
>>>>>>> sk
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const enrollment = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `http://localhost:8000/lr/logout/${enrollment}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setLoginLogout(true);
      } else {
        console.log("Logout unsuccessful");
      }
    } catch (error) {
<<<<<<< HEAD
        localStorage.removeItem("token"); // ✅ Clear token after successful logout
        localStorage.removeItem("userId");
        setLoginLogout(true)
        console.error("Logout failed:", error.response?.data || error.message);
=======
      setLoginLogout(true);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      console.error("Logout failed:", error.response?.data || error.message);
>>>>>>> sk
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-[4rem] bg-[rgba(252,252,253,1)] flex items-center shadow-md px-[2rem]">
        <div className="w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-lg">
          <img src="./UvLogo.png" alt="Logo" className="w-full rounded-xl ml-8" />
        </div>
        <div className="flex-1"></div>
        
        {/* Search Bar */}
        <div className="search bg-[rgba(244,245,248,1)] rounded-lg flex items-center px-[0.75rem] py-[0.5rem]">
          <FontAwesomeIcon
            icon={faSearch}
            className="w-[1.25rem] h-[1.25rem] text-[rgba(172,182,196,1)]"
          />
          <input
            type="search"
            placeholder="Search"
            className="placeholder:text-[rgba(172,182,196,1)] text-[rgb(32,69,85)] outline-none ml-[0.5rem]"
          />
        </div>

        {/* Create Button (Only visible when logged in) */}
        {!loginLogout && (
          <button
            className="bg-green-500 hover:bg-green-600 h-[2.25rem] text-[#f2f7fd] w-[7rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer"
            onClick={() => navigate("/create")}
          >
            <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
            Create
          </button>
        )}

        {/* Login / Logout Button */}
        {loginLogout ? (
          <NavLink to="/login">
            <button className="bg-[rgba(24,119,242,1)] h-[2.25rem] text-[#f2f7fd] w-[6rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer">
              Login
            </button>
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 h-[2.25rem] text-[#f2f7fd] w-[6rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Search;
