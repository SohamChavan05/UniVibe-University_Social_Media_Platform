
const Requests = ({request,ind})=>{
    return (
        <>
            <div key={ind} className="p-[8px] bg-[rgba(252,252,253,1)] rounded-[8px] mb-[8px]">
                <div className="flex">
                    <img src={`${request[0]}`} alt="Profile image" className='w-10 h-10 rounded-[8px] ml-[10px]' />
                    <p className="text-[15px] ml-[10px]"><b>{request[1]}</b> wants to add you to friends</p>
                </div>
                <div className="flex justify-between h-[50px] w-full px-[10px] mt-[10px]">
                    <button className='bg-[rgba(24,119,242,255)] h-[40px] text-[#f2f7fd] w-[130px] rounded-[8px] flex items-center justify-center text-[14px] font-bold cursor-pointer'>
                                    Accept Invitation
                    </button>
                    <button className="w-[130px] h-[40px] border-[1px] border-[rgba(172,182,196,255)] rounded-[8px] flex items-center justify-center text-[14px] cursor-pointer">
                        Reject
                    </button>
                </div>
            </div>
        </>
    )
}

export default Requests