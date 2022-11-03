import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../stores/userContext";

const GoogleAuth = () => {
  const { loginGoogle, googleLoading } = useAuthContext();
  return (
    <div className="loginGoogle">
      <button onClick={loginGoogle}>
        {googleLoading ? (
          "Processing..."
        ) : (
          <span>
            <FcGoogle className="googleIcon" />
            Continue with google
          </span>
        )}
      </button>
    </div>
  );
};

export default GoogleAuth;
