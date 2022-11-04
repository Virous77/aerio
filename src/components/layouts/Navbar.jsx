import React from "react";
import "../../styles/Navbar.css";
import logo from "../../images/logo1.svg";
import { NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { useAuthContext } from "../../stores/userContext";

const Navbar = () => {
  const { isLoggedIn } = useAuthContext();

  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo">
          <img src={logo} alt="Aerio logo" />
          <h1>Aerio</h1>
        </div>
      </NavLink>

      <ul className="navLinks">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "activeNav" : "notActive")}
        >
          <li>Home</li>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) => (isActive ? "activeNav" : "notActive")}
        >
          <li>Offers</li>
        </NavLink>

        {!isLoggedIn ? (
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "activeNav" : "notActive")}
          >
            <li>Sign in</li>
          </NavLink>
        ) : (
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "activeNav" : "notActive")}
          >
            <li>Profile</li>
          </NavLink>
        )}

        <CgMenuRightAlt className="mobileMenu" />
      </ul>
    </nav>
  );
};

export default Navbar;
