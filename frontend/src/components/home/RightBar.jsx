import { useState } from "react";

const RightBar = () => {
  const [requests, setRequests] = useState([
    { img: "images/vandan-profile.png", name: "Vandan Nadwana" },
    { img: "images/vivek-profile.png", name: "Vivek Tiwari" },
  ]);

  const [contacts, setContacts] = useState([
    { img: "images/nikhil-profile.png", name: "Nikhil Kumar" },
    { img: "images/shrawan-profile.png", name: "Shrawan Kumar" },
  ]);

  return (
    <div className="fixed right-0 top-0 h-[100vh] w-[25vw] shadow-lg rounded-lg p-4">
      {/* Requests Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 mt-20 w-[22rem]">
        <h2 className="text-gray-600 font-semibold text-lg border-b pb-2">
          Requests
        </h2>
        <div className="space-y-3 mt-2">
          {requests.map((el, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md transition-transform duration-500 hover:scale-103 hover:bg-blue-100"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={el.img}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {el.name}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-[#2073d1] text-white text-xs px-3 py-1 rounded-md">
                  Accept
                </button>
                <button className="bg-[#ffff] text-black text-xs px-3 py-1 rounded-md">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="bg-white p-4 rounded-lg shadow-md w-[22rem]">
        <h2 className="text-gray-600 font-semibold text-lg border-b pb-2">
          Contacts
        </h2>
        <div className="space-y-3 mt-5">
          {contacts.map((el, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-md transition-transform duration-500 hover:scale-103 hover:bg-blue-100"
            >
              <img
                src={el.img}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {el.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
