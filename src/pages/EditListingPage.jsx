import React, { useEffect, useState } from "react";
import "../styles/CreateListing.css";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { updateDoc, serverTimestamp } from "firebase/firestore";

const EditListingPage = () => {
  const initialState = {
    type: "rent",
    name: "",
    beds: 1,
    bath: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    offerPrice: 0,
    regularPrice: 0,
    images: "",
    active: false,
    latitude: 0,
    longitude: 0,
  };
  const geolocationEnabled = false;
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formListing, setFormListing] = useState(initialState);
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

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setFormListing({ ...formListing, [name]: value });
    }

    if (e.target.files) {
      setFormListing((prevState) => ({ ...prevState, images: e.target.files }));
    }
  };

  //Fetch single data
  useEffect(() => {
    setIsLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "aerioListing", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setIsLoading(false);
        setListing(docSnap.data());
        setFormListing({ ...docSnap.data() });
      }
    }
    fetchListing();
  }, [id]);

  //Edit Form
  const handleListingForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { address, offerPrice, regularPrice, images, latitude, longitude } =
      formListing;

    if (auth.currentUser.uid !== listing?.uid) {
      toast.error(`This listing is not associate to you.`);
      navigate("/profile");
      return;
    }

    if (+offerPrice > +regularPrice) {
      setIsLoading(false);
      toast.error("Offer Price should be less than regular price");
      return;
    }

    if (images?.length > 6) {
      setIsLoading(false);
      toast.error("Images should be between(1-6)");
      return;
    }

    let geolocation = {};

    if (!geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODING_APIKEY}`
      );

      setIsLoading(false);
      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      if (data.status === "ZERO_RESULTS") {
        setIsLoading(false);
        toast.error("Please enter correct address!");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    const formDataCopy = {
      ...formListing,
      imgUrls: formListing.imgUrls,
      geolocation,
      timestamp: formListing.timestamp,
      editedAt: serverTimestamp(),
      uid: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    delete formDataCopy.active;
    !formDataCopy.offer && delete formDataCopy.offerPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;

    const docref = doc(db, "aerioListing", id);

    await updateDoc(docref, formDataCopy);
    setIsLoading(false);
    navigate("/profile");
    toast.success("Listing modified successfully!");

    setFormListing(initialState);
  };

  return (
    <section className="listingBar">
      <div className="listingCard">
        <h1>Edit Listing</h1>

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

          <div className="first five">
            <label>property Image</label>
            <p>Images are not editable.</p>
            <div className="third">
              {formListing?.imgUrls?.map((image, idx) => (
                <div key={idx} className="activeListingImage">
                  <img src={image} alt="" />
                </div>
              ))}
            </div>
          </div>

          <button className="listingSubmit">
            {isLoading ? "Submitting.." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditListingPage;
