

const InforPost = ()=>{
    return (
        <>
        <div className="w-full  bg-[rgba(252,252,253,1)] p-[5px]">
            <div className="flex mb-[10px] mt-[10px]">
                <div>
                    <img src={`images/profile-image.jpeg`} alt="Profile image" className='w-10 h-10 rounded-[50%] ml-[10px]' />
                </div>
                <div>
                    <p className="text-[#18263a] font-bold text-[15px]">Soham Chavan</p>
                    <p className="text-[#324c70] italic text-[12px]">@sohamchavan123</p>
                </div>
            </div>
            <div className="mb-[10px]">
            <img src={`images/profile-image.jpeg`} alt="Profile image" className='w-[97%] h-100 rounded-[8px] ml-[10px]' />
            </div>
            <div className="m-[10px] max-h-[50px] overflow-hidden">
                <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id dolorem rerum sed, dolores sunt corrupti placeat ut maiores reprehenderit quas dicta enim quam aliquid eos? Deleniti culpa autem nesciunt non.</p>
            </div>
        </div>
        </>
    )
}

export default InforPost