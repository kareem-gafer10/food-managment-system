import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "./Sidebar";
import { useState } from "react";

const MasterLayout = () => {
  const [toogle, setToogle] = useState(false);

  const handleToogle = () => {
    setToogle(!toogle);
  };

  return (
    <>
      <Navbar toogle={toogle} handleToogle={handleToogle} />
      <div className=" d-flex  ">
        <SideBar toogle={toogle} handleToogle={handleToogle} />
      </div>
      <Outlet />
    </>
  );
};

export default MasterLayout;
