import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaShare } from "react-icons/fa";
import "../styles/Slider.css";

const Slider = ({ image }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [shoClip, setShowClip] = useState(false);

  let autoScroll = true;
  let slideInterval;
  let timeInterverl = 5000;

  const leftArrow = () => {
    setCurrentImage(currentImage === 0 ? image.length - 1 : currentImage - 1);
  };

  const rightArrow = () => {
    setCurrentImage(currentImage === image.length - 1 ? 0 : currentImage + 1);
  };

  const autoScrollTime = () => {
    slideInterval = setInterval(rightArrow, timeInterverl);
  };

  useEffect(() => {
    if (autoScroll) {
      autoScrollTime();
    }

    return () => clearInterval(slideInterval);
  }, [currentImage]);

  return (
    <div className="sliderBar">
      {image?.map((img, idx) => (
        <div className="imageList" key={idx}>
          {idx === currentImage && (
            <li>
              <img src={img} alt="property image" loading="lazy" />

              <div className="dic">
                <div className="arrow">
                  <div className="leftArrow" onClick={leftArrow}>
                    <FaArrowLeft className="leftIcon" />
                  </div>

                  <div className="rightArrow">
                    <FaArrowRight className="rightArrow" onClick={rightArrow} />
                  </div>
                </div>
              </div>

              <div
                className="share"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShowClip(true);
                  setTimeout(() => {
                    setShowClip(false);
                  }, 2000);
                }}
              >
                <FaShare className="shareIcon" />
              </div>

              {shoClip && (
                <div className="clipboard">
                  <p>Link Copied</p>
                </div>
              )}
            </li>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
