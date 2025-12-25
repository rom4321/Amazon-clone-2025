import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FakeStoreAPI_BaseURL } from "../../API/EndPoints";
import styles from "./results.module.css";
import ProductDetail from "../ProductDetail/ProductDetail";
import Layout from "../../components/Layout/Layout";
import Loader from "../Loader/Loader";
import ProductCard from "../../components/Product/ProductCard";

/**
 * Results Component:
 * Fetches and displays a list of products based on a specific category 
 * retrieved from the URL parameters.
 */
function Results() {
  // Extract categoryName from the URL (e.g., /category/electronics)
  const { categoryName } = useParams();
  
  // State to store the list of products fetched from the API
  const [results, setResults] = useState([]);
  
  // State to track the loading status for UI feedback
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    // Start loader before initiating the API call
    setIsloading(true);
    
    // Fetch products belonging to the current category
    axios
      .get(`${FakeStoreAPI_BaseURL}/products/category/${categoryName}`)
      .then((res) => {
        // Update results state with data from the API response
        setResults(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        // Log errors and stop the loader even if the request fails
        console.error("Error fetching category results:", err);
        setIsloading(false);
      });
      
    // Re-run this effect whenever the categoryName in the URL changes
  }, [categoryName]);

  return (
    <Layout>
      <section>
        {/* Header Section showing current path */}
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />

        {/* Conditional Rendering: Show Loader while fetching, otherwise show results */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {/* Map through the results array and render a ProductCard for each item */}
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false} // Hiding description on the results grid
                renderAdd={true}   // Showing the 'Add to Cart' button
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;