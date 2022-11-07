import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const HomeSilder = ({ data }) => {
  const [homefirst, setHomeFirst] = useState(0);

  let autoScroll = true;
  let slideInterval;
  let timeInterverl = 5000;

  const leftArrow = () => {
    setHomeFirst(homefirst === 0 ? data.length - 1 : homefirst - 1);
  };

  const rightArrow = () => {
    setHomeFirst(homefirst === data.length - 1 ? 0 : homefirst + 1);
  };

  const autoScrollTime = () => {
    slideInterval = setInterval(rightArrow, timeInterverl);
  };

  useEffect(() => {
    if (autoScroll) {
      autoScrollTime();
    }

    return () => clearInterval(slideInterval);
  }, [homefirst]);

  const price = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="homeSliderBar">
      <ul className="homeSliderCard">
        {data.map((listing, idx) => {
          const { imgUrls, offerPrice, offer, type, regularPrice, id, name } =
            listing;
          const discPrice = `${offer ? +offerPrice : +regularPrice}`;

          return (
            <li key={idx} className="homeSliderList">
              {idx === homefirst && (
                <Link to={`/details/${type}/${id}`}>
                  <div className="homeInfo">
                    <img src={imgUrls[0]} alt={name} />

                    <div className="homeName">
                      <p>{name}</p>

                      <span
                        className={
                          type === "rent" ? "rentActive" : "sellActive"
                        }
                      >
                        ${price(discPrice)}
                        <b>{type === "rent" ? "/ Month" : "for Sale"}</b>
                      </span>

                      <div className="inOffer">
                        <b>{offer ? "In offer" : ""}</b>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {idx === homefirst && (
                <div className="homedic">
                  <div className="homearrow">
                    <div className="leftArrow" onClick={leftArrow}>
                      <FaArrowLeft className="leftIcon" />
                    </div>

                    <div className="rightArrow">
                      <FaArrowRight
                        className="rightArrow"
                        onClick={rightArrow}
                      />
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomeSilder;
