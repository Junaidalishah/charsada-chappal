import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";
import snapshot from "../Data/productsSnapshot.json";

// One shared request per page load; components render the build-time snapshot
// immediately and swap in live data (stock, prices, reviews) when it arrives.
let livePromise = null;
let liveData = null;

export const loadProducts = () => {
  if (!livePromise) {
    livePromise = axios
      .get(`${API_URL}/products`)
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) liveData = data;
        return liveData || snapshot;
      })
      .catch(() => liveData || snapshot);
  }
  return livePromise;
};

export const getProductsSync = () => liveData || snapshot;

export default function useProducts() {
  const [products, setProducts] = useState(getProductsSync);

  useEffect(() => {
    let alive = true;
    loadProducts().then((data) => alive && setProducts(data));
    return () => {
      alive = false;
    };
  }, []);

  return products;
}

export const ratingInfo = (reviews) => {
  if (!reviews || reviews.length === 0) return { avg: 0, count: 0 };
  const total = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
  return { avg: (total / reviews.length).toFixed(1), count: reviews.length };
};
