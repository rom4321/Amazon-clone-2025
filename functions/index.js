// Import Firebase HTTPS Cloud Function (v2)
const { onRequest } = require("firebase-functions/v2/https");
// Firebase logger for debugging
const { logger } = require("firebase-functions/logger");

// Import core backend libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with secret key from environment variables
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Create an Express app
const app = express();

// Enable CORS (so frontend can call backend even if hosted separately)
app.use(cors({ origin: true }));

// Allow JSON request body
app.use(express.json());

// Test route to verify server is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

// Create payment intent route - frontend calls this to start a Stripe payment
app.post("/payment/create", async (req, res) => {

  // Get total from query parameter
  const total = Number(req.query.total);

  // Validate amount
  if (!total || total <= 0) {
    return res.status(403).json({
      message: "Payment amount must be greater than zero.",
    });
  }

  try {
    // Create the Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount in cents (e.g. $10 = 1000)
      currency: "USD",
    });

    // Send back client secret to frontend
    res.status(200).json({
      clientPaymentSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    // Handle Stripe or backend errors
    res.status(500).json({ error: err.message });
  }
});

// Export Cloud Function so Firebase can run it
exports.api = onRequest(app);
