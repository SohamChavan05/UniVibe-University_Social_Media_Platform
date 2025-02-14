import LeftBar from "./LeftBar"
import MainPart from "./MainPart"
import RightBar from "./RightBar"

const Home = () =>{
    return (
        <>
            <div className="flex">
            <LeftBar/>
            <MainPart/>
            <RightBar/>
            </div>
        </>
    )
}

export default Home