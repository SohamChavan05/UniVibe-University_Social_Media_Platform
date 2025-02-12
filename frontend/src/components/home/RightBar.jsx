import Contacts from "./Contacts"
import Requests from "./Requests"
import { useState } from "react"

const RightBar = ()=>{

    const [requests,setRequests] = useState([['images/profile-image.jpeg','Soham Chavan'],['images/profile-image.jpeg','Soham Chavan']])

    const [contacts,setContacts] = useState([['images/profile-image.jpeg','Soham Chavan'],['images/profile-image.jpeg','Shrawan Kumar']])



    return (
        <>
            <div className="my-[25px] rounded-[8px] w-[329px] bg-inherit">
            <div className="h-[30px] w-[264px] ml-[25px] text-[#787d85] font-bold">REQUESTS</div>
            <div className="bg-inherit p-[8px] rounded-[8px]">
            {requests && requests.map((el,index)=>{
                return (
                <Requests request={el} ind={index}/>
                )
            })}
            </div>
            
                
            <div className="h-[30px] w-[264px] ml-[25px] text-[#787d85] font-bold">CONTACTS</div>
            <div className="bg-[rgba(252,252,253,1)] p-[8px] rounded-[8px] overflow-hidden flex flex-col justify-center">
                {contacts && contacts.map((el,index)=>{
                    return (
                        <Contacts contact={el} ind={index}/>
                    )
                })}
            </div>
            </div>
        </>
    )
}

export default RightBar 