import { useEffect } from "react";

const InforPost = ({name,caption,profilePic,enrollment,feedImage}) => {

  return (
    <div className="items-center justify-center flex mt-2 mb-10">
      <div className="w-[85%] bg-[rgba(252,252,253,1)] p-[0.625rem] rounded-lg shadow-md">
        {/* User Info */}
        <div className="flex items-center mb-[0.75rem]">
          <img
            src={`http://localhost:8000${profilePic}`}
            alt="Profile"
            className="w-10 h-10 rounded-full ml-0.75 border-2 border-white object-cover"
          />
          <div className="ml-0.75">
            <p className="text-[#18263a] font-bold text-[0.9375rem]">
              {name}
            </p>
            <p className="text-[#324c70] italic text-[0.75rem]">
              {enrollment}
            </p>
          </div>
        </div>

        {/* Post Image */}
        <div className="mb-[0.75rem]">
          <img
            src={`http://localhost:8000${feedImage}`}
            alt="Post"
            className="w-full rounded-lg object-contain"
          />
        </div>

        {/* Description */}
        <div className="px-0.75">
          <p className="text-sm text-[#18263a]">
            {caption}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around items-center mt-[0.75rem] px-0.75 py-[0.5rem] border-t border-gray-300">
          <button className="flex items-center text-[#18263a] hover:text-blue-500">
            Like
          </button>
          <button className="flex items-center text-[#18263a] hover:text-blue-500">
            Comment
          </button>
          <button className="flex items-center text-[#18263a] hover:text-blue-500">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default InforPost;
