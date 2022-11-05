import React from "react";
import { useParams } from "react-router-dom";
import useFetchSingleData from "../hooks/useFetchSingleData";
import Slider from "../components/Slider";
import MainLoader from "../components/UI/MainLoader";
import DeatilsLeft from "../components/DeatilsLeft";
import DetailstRight from "../components/DetailstRight";
import "../styles/Category.css";

const CategoryPage = () => {
  const { id } = useParams();

  const { userData, loading } = useFetchSingleData("aerioListing", id);

  console.log(userData);

  if (loading) return <MainLoader />;

  return (
    <section className="listingDetails">
      <Slider image={userData.imgUrls} />

      <div className="detailsContent">
        <DeatilsLeft userData={userData} />
        <DetailstRight userData={userData} />
      </div>
    </section>
  );
};

export default CategoryPage;
