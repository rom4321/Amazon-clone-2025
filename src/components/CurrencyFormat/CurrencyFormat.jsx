import React from "react";
import numeral from "numeral";

/**
 * CurrencyFormat Component
 * ------------------------
 * Formats a numeric amount into a USD currency string
 * Example: 1234.5 → $1,234.50
 */
const CurrencyFormat = ({ amount }) => {
  // Format the amount using numeral.js
  const formattedAmount = numeral(amount).format("$0,0.00");

  // Render formatted currency value
  return <div>{formattedAmount}</div>;
};

export default CurrencyFormat;
