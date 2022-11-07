import React from "react";
import HomeListing from "../components/HomeListing";
import useFetchByType from "../hooks/useFetchByType";
import "../styles/Offer.css";

const OffersPage = () => {
  const { data, loading } = useFetchByType("aerioListing", 300);

  return (
    <section className="offerBar">
      <HomeListing
        data={data}
        loading={loading}
        head="offers mania"
        className="offerHead"
        reachClass="reachNone"
        hideLoad="hideLoad"
      />
    </section>
  );
};

export default OffersPage;
