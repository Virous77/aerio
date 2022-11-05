import React, { useState } from "react";
import "../styles/Profile.css";
import { useAuthContext } from "../stores/userContext";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import useFetchSingleData from "../hooks/useFetchSingleData";
import { updateProfile } from "firebase/auth";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import MyListing from "../components/content/MyListing";

const ProfilePage = () => {
  const { setUser, user, logout } = useAuthContext();
  const { email, name, uid, isLoggedIn } = user;

  const [activeUser, setActiveUser] = useState({
    name: name || "",
    email: email || "",
  });

  const { userData, loading } = useFetchSingleData("users", `${uid}`);
  const { timestamp } = userData;
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveUser({ ...activeUser, [name]: value });
  };

  //submit Edit profileData
  const chnageProfileData = async (e) => {
    const { name: tempName, email: tempEmail } = activeUser;

    const changedData = {
      name: tempName,
      email: tempEmail,
      timestamp: timestamp,
    };

    const tempData = {
      name: tempName,
      email: tempEmail,
      isLoggedIn: isLoggedIn,
      uid: uid,
    };

    try {
      if (auth.currentUser.displayName !== tempName) {
        await updateProfile(auth.currentUser, {
          displayName: tempName,
        });
      }
      await setDoc(doc(db, "users", uid), changedData);
      localStorage.setItem("aerio", JSON.stringify(tempData));
      setUser(tempData);
      setEdit(false);
      toast.success("Profile successfully updated!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="profileBar">
      <div className="profileCard">
        <h1>My Profile</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          {edit ? (
            <div className="formInput">
              <input
                type="text"
                value={edit ? activeUser.name : name}
                name="name"
                onChange={handleChange}
              />
            </div>
          ) : (
            <p className="setUser setUserName">{activeUser.name}</p>
          )}

          <p className="setUser">{activeUser.email}</p>
        </form>

        <div className="editProfile">
          {!edit ? (
            <button
              className="editButton"
              type="button"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className="saveButton"
              onClick={() => {
                chnageProfileData();
              }}
            >
              {loading ? "Processing.." : "Save Changes"}
            </button>
          )}

          <button className="logout" type="button" onClick={logout}>
            Sign Out
          </button>
        </div>

        <div className="createListing">
          <Link to="/create-listing">
            <button>
              <FaHome />
              sell or rent your home
            </button>
          </Link>
        </div>
      </div>
      <MyListing />
    </section>
  );
};

export default ProfilePage;
