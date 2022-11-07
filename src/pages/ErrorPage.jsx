import React from "react";
import "../styles/Error.css";
import notfound from "../images/notfound.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section
      className="
  errorBar
  
  "
    >
      <div className="errorWrap">
        <img src={notfound} alt="not found" />
        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
