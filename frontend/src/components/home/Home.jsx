import Search from "../Search";
import LeftBar from "./LeftBar";
import MainPart from "./MainPart";
import RightBar from "./RightBar";
import { useState } from "react";

const Home = () => {
  const [loginLogout,setLoginLogout] = useState(true)
  return (
    <>
      <Search loginLogout={loginLogout} setLoginLogout={setLoginLogout}/>
      <LeftBar loginLogout={loginLogout} setLoginLogout={setLoginLogout}/>
      <MainPart/>
      <RightBar/>
    </>
  );
};

export default Home;
