// Import useState hook from React
import { useState } from "react";

// Import global CSS styles for the App component
import "./App.css";

// Import Routing component (handles all app routes/pages)
import Routing from "../Router";

function App() {
  // State declaration (currently unused, safe to remove if not needed)
  const [count, setCount] = useState(0);

  // Main App component render
  return (
    <>
      {/* Routing component controls navigation between pages */}
      <Routing />
    </>
  );
}

// Export App component so it can be used in main.jsx / index.js
export default App;
