import InforPost from "./InforPost";
import feedData from './feedData.json'

const MainPart = () => {
  return (<>
  <div className="rounded-[8px] mt-20 scrollbar-hide w-[50vw] ml-[25vw]">
    {feedData && feedData.map((val,index)=>{
      return (
      <InforPost key={index} name={val.name} enrollment={val.enrollment} image={val.feedImage} caption={val.caption}/>
      )
  } )}
  </div>
    </>
  );
};

export default MainPart;
