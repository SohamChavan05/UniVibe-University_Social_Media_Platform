import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate()
  const [loginLogout,setLoginLogout] = useState(true)
  useEffect(()=>{
    if (localStorage.getItem('token')){
      setLoginLogout(false)
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    setLoginLogout(true)
    navigate("/"); // Redirect to login page
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-[4rem] bg-[rgba(252,252,253,1)] flex items-center shadow-md px-[2rem]">
        <div className="w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-lg">
          <img
            src="./UvLogo.png"
            alt="Logo"
            className="w-full rounded-xl ml-8"
          />
        </div>
        <div className="flex-1"></div>
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
        {loginLogout && <NavLink to="/login">
          <button className="bg-[rgba(24,119,242,1)] h-[2.25rem] text-[#f2f7fd] w-[6rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer">
            Login
          </button>
        </NavLink>}
        {!loginLogout && 
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 h-[2.25rem] text-[#f2f7fd] w-[6rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer">
            Logout
          </button>}
      </div>
    </>
  );
};

export default Search;
