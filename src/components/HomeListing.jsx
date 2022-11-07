import React from "react";
import "../styles/Home.css";
import MainLoader from "../components/UI/MainLoader";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { TfiLocationPin } from "react-icons/tfi";

const HomeListing = ({
  data,
  loading,
  head,
  className,
  reachClass,
  reach,
  reachName,
  fetchIt,
  hideLoad,
  loaderMore,
}) => {
  const price = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const shorting = (text, number) => {
    if (text.length > number) {
      const shortText = text.substring(0, number).concat("...");
      return shortText;
    }
    return text;
  };

  if (loading) return <MainLoader />;

  return (
    <div className="homeListingType">
      <h1 className={className}>{head}</h1>

      <Link to={reach}>
        <p className={reachClass}>go for more {reachName}</p>
      </Link>

      <ul className="listingListCards">
        {data.length > 0 &&
          data.map((listing) => {
            const {
              imgUrls,
              name,
              type,
              id,
              offer,
              beds,
              bath,
              address,
              regularPrice,
              offerPrice,
              timestamp,
            } = listing;
            return (
              <li className="listingList" key={id}>
                <div className="listingTop">
                  <Link to={`/details/${type}/${id}`}>
                    <img src={imgUrls[0]} alt={name} loading="lazy" />
                    <div className="listingDate">
                      <Moment fromNow>{timestamp.toDate()}</Moment>
                    </div>
                  </Link>
                </div>

                <div className="listingDown">
                  <div className="listingLocation">
                    <TfiLocationPin className="locationIcon" />
                    <p>{shorting(address, 22)}</p>
                  </div>

                  <div className="listingNames">
                    <p>{shorting(name, 17)}</p>
                  </div>

                  <div className="listingPrice">
                    {type === "rent" ? (
                      <div className="offerPrice">
                        <span>$</span>
                        {offer ? price(offerPrice) : price(regularPrice)}{" "}
                        <p>/ Month</p>
                      </div>
                    ) : (
                      <p className="listingSell">
                        <span>$</span>{" "}
                        {offer ? price(offerPrice) : price(regularPrice)}
                      </p>
                    )}
                  </div>

                  <div className="listingInfo">
                    <div className="listingBed">
                      <p>
                        {beds} {beds > 1 ? "Beds" : "Bed"}
                      </p>

                      <p>
                        {bath} {bath > 1 ? "Baths" : "Bath"}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>

      {loaderMore && (
        <div className={`loadIt ${hideLoad}`}>
          <button onClick={fetchIt}>Load</button>
        </div>
      )}
    </div>
  );
};

export default HomeListing;
