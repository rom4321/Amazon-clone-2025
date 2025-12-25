// Import React library to use JSX and components
import React from "react";

// Import list of category information (array of objects)
import { categoryInfos } from "./categoryData.js";

// Import the card component that displays each category
import CategoryCard from "./CategoryCard";

// Import CSS Module for scoped styling
import styles from "./category.module.css";

// Functional component that renders all product categories
function Category() {
  return (
    // Container section styled using CSS module class
    <section className={styles.category__container}>
      {/* Loop through categoryInfos array and render a CategoryCard for each item */}
      {categoryInfos.map((infos) => (
        // Key helps React uniquely track each element
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  );
}

// Export component so it can be used in other files
export default Category;
