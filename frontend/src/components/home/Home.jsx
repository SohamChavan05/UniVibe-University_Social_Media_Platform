import Search from "../Search";
import LeftBar from "./LeftBar";
import MainPart from "./MainPart";
import RightBar from "./RightBar";
import { useState } from "react";

const Home = () => {
<<<<<<< HEAD
  const [loginLogout,setLoginLogout] = useState(true)
=======
    const [loginLogout,setLoginLogout] = useState(true)
>>>>>>> sk
  return (
    <>
      <Search loginLogout={loginLogout} setLoginLogout={setLoginLogout}/>
      <LeftBar loginLogout={loginLogout} setLoginLogout={setLoginLogout}/>
<<<<<<< HEAD
      <MainPart/>
=======
      <MainPart loginLogout={loginLogout} setLoginLogout={setLoginLogout}/>
>>>>>>> sk
      <RightBar/>
    </>
  );
};

export default Home;
