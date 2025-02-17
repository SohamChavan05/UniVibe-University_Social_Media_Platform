const InforPost = () => {
  return (
    <div className="items-center justify-center flex mt-2 mb-10">
      <div className="w-[85%] bg-[rgba(252,252,253,1)] p-[0.625rem] rounded-lg shadow-md">
        {/* User Info */}
        <div className="flex items-center mb-[0.75rem]">
          <img
            src={`images/profile-image.jpg`}
            alt="Profile"
            className="w-10 h-10 rounded-full ml-0.75"
          />
          <div className="ml-0.75">
            <p className="text-[#18263a] font-bold text-[0.9375rem]">
              Soham Chavan
            </p>
            <p className="text-[#324c70] italic text-[0.75rem]">
              @sohamchavan123
            </p>
          </div>
        </div>

        {/* Post Image */}
        <div className="mb-[0.75rem]">
          <img
            src={`images/post-image.png`}
            alt="Post"
            className="w-full h-[40rem] rounded-lg object-cover"
          />
        </div>

        {/* Description */}
        <div className="px-0.75">
          <p className="text-sm text-[#18263a]">
            “Thrilled to share that I’ve completed the MERN Full Stack
            Development course from Apna College! 🚀 This journey from mastering
            MongoDB, Express, React, and Node.js to building projects like
            RentEase (a rental platform) and a weather app has been an
            incredible learning experience. Excited for what’s next in this
            ever-evolving world of web development! hashtag#MERNStack
            hashtag#WebDevelopment hashtag#React hashtag#NodeJS
            hashtag#LearningNeverStops”
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
