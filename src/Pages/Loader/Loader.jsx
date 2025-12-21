import React from "react";
import { MoonLoader } from "react-spinners";



function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <MoonLoader size={50} color="#6f42c1" />
    </div>
  );
}

export default Loader;
