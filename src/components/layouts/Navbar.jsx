import React from "react";
import "../../styles/Navbar.css";
import logo from "../../images/logo1.svg";
import { NavLink } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";

const Navbar = () => {
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

        <NavLink
          to="/register"
          className={({ isActive }) => (isActive ? "activeNav" : "notActive")}
        >
          <li>Sign in</li>
        </NavLink>

        <CgMenuRightAlt className="mobileMenu" />
      </ul>
    </nav>
  );
};

export default Navbar;
