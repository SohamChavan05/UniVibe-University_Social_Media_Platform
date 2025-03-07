
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const LeftBar = ({loginLogout,setLoginLogout}) => {
  const [name, setName] = useState("Name");
  const [userName, setUserName] = useState("Enrollment");
  const [userProfilePicture, setUserProfilePicture] = useState(
    "/images/logo.png"
  );
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const fetch = async()=>{
      try{
        const response = await axios.get('http://localhost:8000/u/getUser',
          { headers: { Authorization: `Bearer ${token}` }}
        )
        setName(response.data.details.name)
        setUserName(response.data.details.enrollment)
        setUserProfilePicture(response.data.details.imageUrl)
      }catch(err){
        setName("Name")
        setUserName("Enrollment")
        setUserProfilePicture("/images/logo.png")
        console.log(err.message)
      }
    }
    fetch()
  },[loginLogout])

  return (
    <div className="fixed top-15 left-0 h-screen w-[25vw] flex flex-col items-end bg-white">
      <div className="w-[25vw] h-[100vh] flex flex-col items-end">
        {/* Profile Card */}
        <div className="h-[5.125rem] w-[16.8rem] bg-[rgba(252,252,253,1)] mt-[1.5625rem] rounded-[0.5rem] flex items-center p-[0.5rem] shadow-md transition-transform duration-500 hover:scale-103">
          <img
            src={`http://localhost:8000${userProfilePicture}`}
            alt="Profile image"
            className="w-10 h-10 rounded-[1rem] ml-[0.625rem] object-cover"
          />
          <div className="ml-[0.625rem]">
            <h3 className="text-[#18263a] font-bold text-[0.9375rem]">
              {name}
            </h3>
            <p className="text-[#324c70] italic text-[0.75rem]">{userName}</p>
          </div>
        </div>

        <div className="h-[18rem] w-[16.8rem] bg-[rgba(252,252,253,1)] mt-2 rounded-[1rem] flex flex-col items-center shadow-md">
          <div className="p-[0.625rem] w-full">
            {[
              {
                icon: (
                <img src="./images/Home.png"></img>
                ),
                label: "Home",
              },
              {
                icon: (
                  <img src="./images/Community.png"></img>
                ),
                label: "Community",
              },
              {
                icon: (
                  <img src="./images/Profile.png"></img>
                ),
                label: "Profile",
              },
              {
                icon: (
                  <img src="./images/Settings.png"></img>
                ),
                label: "Settings",
              },
            ].map((item, index) => (
              <NavLink key={index} to={item.label==='Home' ? '/':`/${item.label}`}>
              <div
                className={`w-[14.3rem] h-[4rem] flex items-center justify-start px-4 transition-transform duration-500 rounded-md cursor-pointer hover:bg-[#f3f3f3] hover:scale-105 ${
                  index !== 4
                    ? ""
                    : ""
                }`}
              >
                <div className="w-[2.5rem] flex justify-center">
                  {item.icon}
                </div>
                <p className="text-back font-bold text-[0.9375rem] ml-[0.5rem]">
                  {item.label}
                </p>
              </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-col items-center mt-4">
          <div className="h-[1.875rem] text-[rgba(172,182,196,255)] font-bold mb-[0.9375rem]">
            INVITATIONS
          </div>

          <div className="h-[18rem] w-[14rem] bg-[rgba(252,252,253,1)] rounded-[0.5rem] flex flex-col items-center shadow-md relative transition-transform duration-500 hover:scale-103">
            <div className="w-full object-cover h-full bg-[url('/images/invitation.png')] bg-cover rounded-[0.5rem] flex items-center justify-center mt-[0.625rem]">
              <p className="text-white font-bold text-4xl">Coding Club</p>
            </div>
            <div className="absolute bottom-[0.625rem] w-full px-[0.625rem] flex justify-between">
              <button className="bg-[rgba(24,119,242,255)] h-[2rem] text-[#f2f7fd] w-[7.5rem] rounded-[0.5rem] flex items-center justify-center text-[0.875rem] font-bold cursor-pointer">
                Accept
              </button>
              <button className="w-[2rem] h-[2rem] border-[0.0625rem] border-[rgba(172,182,196,255)] rounded-[0.5rem] flex items-center justify-center text-[1.5rem] cursor-pointer">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-[rgba(172,182,196,255)]"
                />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftBar;
