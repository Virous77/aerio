import React from "react";
import useFetchByListingType from "../hooks/useFetchByListingType";
import HomeListing from "../components/HomeListing";

const ListingTypePage = () => {
  const {
    data: rentData,
    loading: rentLoading,
    fetchIt: max,
    loaderMore,
  } = useFetchByListingType("aerioListing", "rent", 10);

  const {
    data: selltData,
    loading: sellLoading,
    fetchIt: maxs,
    loaderMore: loaderMores,
  } = useFetchByListingType("aerioListing", "sell", 10);

  const fetchIt = () => {
    if (window.location.pathname === "/category/sell") {
      maxs();
    } else {
      max();
    }
  };

  return (
    <section className="listingTypeBars">
      {window.location.pathname === "/category/sell" ? (
        <HomeListing
          data={selltData}
          loading={sellLoading}
          head="property for sale"
          className="offerHead"
          reachClass="reachNone"
          fetchIt={fetchIt}
          loaderMore={loaderMores}
        />
      ) : (
        <HomeListing
          data={rentData}
          loading={rentLoading}
          head="property for rent"
          className="offerHead"
          reachClass="reachNone"
          fetchIt={fetchIt}
          loaderMore={loaderMore}
        />
      )}
    </section>
  );
};

export default ListingTypePage;
