import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const tempLocalData = () => {
    const result = localStorage.getItem("aerio");
    const res = result ? JSON.parse(result) : initialState;
    return res;
  };

  const [user, setUser] = useState(tempLocalData());

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLaoding] = useState(false);

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

      const tempData = {
        name: name,
        email: email,
        uid: user.uid,
      };

      localStorage.setItem("aerio", JSON.stringify(tempData));

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      setIsLoading(false);
      navigate("/");
      toast.success(`Welcome ${name}`);
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

      const tempData = {
        name: loginuser.user.displayName,
        email: email,
        uid: loginuser.user.uid,
      };

      localStorage.setItem("aerio", JSON.stringify(tempData));

      setIsLoading(false);
      navigate("/");
      toast.success(`Welcome Back ${loginuser.user.displayName}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //Login with google
  const loginGoogle = async () => {
    setGoogleLaoding(true);

    const provider = new GoogleAuthProvider();

    try {
      const googleUser = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = googleUser.user;

      const formDataCopy = {
        name: displayName,
        email: email,
        timestamp: serverTimestamp(),
      };

      const tempData = {
        name: displayName,
        email: email,
        uid: uid,
      };

      localStorage.setItem("aerio", JSON.stringify(tempData));

      await setDoc(doc(db, "users", uid), formDataCopy);
      setGoogleLaoding(false);
      navigate("/");
      toast.success(`Welcome ${displayName}`);
    } catch (error) {
      toast.error(error.message);
      setGoogleLaoding(false);
    }
  };

  //forgetPassword
  const forgetForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email) {
      setIsLoading(false);
      toast.error("Please fill field...");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);
      toast.success("Password reset email sent!");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  //logout
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.clear("aerio");
      toast.success("Logout was successful!");
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
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
        googleLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
