import { useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const useFetchByListingType = (collections, types, number) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderMore, setLoadMore] = useState(null);

  const getCollection = async () => {
    setLoading(true);
    const productRef = collection(db, `${collections}`);
    const items = query(
      productRef,
      where("type", "==", `${types}`),
      orderBy("timestamp", "desc"),
      limit(number)
    );

    const querysnap = await getDocs(items);
    const lastVisible = querysnap.docs[querysnap.docs.length - 1];

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoadMore(lastVisible);
      setData(allProducts);
      setLoading(false);
    });
  };

  const fetchIt = async () => {
    const productRef = collection(db, `${collections}`);
    const items = query(
      productRef,
      where("type", "==", `${types}`),
      orderBy("timestamp", "desc"),
      startAfter(loaderMore),
      limit(5)
    );

    const querysnap = await getDocs(items);
    const lastVisible = querysnap.docs[querysnap.docs.length - 1];

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoadMore(lastVisible);
      setData((prevState) => [...prevState, ...allProducts]);
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {
    data,
    loading,
    fetchIt,
    loaderMore,
  };
};

export default useFetchByListingType;
