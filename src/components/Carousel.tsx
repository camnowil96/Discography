import React from "react";
import styles from "../styles/Carousel.module.css";

interface carouselProps {
  images: string[];
}

const Carousel: React.FC<carouselProps> = ({ images }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.slider} style={{ "--quantity": images.length } as React.CSSProperties}>
        {images.map((image, index) => (
          <div key={index} className={styles.item} style={{ "--position": index + 1 } as React.CSSProperties}>
            <img src={image} alt={`Beyoncé ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <h1 data-content="Beyoncé Discography">Beyoncé Discography</h1>
        <div className={styles.author}>          
        </div>
        <div className={styles.model}></div>
      </div>
    </div>  
  );
};

export default Carousel;
