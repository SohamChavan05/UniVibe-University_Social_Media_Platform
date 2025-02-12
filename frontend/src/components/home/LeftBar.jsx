import { faImage,faUser } from "@fortawesome/free-regular-svg-icons";
import { IoHomeOutline,IoSettingsOutline } from "react-icons/io5";
import { TbUserSquare } from "react-icons/tb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const LeftBar = ()=>{

    const [name,setName] = useState('Soham Chavan')
    const [userName,setUserName] = useState('sohamchavan123')
    const [userProfilePicture,setUserProfilePicture] = useState('images/profile-image.jpeg')

    return (
        <>
            <div className="bg-inherit w-[289px] h-[100vh]">
                <div className="h-[82px] w-[269px] bg-[rgba(252,252,253,1)] ml-[20px] mt-[25px] rounded-[8px] flex items-center p-[8px]">
                <img src={`${userProfilePicture}`} alt="Profile image" className='w-10 h-10 rounded-[8px] ml-[10px]' />
                <div className="ml-[10px]">
                    <h3 className="text-[#18263a] font-bold text-[15px]">{name}</h3>
                    <p className="text-[#324c70] italic text-[12px]">@{userName}</p>
                </div>
                </div>
                <div className="h-[320px] w-[269px] bg-[rgba(252,252,253,1)] ml-[20px] mt-[25px] rounded-[8px]">
                    <div className='p-[10px]'>
                        <div className='w-[229px] h-[60px] flex items-center border-b-[1px] border-b-[rgba(188,199,212,1)] mx-[20px]'>
                        <div className="w-[40px]"><IoHomeOutline className="text-[rgba(188,199,212,255)] text-3xl ml-[0px]" /></div>
                        <p className="text-[#18263a] font-bold text-[15px]">Home</p>
                        </div>
                        <div className='w-[229px] h-[60px] flex items-center border-b-[1px] border-b-[rgba(188,199,212,1)] mx-[20px]'>
                        <div className="w-[40px]"><TbUserSquare className="text-[rgba(188,199,212,255)] text-3xl ml-[0px]" /></div>
                        <p className="text-[#18263a] font-bold text-[15px]">Person</p>
                        </div>
                        <div className='w-[229px] h-[60px] flex items-center border-b-[1px] border-b-[rgba(188,199,212,1)] mx-[20px]'>
                            <div className="w-[40px]"><FontAwesomeIcon icon={faImage} className='text-3xl text-[rgba(172,182,196,255)]'/></div>
                        <p className="text-[#18263a] font-bold text-[15px]">Photos</p>
                        </div>
                        <div className='w-[229px] h-[60px] flex items-center border-b-[1px] border-b-[rgba(188,199,212,1)] mx-[20px]'>
                        <div className="w-[40px]"><FontAwesomeIcon icon={faUser} className='text-3xl text-[rgba(172,182,196,255)]'/></div>
                        <p className="text-[#18263a] font-bold text-[15px]">Profile</p>
                        </div>
                        <div className='w-[229px] h-[60px] flex items-center mx-[20px]'>
                        <div className="w-[40px]"><IoSettingsOutline className="text-[rgba(188,199,212,255)] text-3xl ml-[0px]" /></div>
                        <p className="text-[#18263a] font-bold text-[15px]">Settings</p>
                        </div>
                    </div>
                </div>
                <div className="h-[30px] w-[254px] my-[25px] ml-[45px] text-[rgba(172,182,196,255)] font-bold">INVITATIONS</div>
                <div className="h-[420px] w-[269px] bg-[rgba(252,252,253,1)] ml-[20px] mt-[25px] rounded-[8px] flex flex-col items-center p-[8px]">
                    <div className="w-[249px] h-[249px] bg-[url('/images/profile-image.jpeg')] bg-cover m-[20px] rounded-[8px]">
                        <img src="images/profile-image.jpeg" alt="image" className="border-white border-[2px] rounded-[8px] w-[50px] h-[50px] m-[25px]"/>
                    </div>
                    <div className="flex justify-between h-[50px] w-full px-[10px]">
                    <button className='bg-[rgba(24,119,242,255)] h-[50px] text-[#f2f7fd] w-[170px] rounded-[8px] flex items-center justify-center text-[16px] font-bold cursor-pointer'>
                    Accept Invitation
                    </button>
                    <button className="w-[50px] h-[50px] border-[1px] border-[rgba(172,182,196,255)] rounded-[8px] flex items-center justify-center text-[30px] cursor-pointer">
                        <FontAwesomeIcon icon={faXmark} className="text-[rgba(172,182,196,255)]"/>
                    </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LeftBar