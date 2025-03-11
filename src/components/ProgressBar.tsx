import React from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  progress: number; // Percentage (0-100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <div className="progress-handle" style={{ left: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
