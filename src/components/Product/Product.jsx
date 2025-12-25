import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./product.module.css";
import Loader from "../../Pages/Loader/Loader";
import ProductCard from "./ProductCard";
import { FakeStoreAPI_BaseURL } from "../../API/endPoints";

/**
 * Product Component
 * -----------------
 * Fetches products from the FakeStore API and displays them using ProductCard.
 * Handles loading state and error logging.
 */
function Product() {
  // State to store products
  const [products, setProducts] = useState([]);

  // Loading state for API call
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    axios
      .get(`${FakeStoreAPI_BaseURL}/products`)
      .then((res) => {
        setProducts(res.data); // Save fetched products
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err); // Log errors
      })
      .finally(() => {
        setIsLoading(false); // Stop loader after request
      });
  }, []);

  // Show loader while fetching products
  if (isLoading) return <Loader />;

  return (
    <section className={classes.products_container}>
      {/* Map through products and render a ProductCard for each */}
      {products.map((singleProduct) => (
        <ProductCard
          key={singleProduct.id}  // Unique key for React rendering
          product={singleProduct} // Pass product data
          renderAdd               // Show "Add to cart" button
        />
      ))}
    </section>
  );
}

export default Product;
