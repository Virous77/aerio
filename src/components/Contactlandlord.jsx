import React, { useState } from "react";
import "../styles/Category.css";

export const Contactlandlord = ({
  setContactLandLord,
  contactLandLord,
  propertyUser,
  data,
}) => {
  const [message, setMessage] = useState("");

  return (
    <div className="contactLand">
      {!contactLandLord ? (
        <button onClick={() => setContactLandLord(true)}>
          Contact To Owner of Property
        </button>
      ) : (
        <div className="contactForm">
          <p>
            send message to <span>{data?.name}</span> for {""}
            <span>{propertyUser}</span>
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              name="message"
              cols="30"
              rows="10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a Message"
            ></textarea>
            <a
              href={`mailto:${data?.email}?subject=${propertyUser}&body=${message}`}
            >
              <button type="button">Send Message</button>
            </a>
          </form>
        </div>
      )}
    </div>
  );
};
