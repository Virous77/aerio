import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  //signUp with email/pass
  const signInForm = (e) => {
    e.preventDefault();
    console.log(user);
  };

  //Login with Email/Pass
  const loginForm = (e) => {
    e.preventDefault();

    console.log(user);
  };

  //Login with google
  const loginGoogle = () => {
    console.log("ok");
  };

  //forgetPassword
  const forgetForm = (e) => {
    e.preventDefault();
  };

  return (
    <AuthContext.Provider
      value={{ setUser, user, loginForm, loginGoogle, signInForm, forgetForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
