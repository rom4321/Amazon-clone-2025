import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./carousel.module.css";

function CarouselEffect() {
  return (
    <div>
      {/* 
        Carousel component from react-responsive-carousel
        Used for hero/banner image sliding effect
      */}
      <Carousel
        autoPlay={true}          // Automatically play slides
        infiniteLoop={true}      // Loop slides infinitely
        showIndicators={false}   // Hide dot indicators
        showThumbs={false}       // Hide thumbnail previews
      >
        {/* 
          Map through image URLs and render each as a slide 
        */}
        {img.map((imageItemLink, index) => {
          return (
            <img
              key={index}        // Key required by React
              src={imageItemLink}
              alt={`carousel-${index}`} // Accessibility improvement
            />
          );
        })}
      </Carousel>

      {/* 
        Decorative bottom overlay (gradient / curve / shadow)
        Usually used to blend carousel into next section
      */}
      <div className={styles["hero__img--bottom"]}></div>
    </div>
  );
}

export default CarouselEffect;
