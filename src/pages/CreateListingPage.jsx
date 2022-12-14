import React from "react";
import "../styles/CreateListing.css";
import { useListingContext } from "../stores/listingContext";

const CreateListingPage = () => {
  const {
    formListing,
    handleListingForm,
    handleChange,
    setFormListing,
    isLoading,
    geolocationEnabled,
  } = useListingContext();
  const {
    name,
    beds,
    bath,
    parking,
    furnished,
    address,
    description,
    offer,
    offerPrice,
    regularPrice,
    latitude,
    longitude,
    active,
  } = formListing;

  return (
    <section className="listingBar">
      <div className="listingCard">
        <h1>Create a Listing</h1>

        <form onSubmit={handleListingForm}>
          <div className="selectOne">
            <label>Sell/rent</label>
            <div className="chooseOne">
              <button
                type="button"
                value="sell"
                name="sell"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({
                    ...formListing,
                    type: "sell",
                    active: true,
                  });
                }}
                className={active ? "activeListing" : "notActiveListing"}
              >
                sell
              </button>
              <button
                type="button"
                value="rent"
                name="rent"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({
                    ...formListing,
                    active: false,
                    type: "rent",
                  });
                }}
                className={` ${!active ? "activeListing" : "notActiveListing"}`}
              >
                rent
              </button>
            </div>
          </div>

          <div className="formInput">
            <label>Property Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="formNumber">
            <div className="first">
              <label>Beds</label>
              <input
                type="number"
                name="beds"
                value={beds}
                min="1"
                max="20"
                onChange={handleChange}
              />
            </div>

            <div className="first">
              <label>Baths</label>
              <input
                type="number"
                name="bath"
                min="0"
                max="5"
                value={bath}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="selectOne">
            <label>Parking Spot</label>

            <div className="chooseOne">
              <button
                type="button"
                value="true"
                name="parking"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, parking: true });
                }}
                className={parking ? "activeListing" : "notActiveListing"}
              >
                Yes
              </button>

              <button
                type="button"
                value="false"
                name="parking"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, parking: false });
                }}
                className={!parking ? "activeListing" : "notActiveListing"}
              >
                No
              </button>
            </div>
          </div>

          <div className="selectOne">
            <label>Frunished</label>

            <div className="chooseOne">
              <button
                type="button"
                value="true"
                name="furnished"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, furnished: true });
                }}
                className={furnished ? "activeListing" : "notActiveListing"}
              >
                Yes
              </button>

              <button
                type="button"
                value="false"
                name="furnished"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, furnished: false });
                }}
                className={!furnished ? "activeListing" : "notActiveListing"}
              >
                No
              </button>
            </div>
          </div>

          <div className="formInput">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleChange}
            />
            {geolocationEnabled && (
              <div className="formNumber">
                <div className="first">
                  <label>latitude</label>
                  <input
                    type="number"
                    name="latitude"
                    min="-90"
                    max="90"
                    value={latitude}
                    onChange={handleChange}
                  />
                </div>

                <div className="first">
                  <label>longitude</label>
                  <input
                    type="number"
                    name="longitude"
                    min="-180"
                    max="180"
                    value={longitude}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="formInput">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="selectOne">
            <label>Offer</label>

            <div className="chooseOne">
              <button
                type="button"
                value="true"
                name="offer"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, offer: true });
                }}
                className={offer ? "activeListing" : "notActiveListing"}
              >
                Yes
              </button>

              <button
                type="button"
                value="false"
                name="offer"
                onClick={(e) => {
                  handleChange(e);
                  setFormListing({ ...formListing, offer: false });
                }}
                className={!offer ? "activeListing" : "notActiveListing"}
              >
                No
              </button>
            </div>
          </div>

          {offer && (
            <div className="first">
              <label>Offer Price</label>
              <input
                type="number"
                name="offerPrice"
                min="1"
                value={offerPrice}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="first">
            <label>Regular Price</label>
            <input
              type="number"
              name="regularPrice"
              min="1"
              value={regularPrice}
              onChange={handleChange}
            />
          </div>

          <div className="first">
            <label>property Image</label>
            <input type="file" id="images" multiple onChange={handleChange} />
          </div>

          <button className="listingSubmit">
            {isLoading ? "Submitting.." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateListingPage;
