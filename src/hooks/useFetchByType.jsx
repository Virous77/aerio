import { useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const useFetchByType = (collections, number) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    const productRef = collection(db, collections);
    const items = query(
      productRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      limit(number)
    );

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(allProducts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchByType;