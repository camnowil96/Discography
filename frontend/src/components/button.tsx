import React, { useRef } from "react";
import "../styles/Button.css"; // Ensure styles are correct

interface GlowButtonProps {
  onClick: () => void;
}

const GlowButton: React.FC<GlowButtonProps> = ({ onClick }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  let stars: HTMLDivElement[] = [];

  const createStars = () => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;

    removeStars(); // Clear previous stars

    for (let i = 0; i < 5; i++) {
      const star = document.createElement("div");
      star.classList.add("stars");
      if (Math.random() > 0.5) star.classList.add("large");

      document.body.appendChild(star);

      const buttonRect = button.getBoundingClientRect();
      const startX = Math.random() * buttonRect.width + buttonRect.left;
      const startY = Math.random() * buttonRect.height + buttonRect.top;

      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;

      setTimeout(() => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 50 + 20;
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        star.style.transform = `rotate(45deg) translate(${moveX}px, ${moveY}px)`;
        star.style.opacity = "1";
      }, 50);

      stars.push(star);
    }
  };

  const removeStars = () => {
    stars.forEach((star) => {
      star.style.opacity = "0";
      setTimeout(() => star.remove(), 500);
    });
    stars = [];
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseOver={createStars}
      onMouseLeave={removeStars} // 💡 Fix: Remove stars on mouse leave
      className="glow-button"
    >
      ALBUMS
    </button>
  );
};

export default GlowButton;
