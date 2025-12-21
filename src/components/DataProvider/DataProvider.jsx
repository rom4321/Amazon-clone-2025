import React, { createContext, useReducer } from "react";

/**
 * DataContext
 * -----------
 * Global context used to share state and dispatch
 * across the entire application (cart, user, etc.)
 */
export const DataContext = createContext();

/**
 * DataProvider Component
 * ---------------------
 * Wraps the app and provides global state management
 * using React Context + useReducer
 *
 * @param {ReactNode} children - Components that need access to global state
 * @param {Function} reducer - Reducer function to manage state updates
 * @param {Object} initialState - Initial global state
 */
export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider
      value={useReducer(reducer, initialState)}
    >
      {children}
    </DataContext.Provider>
  );
};
