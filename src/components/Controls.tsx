import React from "react";
import { FaRandom, FaStepBackward, FaPlay, FaPause, FaStepForward, FaVolumeUp } from "react-icons/fa";
import "../styles/Controls.css";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <div className="controls">
      {/* Shuffle Button */}
      <button className="control-button">
        <FaRandom size={20} />
      </button>

      {/* Previous Track */}
      <button className="control-button">
        <FaStepBackward size={20} />
      </button>

      {/* Play/Pause Button */}
      <button className="play-button" onClick={onPlayPause}>
        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
      </button>

      {/* Next Track */}
      <button className="control-button">
        <FaStepForward size={20} />
      </button>

      {/* Volume Control */}
      <div className="volume-control">
        <button className="control-button">
          <FaVolumeUp size={20} />
        </button>
        <div className="volume-slider">
          <div className="volume-level"></div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
