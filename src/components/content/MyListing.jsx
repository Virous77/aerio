import React from "react";
import "../../styles/MyListing.css";
import Loader from "../UI/Loader";
import { useAuthContext } from "../../stores/userContext";
import useFetchCollection from "../../hooks/useFetchCollection";
import { TfiLocationPin } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { useListingContext } from "../../stores/listingContext";

const MyListing = () => {
  const { user } = useAuthContext();
  const { data, loading } = useFetchCollection(user.uid);
  const { deleteListing } = useListingContext();

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

  if (loading) return <Loader />;

  return (
    <section className="myListingBar">
      <h1>My Listing</h1>

      <ul className="listingListCard">
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
                    <p>{shorting(address, 30)}</p>
                  </div>

                  <div className="listingName">
                    <p>{shorting(name, 25)}</p>
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

                    <div className="listingAction">
                      <div className="listingEdit">
                        <Link to={`/edit-listing/${id}`}>
                          <span className="edit">EDIT</span>
                        </Link>
                        <span
                          className="delete"
                          onClick={() => deleteListing(id)}
                        >
                          DELETE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MyListing;
