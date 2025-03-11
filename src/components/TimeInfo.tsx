import React from "react";

interface TimeInfoProps {
  currentTime: string; // e.g., "2:45"
  duration: string; // e.g., "4:30"
}

const TimeInfo: React.FC<TimeInfoProps> = ({ currentTime, duration }) => {
  return (
    <div className="d-flex justify-content-between time-info">
      <span>{currentTime}</span>
      <span>{duration}</span>
    </div>
  );
};

export default TimeInfo;
