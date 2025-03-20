import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/AlbumDetailsCard.css";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import "../styles/CustomAudioPlayer.css";

interface AlbumDetailsProps {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre: string[];
  tracklist: string[];
  audioSrc?: string;
  songTitle?: string;
  index?: number;
}

const AlbumDetailsCard: React.FC<AlbumDetailsProps> = ({
  songTitle,
  title,
  releaseYear,
  coverUrl,
  genre,
  tracklist,
  audioSrc,
  index   
 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.15,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.1  // Make this much faster
      }
    }
  };
  
  return (
    <div className="album-details-card">
      <motion.img 
        layoutId={`album-cover-${title}-${index}`} // Ensure it matches AlbumCard
        src={coverUrl} 
        alt={`${title} cover`} 
        className="album-image"
        transition={{ type: "spring", 
          stiffness: 300, 
          damping: 25, 
          duration: 0.5 }}
      />
      
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h3>{title}</h3>
        <p>{`${releaseYear} | ${genre.join(", ")}`}</p>
        
        <AudioPlayer 
          className="custom"
          autoPlay
          src={audioSrc}
          loop={true}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          header={
            <div className={`scrolling-title ${isPlaying ? 'playing' : 'paused'}`}>
              <span>{songTitle} </span>
            </div>
          }
        />
         
         <ul className="tracklist">
          {tracklist.map((track, index) => (
            <li key={index} className="track">
              {track}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AlbumDetailsCard;