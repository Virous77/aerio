import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../stores/userContext";

const GoogleAuth = () => {
  const { loginGoogle } = useAuthContext();
  return (
    <div className="loginGoogle">
      <button onClick={loginGoogle}>
        <FcGoogle className="googleIcon" />
        Continue with google
      </button>
    </div>
  );
};

export default GoogleAuth;
