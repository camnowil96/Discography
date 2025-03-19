import React from "react";
import { FaStepBackward, FaPlay, FaPause, FaStepForward, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import "../styles/AudioPlayer.css";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <>
      <div className="controls">  

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
      </div>
        {/* Volume Control */}
      <div className="volume-control">
        <button className="control-button">
          <FaVolumeUp size={20} />
        </button>
        <button className="control-button">
          <FaVolumeDown size={20} />
        </button>
        <div className="volume-slider">
          <div className="volume-level"></div>      
      </div>
    </div>
  </>
  );
};

export default Controls;
