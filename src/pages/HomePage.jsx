import React, { useEffect } from "react";
import { useAuthContext } from "../stores/userContext";
import useFetchByLimit from "../hooks/useFetchByLimit";
import HomeSilder from "../components/HomeSilder";
import MainLoader from "../components/UI/MainLoader";
import "../styles/Home.css";
import HomeListing from "../components/HomeListing";
import useFetchByType from "../hooks/useFetchByType";
import useFetchByListingType from "../hooks/useFetchByListingType";

const HomePage = () => {
  const { tempLocalData } = useAuthContext();
  const { data, loading } = useFetchByLimit("aerioListing");

  const { data: offerData, loading: offerLoading } = useFetchByType(
    "aerioListing",
    5
  );

  const { data: rentData, loading: rentLoading } = useFetchByListingType(
    "aerioListing",
    "rent",
    5
  );

  const { data: selltData, loading: sellLoading } = useFetchByListingType(
    "aerioListing",
    "sell",
    5
  );

  useEffect(() => {
    tempLocalData();
  }, []);

  if (loading) return <MainLoader />;

  return (
    <section className="homeBar">
      <HomeSilder data={data} />
      {offerData && (
        <HomeListing
          data={offerData}
          loading={offerLoading}
          head="in offer"
          className="homeHead"
          reachClass="reachclass"
          reachName="offer"
          reach="/offers"
          hideLoad="hideLoad"
        />
      )}
      {rentData && (
        <HomeListing
          data={rentData}
          loading={rentLoading}
          head="for rent"
          className="homeHead"
          reachClass="reachclass"
          reachName="rent"
          reach={`/category/rent`}
          hideLoad="hideLoad"
        />
      )}

      {selltData && (
        <HomeListing
          data={selltData}
          loading={sellLoading}
          head="for sell"
          className="homeHead"
          reachClass="reachclass"
          reachName="sell"
          reach={`/category/sell`}
          hideLoad="hideLoad"
        />
      )}
    </section>
  );
};

export default HomePage;
