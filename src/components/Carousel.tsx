import React, { useState, useEffect } from 'react';
import "../styles/Carousel.css";

interface CarouselSlides {
  id: number;
  image: string;
  alt: string;
}

const carouselSlides: CarouselSlides[] = [
  {
    id: 1,
    image: "https://people.com/thmb/IvHOfHT4XNDLkNMprw9wyvLRO90=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(714x168:716x170)/beyonce-east-rutherford-072923_2779-2152aadcfa4542a5889f247a64d797e2.jpg",
    alt: "Beyonce 1"
  },
  {
    id: 2,
    image: "https://www.usatoday.com/gcdn/authoring/authoring-images/2025/02/03/USAT/78169700007-gty-2197322895.jpg?crop=1965,1966,x0,y147",
    alt: "Beyonce 2"
  },
  {
    id: 3,
    image: "https://www.wondermind.com/wp-content/uploads/2023/10/Beyonce_1.png",
    alt: "Beyonce 3"
  },
  {
    id: 4,
    image: "https://hips.hearstapps.com/hmg-prod/images/beyonc-c3-a9-attends-the-atlantis-the-royal-grand-reveal-weekend-news-photo-1674462721.jpg?crop=1.00xw:0.669xh;0,0.135xh&resize=640:*",
    alt: "Beyonce 4"
  }
];

const Carousel = () => {
    const [slide, setSlide] = useState(0);
    const [rotation, setRotation] = useState(0);
    
    const nextSlide = () => {
      setSlide((prev) => prev === carouselSlides.length - 1 ? 0 : prev + 1);
      setRotation((prev) => prev - 90); // Always decrease by 90 degrees (never reset)
    };
    
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="container">
        <div 
          className="slider" 
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {carouselSlides.map((image, idx) => (
            <img
              key={image.id}
              src={image.image}
              alt={image.alt}
              className="slide"
              style={{
                transform: `rotateY(${idx * 90}deg) translateZ(500px)`
              }}
            />
          ))}
        </div>
      </div>
    );
  };

export default Carousel;