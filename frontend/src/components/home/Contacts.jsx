import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'


const Contacts = ({contact,index})=>{
    return (
        <>
            <div key={index} className="flex p-[8px]">
                    <img src={`${contact[0]}`} alt="Profile image" className='w-10 h-10 rounded-[8px] ml-[10px]' />
                    <p className="text-[15px] ml-[20px] h-10 flex items-center w-[200px] "><b>{contact[1]}</b></p>
                    <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsis}/>
                    </div>
                </div>
        </>
    )
}
export default Contacts