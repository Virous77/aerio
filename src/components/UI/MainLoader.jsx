import React from "react";
import "./Loader.css";
import { BiLoaderCircle } from "react-icons/bi";

const MainLoader = () => {
  return (
    <div className="mainloader">
      <BiLoaderCircle className="loaderIcon" />
    </div>
  );
};

export default MainLoader;
