// React & hooks
import React, { useContext, useState } from "react";

// Page layout wrapper
import Layout from "../../components/Layout/Layout";

// Product card UI component
import ProductCard from "../../components/Product/ProductCard";

// CSS module for styling
import styles from "./payment.module.css";

// Global state provider
import { DataContext } from "../../components/DataProvider/DataProvider";

// Component to format currency output
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";

// Loading spinner (UI)
import { ClipLoader } from "react-spinners";

// Routing navigation hook
import { useNavigate } from "react-router-dom";

// Redux-like action types
import { Type } from "../../Utility/action.type";

// Stripe Hooks for payment + Card UI input
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Axios instance to call backend API
import { axiosInstance } from "../../API/axios";

// Firebase DB (Firestore)
import { db } from "../../Utility/Firebase";

function Payment() {
  // Get user & basket from global context
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Component state – errors & loading
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Stripe setup
  const stripe = useStripe();
  const elements = useElements();

  // Total item count
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  // Total amount price
  const total = basket.reduce((allocator, item) => {
    return item.price * item.amount + allocator;
  }, 0);

  /**
   * 🔹 Card input change handler
   * Shows real-time card validation errors while typing
   */
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  /**
   * 🧾 Payment flow:
   * 1️⃣ Send total to backend → get clientSecret
   * 2️⃣ Confirm payment on Stripe
   * 3️⃣ Save order to Firestore
   * 4️⃣ Empty basket + redirect to Orders page
   */
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // 1️⃣ Ask backend to create payment intent
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // Stripe expects amount in cents
      });

      const clientSecret = response.data?.clientPaymentSecret;

      // 2️⃣ Confirm payment on Stripe (client-side)
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), // Collects card details
        },
      });

      // 3️⃣ Save order in Firestore DB
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // 🧹 Clear basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);

      // 4️⃣ Redirect → Orders Page
      navigate("/orders", { state: { msg: "you have placed new Order" } });

    } catch (error) {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className={styles.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={styles.payment}>
        {/* Delivery address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Basket Items */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>

          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* Show real-time card errors */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* Stripe card input UI */}
                <CardElement onChange={handleChange} />

                {/* Total price & Pay button */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
