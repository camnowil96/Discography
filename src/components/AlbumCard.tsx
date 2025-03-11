
import React, { useState } from "react";
import AlbumDetailsModal from "./AlbumDetailsModal"; // Import the new modal
import "../styles/AlbumCard.css";

interface AlbumProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre?: string[];
}

const AlbumCard: React.FC<AlbumProps> = ({ title, releaseYear, coverUrl, genre }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="album-card" onClick={() => setModalShow(true)}>
        <img src={coverUrl} alt={`${title} cover`} />
        <h3>{title}</h3>
        <p>{releaseYear}</p>
        {genre && <p>{genre.join(", ")}</p>}
      </div>

      {/* Render the modal when the card is clicked */}
      <AlbumDetailsModal 
        show={modalShow} 
        onHide={() => setModalShow(false)} 
        title={title} 
        releaseYear={releaseYear} 
        coverUrl={coverUrl} 
        genre={genre}
      />
    </>
  );
};

export default AlbumCard;