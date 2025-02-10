import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css'




const Search = ()=>{
    return (
        <>
            <div className="search-bar w-full h-[80px] bg-[rgba(252,252,253,1)] flex flex-row items-center shadow-gray-300">
                <div className='w-10 h-10 ml-[50px] bg-[#dfdff5] flex justify-center items-center rounded-[8px]'><img src="images/logo.svg" alt="Logo" className='w-6 h-6 ' /></div>
                <h3 className='ml-[10px]'>Univibe</h3>
                <div className="search bg-[rgba(244,245,248,255)] rounded-[8px] flex flex-row items-center ml-[800px]">
                    <FontAwesomeIcon icon={faSearch} className='w-5 h-5 text-[rgba(172,182,196,255)] p-[6px]'/>
                    <input type="search" name="search" id="" placeholder="Search" className="placeholder:text-[rgba(172,182,196,255)] text-[rgb(32,69,85)] p-[6px] outline-none"/>
                </div>
                <button className='bg-[rgba(24,119,242,255)] h-[36px] text-[#f2f7fd] w-[95px] items-center justify-center rounded-[8px] ml-[20px] cursor-pointer'>
                <FontAwesomeIcon icon={faSquarePlus} className='mr-[4px] '/> Create
                </button>
                <img src="images/profile-image.jpeg" alt="Profile image" className='w-10 h-10 rounded-[8px] ml-[10px]' />
            </div>
        </>
    )
}

export default Search