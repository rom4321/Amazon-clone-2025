import React, { useContext, useState, useEffect } from "react";
import Layout from '../../components/Layout/Layout';
import classes from "./orders.module.css";
import { db } from "../../Utility/Firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { BiLoader } from "react-icons/bi";
import moment from 'moment';

function Orders() {
  // Get current user from global context
  const [{ user }, dispatch] = useContext(DataContext);

  // Local state to store all orders fetched from Firestore
  const [orders, setOrders] = useState([]);

  // 🔹 Fetch user's orders from Firestore on component mount
  useEffect(() => {
    if (user) {
      // Listen to changes in the user's orders collection
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc") // most recent orders first
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,                   // Firestore document ID
              created: doc.data().created,  // Timestamp when order was created
              amount: doc.data().amount,    // Total amount for this order
              data: doc.data(),             // Entire document data (e.g., basket items)
            }))
          );
        });
    } else {
      // Reset orders if no user is logged in
      setOrders([]);
    }
  }, []); // Only runs once on mount

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2 style={{ margin: "20px" }}>Your Orders</h2>

          {/* Show message if no orders exist */}
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}

          {/* Render all orders */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />

                  {/* Order summary: ID, amount, and purchase date */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      fontWeight: "500",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <p>
                      Order ID:{" "}
                      <span style={{ color: "var(--primary-shade)" }}>
                        {eachOrder?.id}
                      </span>
                    </p>
                    <p>
                      Total Amount:{" "}
                      <span style={{ color: "var(--primary-shade)" }}>
                        ${eachOrder?.amount.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Purchased Date:{" "}
                      <span style={{ color: "var(--primary-shade)" }}>
                        {moment(eachOrder?.created * 1000).format(
                          'dddd, MMM DD, YYYY h:mm A'
                        )}
                      </span>
                    </p>
                  </div>

                  {/* Render each product in the order */}
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard
                      flex={true}
                      product={order}
                      itemAmount={order.amount} // Show quantity for each item
                      total={true}              // Optional flag for ProductCard
                      key={order.id}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
