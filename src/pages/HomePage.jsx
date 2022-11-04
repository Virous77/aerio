import React, { useEffect } from "react";
import { useAuthContext } from "../stores/userContext";

const HomePage = () => {
  const { tempLocalData } = useAuthContext();

  useEffect(() => {
    tempLocalData();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
