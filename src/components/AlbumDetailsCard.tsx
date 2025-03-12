import React from "react";
import "../styles/AlbumDetailsCard.css";
import AudioPlayer from "../components/AudioPlayer";

interface AlbumDetailsProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre: string[];
  tracklist: string[];
  audioSrc?: string;
}

const AlbumDetailsCard: React.FC<AlbumDetailsProps> = ({ 
  title, 
  releaseYear, 
  coverUrl, 
  genre, 
  tracklist,
  audioSrc = "/path/to/your/audio.mp3"
}) => { 
  return (    
      <div className="album-details-card">
        <img src={coverUrl} alt={`${title} cover`} />
        <h3>{title}</h3>
        <p>{releaseYear}</p>
        {genre && <p>{genre.join(", ")}</p>}  


        <AudioPlayer 
          audioSrc={audioSrc} 
          coverUrl={coverUrl}
          title={title}
          albumDetails={`${releaseYear} • ${genre.join(", ")}`}
         />     

        <ul className="tracklist">
        {tracklist.map((track, index) => (
          <li key={index} className="track">
            {track}
          </li>
        ))}
      </ul>      
      </div>
  );
};

export default AlbumDetailsCard;
