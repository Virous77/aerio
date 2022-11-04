import { createContext, useState, useContext } from "react";

const CreateListingContext = createContext();

export const CreateListingContextProvider = ({ children }) => {
  const initialState = {
    rent: "rent",
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
    image: null,
    active: false,
  };

  const [formListing, setFormListing] = useState(initialState);

  //Submit Listing form
  const handleListingForm = (e) => {
    e.preventDefault();

    console.log(formListing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormListing({ ...formListing, [name]: value });
  };

  return (
    <CreateListingContext.Provider
      value={{
        setFormListing,
        formListing,
        handleListingForm,
        handleChange,
      }}
    >
      {children}
    </CreateListingContext.Provider>
  );
};

export const useListingContext = () => useContext(CreateListingContext);
