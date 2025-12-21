// Import React and required hooks
import React, { useEffect, useState } from "react";

// useParams is used to read URL parameters (e.g. product ID)
import { useParams } from "react-router-dom";

// Axios for making HTTP requests
import axios from "axios";

// Base URL for Fake Store API
import { FakeStoreAPI_BaseURL } from "../../API/EndPoints";

// Layout wrapper component (header, footer, etc.)
import Layout from "../../components/Layout/Layout";

// Loader component shown while data is being fetched
import Loader from "../Loader/Loader";

// Reusable ProductCard component for displaying product details
import ProductCard from "../../components/Product/ProductCard";

function ProductDetail() {
  // State to store single product data
  const [product, setProduct] = useState({});

  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // Extract productId from the URL (e.g. /products/5)
  const { productId } = useParams();

  // Fetch product details when component mounts
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${FakeStoreAPI_BaseURL}/products/${productId}`)
      .then((res) => {
        console.log(res.data, productId); // Debug: log fetched product
        setProduct(res.data);            // Save product to state
        setIsLoading(false);             // Stop loading
      })
      .catch((err) => {
        console.log(err);                // Log any API errors
        setIsLoading(false);             // Stop loading even on error
      });
  }, []); // Empty dependency array → runs once on component mount

  return (
    <Layout>
      {console.log(product)} {/* Debug: log product state */}

      {/* Show loader while fetching data */}
      {isLoading ? (
        <Loader />
      ) : (
        // Display product details once data is loaded
        <ProductCard
          product={product}
          flex={true}        // Enables flex layout
          renderDesc={true}  // Shows product description
          renderAdd={true}   // Shows "Add to Cart" button
        />
      )}
    </Layout>
  );
}

// Export ProductDetail component
export default ProductDetail;
