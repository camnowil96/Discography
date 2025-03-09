import React from 'react'
import "../styles/AlbumCard.css";

interface AlbumProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
}

const AlbumCard: React.FC<AlbumProps> = ({ title, releaseYear, coverUrl }) => {
  return (
    <div className="album-card">
      <img src={coverUrl} alt={`${title} cover`} />
      <h3>{title}</h3>
      <p>{releaseYear}</p>
    </div>
  );
};

export default AlbumCard;
