import React, { useState } from "react";
import { motion } from "framer-motion";
import AlbumDetailsModal from "./AlbumDetailsModal";
import "../styles/AlbumCard.css";
import "../styles/AlbumDetailsCard.css";

interface AlbumProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre?: string[];
  index: number;
}

const AlbumCard: React.FC<AlbumProps> = ({ title, releaseYear, coverUrl, genre, index }) => {
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <>
      <div className="album-card" onClick={() => setModalShow(true)}>
        <div className="album-image-container">
        <motion.img 
            layoutId={`album-cover-${title}-${index}`}  // Ensure layoutId includes index
            src={coverUrl} 
            alt={`${title} cover`} 
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.5
            }}
          />
        </div>
        <h3>{title}</h3>
        <p>{releaseYear}</p>
        {genre && <p>{genre.join(", ")}</p>}
      </div>
      
      <AlbumDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedAlbum={{ title, releaseYear, coverUrl, genre: genre || [], index }}
      />
    </>
  );
};

export default AlbumCard;