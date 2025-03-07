import { useEffect, useState } from "react";
import InforPost from "./InforPost";
// import feedData from './feedData.json'
import axios from "axios";

const MainPart = ({loginLogout,setLoginLogout}) => {

  const [feedData,setFeedData] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(()=>{
    const fetchFeed = async()=>{
      try{
        const response = await axios.get('http://localhost:8000/feed/getAllFeed',{
          headers: {Authorization: `Bearer ${token}`},
        })
        if(response.status===200){
          setFeedData(response.data.details)
        }else{
        console.log(response.data.message)
        }
      }catch (error) {
        console.error("Error fetching feed:", error.response?.data || error.message);
      }
    }
    fetchFeed()
  },[loginLogout])

  return (<>
  <div className="rounded-[8px] mt-20 scrollbar-hide w-[50vw] ml-[25vw] flex flex-col-reverse">
    {!feedData && <h1>Feed empty</h1>}
    {feedData && feedData.map((val,index)=>{
      return (
      <InforPost key={index} name={val.createdBy.name} enrollment={val.createdBy.enrollment} profilePic={val.createdBy.imageUrl} caption={val.caption} feedImage={val.feedImageUrl}/>
      )
  } )}
  </div>
    </>
  );
};

export default MainPart;
