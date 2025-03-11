import React from "react";
import "../styles/AudioPlayer.css";

interface TrackInfoProps {
  imageUrl: string;
  title: string;
  albumDetails: string;
}

const TrackInfo: React.FC<TrackInfoProps> = ({ imageUrl, title, albumDetails }) => {
  return (
    <div className="track-info">
      <img src={imageUrl} alt="Album Cover" className="track-image" />
      <div>
        <div className="marquee">
          <span className="h5 mb-1">{title}</span>
        </div>
        <p className="text-muted mb-0">{albumDetails}</p>
      </div>
    </div>
  );
};

export default TrackInfo;
