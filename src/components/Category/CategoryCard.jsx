// Import React
import React from "react";

// Import scoped CSS module styles
import styles from "./category.module.css";

// Link is used for client-side navigation (no page reload)
import { Link } from "react-router-dom";

// CategoryCard receives category data as a prop
function CategoryCard({ data }) {
  return (
    // Main category card container
    <div className={styles.category}>
      
      {/* Navigate to products filtered by category */}
      <Link to={`/category/${data?.name}`}>
        
        {/* Category title */}
        <span>
          <h2>{data?.title}</h2>
        </span>

        {/* Category image */}
        <img
          src={data?.imgLink}
          alt={`${data?.name} products`}
        />

        {/* Call-to-action text */}
        <p>Shop now</p>

      </Link>
    </div>
  );
}

// Export component for reuse
export default CategoryCard;
