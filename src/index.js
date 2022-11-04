import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./stores/userContext";
import { CreateListingContextProvider } from "./stores/listingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CreateListingContextProvider>
          <App />
        </CreateListingContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
