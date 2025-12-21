import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { BsFillCartXFill } from "react-icons/bs";

/**
 * ProductCard Component
 * ---------------------
 * Displays product information including image, title, price, rating,
 * and buttons to add/remove items from cart.
 *
 * Props:
 * - product: object containing product data
 * - flex: boolean, if true applies flex layout
 * - renderDesc: boolean, if true shows description
 * - renderAdd: boolean, if true shows "Add to cart" button
 * - showRemoveItem: boolean, if true shows "Remove item" button
 * - itemAmount: number, quantity of item in cart
 * - total: boolean, if true shows total price
 */
function ProductCard({
  product,
  flex,
  renderDesc,
  renderAdd,
  showRemoveItem,
  itemAmount,
  total,
}) {
  // Destructure product fields
  const { image, title, id, rating, price, description } = product;

  // Get global state and dispatch from Context API
  const [state, dispatch] = useContext(DataContext);

  /**
   * Add product to cart
   * Dispatches ADD_TO_BASKET action
   */
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
  };

  return (
    <div
      className={`${styles.card__container} ${
        flex ? styles.product__flexed : ""
      }`}
    >
      {/* Clicking image navigates to product detail page */}
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={styles.img_container} />
      </Link>

      <div>
        {/* Product title */}
        <h3>{title}</h3>

        {/* Conditionally render description */}
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}

        {/* Rating section */}
        <div className={styles.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>

        {/* Price + quantity + remove button container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Price */}
          <CurrencyFormat amount={price} />

          {/* Quantity if item exists in cart */}
          {itemAmount && (
            <p style={{ fontWeight: "500", color: "var(--primary-color)" }}>
              Quantity: {itemAmount}
            </p>
          )}

          {/* Total price */}
          {total && (
            <p style={{ fontWeight: "500", color: "var(--primary-color)" }}>
              Total: ${price * itemAmount}
            </p>
          )}

          {/* Remove item button */}
          {showRemoveItem && (
            <button
              className={styles.button}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "7px",
                padding: "5px",
              }}
              onClick={() =>
                dispatch({ type: Type.REMOVE_ITEM_IMMEDIATELY, id })
              }
            >
              <BsFillCartXFill size={20} />
              Remove Item
            </button>
          )}
        </div>

        {/* Add to cart button */}
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
