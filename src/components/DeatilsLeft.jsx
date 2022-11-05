import React, { useState } from "react";
import { IoBedSharp } from "react-icons/io5";
import { FaBath, FaCar } from "react-icons/fa";
import { GiDeadWood } from "react-icons/gi";
import Moment from "react-moment";
import "../styles/Category.css";
import { TfiLocationPin } from "react-icons/tfi";
import { Contactlandlord } from "./Contactlandlord";
import { auth } from "../firebase/firebase.config";
import useFetchSingleData from "../hooks/useFetchSingleData";

const DeatilsLeft = ({ userData }) => {
  const {
    address,
    bath,
    beds,
    description,
    furnished,
    name,
    offer,
    offerPrice,
    parking,
    regularPrice,
    timestamp,
    type,
    uid,
  } = userData;

  const price = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const discPrice = +regularPrice - +offerPrice;

  const { userData: data } = useFetchSingleData("users", uid);

  const [contactLandLord, setContactLandLord] = useState(false);

  return (
    <div className="detailsBar">
      <h1>{name}</h1>
      <div className="detailsLocation">
        <TfiLocationPin className="locationIcon" />
        <p>{address}</p>
      </div>

      <div className="detailsType">
        <p>for {type}</p>
        <span>{offer ? `$${price(discPrice)} discount` : "No discount"}</span>
      </div>

      <div className="detailsDate">
        <span>Net Price :- </span>

        <p>
          {offer ? `$${price(offerPrice)}` : `$${price(regularPrice)}`}
          <span>{type === "rent" ? "/ Month" : ""}</span>
        </p>
      </div>

      <div className="detailsDate">
        <span>Listing Date:- </span>
        <Moment format="YYYY/MMM/DD">{timestamp?.toDate()}</Moment>
      </div>

      <div className="detailsDesc">
        <p>
          <span>Description :-</span>
          {description}
        </p>
      </div>

      <div className="detailsBoolean">
        <div className="firstBoolean">
          <span>
            <IoBedSharp className="booleanIcon" />
            Bed
          </span>
          <p>
            {beds} {beds > 1 ? "Beds" : "Bed"}
          </p>
        </div>

        <div className="firstBoolean">
          <span>
            <FaBath className="booleanIcon" />
            Bath
          </span>
          <p>
            {bath} {bath > 1 ? "Baths" : "Bath"}
          </p>
        </div>

        <div className="firstBoolean">
          <span>
            <FaCar className="booleanIcon" />
            Parking
          </span>
          <p>{parking ? "yes" : "no"}</p>
        </div>

        <div className="firstBoolean">
          <span>
            <GiDeadWood className="booleanIcon" />
            Furnished
          </span>
          <p>{furnished ? "yes" : "no"}</p>
        </div>
      </div>
      {userData?.uid !== auth.currentUser?.uid && (
        <Contactlandlord
          contactLandLord={contactLandLord}
          setContactLandLord={setContactLandLord}
          data={data}
          propertyUser={name}
        />
      )}
    </div>
  );
};

export default DeatilsLeft;
