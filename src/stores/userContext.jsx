import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password } = user;
  const navigate = useNavigate();

  //signUp with email/pass
  const signInForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      setIsLoading(false);
      toast.error("Please fill all fields...");
      return;
    }

    try {
      const userCrendential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCrendential.user;

      const formDataCopy = {
        name: name,
        email: email,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      setIsLoading(false);
      navigate("/");
      toast.success(`Welcome ${name}!`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //Login with Email/Pass
  const loginForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      toast.error("Please fill all fields...");
      return;
    }

    try {
      const loginuser = await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
      navigate("/");
      toast.success(`Welcome Back ${loginuser.user.displayName}!`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //Login with google
  const loginGoogle = () => {
    console.log("ok");
  };

  //forgetPassword
  const forgetForm = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill field...");
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        loginForm,
        loginGoogle,
        signInForm,
        forgetForm,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
