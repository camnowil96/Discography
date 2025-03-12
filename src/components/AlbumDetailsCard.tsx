import React, { useState } from "react";
import AlbumDetailsModal from "./AlbumDetailsModal"; // Import the new modal
import "../styles/AlbumCard.css";
import AudioPlayer from "..components/AudioPlayer"

interface AlbumProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre: string[];
  tracklist: string[];
}

const AlbumDetailsCard: React.FC<AlbumProps> = ({ title, releaseYear, coverUrl, genre, tracklist }) => { 

  return (    
      <div className="album-card">
        <img src={coverUrl} alt={`${title} cover`} />
        <h3>{title}</h3>
        <p>{releaseYear}</p>
        {genre && <p>{genre.join(", ")}</p>}
        <AlbumDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Album Title"
          releaseYear={2023}
          coverUrl="/path/to/album-cover.jpg"
          genre={["Rock", "Alternative"]}
          audioSrc="/path/to/audio-track.mp3"
        />
      </div>
  );
};

export default AlbumDetailsCard;
