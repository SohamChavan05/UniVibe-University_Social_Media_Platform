import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

const Search = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 h-[4rem] bg-[rgba(252,252,253,1)] flex items-center shadow-md px-[2rem]">
        <div className="w-[2.5rem] h-[2.5rem] bg-[#dfdff5] flex justify-center items-center rounded-lg">
          <img
            src="images/logo.png"
            alt="Logo"
            className="w-full"
          />
        </div>
        <h3 className="ml-[0.625rem] text-lg font-bold">Univibe</h3>
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
        <button className="bg-[rgba(24,119,242,1)] h-[2.25rem] text-[#f2f7fd] w-[6rem] flex items-center justify-center rounded-lg ml-[1.25rem] cursor-pointer">
          <FontAwesomeIcon icon={faSquarePlus} className="mr-[0.25rem]" />{" "}
          Create
        </button>
        <img
          src="images/profile-image.jpg"
          alt="Profile"
          className="w-[2.5rem] h-[2.5rem] rounded-lg ml-[0.625rem]"
        />
      </div>
    </>
  );
};

export default Search;
