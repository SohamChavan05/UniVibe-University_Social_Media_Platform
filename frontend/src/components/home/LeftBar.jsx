import { faImage, faUser } from "@fortawesome/free-regular-svg-icons";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { TbUserSquare } from "react-icons/tb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const LeftBar = () => {
  const [name, setName] = useState("Soham Chavan");
  const [userName, setUserName] = useState("sohamchavan123");
  const [userProfilePicture, setUserProfilePicture] = useState(
    "images/profile-image.jpg"
  );

  return (
    <div className="fixed top-15 left-0 h-screen w-[25vw] flex flex-col items-end bg-white">
      <div className="w-[25vw] h-[100vh] flex flex-col items-end">
        {/* Profile Card */}
        <div className="h-[5.125rem] w-[16.8rem] bg-[rgba(252,252,253,1)] mt-[1.5625rem] rounded-[0.5rem] flex items-center p-[0.5rem] shadow-md transition-transform duration-500 hover:scale-103">
          <img
            src={`${userProfilePicture}`}
            alt="Profile image"
            className="w-10 h-10 rounded-[0.5rem] ml-[0.625rem]"
          />
          <div className="ml-[0.625rem]">
            <h3 className="text-[#18263a] font-bold text-[0.9375rem]">
              {name}
            </h3>
            <p className="text-[#324c70] italic text-[0.75rem]">@{userName}</p>
          </div>
        </div>

        <div className="h-[20rem] w-[16.8rem] bg-[rgba(252,252,253,1)] mt-2 rounded-[0.5rem] flex flex-col items-center shadow-md">
          <div className="p-[0.625rem] w-full">
            {[
              {
                icon: (
                  <IoHomeOutline className="text-[rgba(188,199,212,255)] text-2xl" />
                ),
                label: "Home",
              },
              {
                icon: (
                  <TbUserSquare className="text-[rgba(188,199,212,255)] text-2xl" />
                ),
                label: "Person",
              },
              {
                icon: (
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-2xl text-[rgba(172,182,196,255)]"
                  />
                ),
                label: "Photos",
              },
              {
                icon: (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-2xl text-[rgba(172,182,196,255)]"
                  />
                ),
                label: "Profile",
              },
              {
                icon: (
                  <IoSettingsOutline className="text-[rgba(188,199,212,255)] text-2xl" />
                ),
                label: "Settings",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`w-[14.3rem] h-[3.75rem] flex items-center justify-start px-4 transition-transform duration-500 rounded-md cursor-pointer hover:bg-blue-100 hover:scale-105 ${
                  index !== 4
                    ? ""
                    : ""
                }`}
              >
                <div className="w-[2.5rem] flex justify-center">
                  {item.icon}
                </div>
                <p className="text-[#18263a] font-bold text-[0.9375rem] ml-[0.5rem]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
