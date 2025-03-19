import React from "react";
import styles from "../styles/Carousel.module.css";


interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  // Filter out the image you don't want in the carousel
  const filteredImages = images.filter((image) => !image.includes("aoty.png"));

  // Get the aoty image separately for setting as background
  const aotyImage = images.find((image) => image.includes("aoty.png"));
  console.log("AOTY Image URL:", aotyImage);
  return (
    <div className={styles.banner}>
      <div className={styles.slider} style={{ "--quantity": filteredImages.length -1 } as React.CSSProperties}>
        {filteredImages.map((image, index) => (
          <div key={index} className={styles.item} style={{ "--position": index + 1 } as React.CSSProperties}>
            <img src={image} alt={`Beyoncé ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <h1 data-content="Beyoncé Discography">Beyoncé Discography</h1>
        <div className={styles.author}></div>
        {/* This is where the background should be set */}
        <div 
          className={styles.model} 
          style={{
            backgroundImage: aotyImage ? `url(${aotyImage})` : "none",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
