import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { db, storage, auth } from "../firebase/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateListingContext = createContext();

export const CreateListingContextProvider = ({ children }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [formListing, setFormListing] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!e.target.files) {
      setFormListing({ ...formListing, [name]: value });
    }

    if (e.target.files) {
      setFormListing((prevState) => ({ ...prevState, images: e.target.files }));
    }
  };

  //Submit Listing form
  const handleListingForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const {
      name,
      description,
      address,
      offerPrice,
      regularPrice,
      images,
      latitude,
      longitude,
    } = formListing;

    if (!name || !address || !description || !regularPrice) {
      setIsLoading(false);
      toast.error("Please fill all the fields...");
      return;
    }

    if (+offerPrice > +regularPrice) {
      setIsLoading(false);
      toast.error("Offer Price should be less than regular price");
      return;
    }

    if (images.length > 6) {
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

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        setIsLoading(true);

        const fileName = `Images/${Date.now()}-${uuidv4()}`;

        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            switch (snapshot.state) {
              case "paused":
                break;
              case "running":
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setIsLoading(false);
      toast.error("Images not uploaded!!");
      return;
    });

    const formDataCopy = {
      ...formListing,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      uid: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    delete formDataCopy.active;
    !formDataCopy.offer && delete formDataCopy.offerPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;

    await addDoc(collection(db, "aerioListing"), formDataCopy);
    setIsLoading(false);
    navigate("/profile");
    toast.success("Listing created successfully!");

    setFormListing(initialState);
  };

  //Delete Listing
  const deleteListing = async (id) => {
    if (window.confirm("Are you sure You ant to delete?")) {
      await deleteDoc(doc(db, "aerioListing", `${id}`));
      toast.success("Listing deleted!");
    }
  };

  return (
    <CreateListingContext.Provider
      value={{
        setFormListing,
        formListing,
        handleListingForm,
        handleChange,
        isLoading,
        geolocationEnabled,
        deleteListing,
      }}
    >
      {children}
    </CreateListingContext.Provider>
  );
};

export const useListingContext = () => useContext(CreateListingContext);
