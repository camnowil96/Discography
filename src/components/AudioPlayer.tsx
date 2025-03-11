import React, { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import TimeInfo from "./TimeInfo";
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import "../styles/AudioPlayer.css";

interface AudioPlayerProps {
  audioSrc: string;
  imageUrl: string;
  title: string;
  albumDetails: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  imageUrl,
  title,
  albumDetails
}) => {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  // References
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  // For animation frame ID, we use a mutable ref, not a RefObject
  const animationRef = useRef<number | undefined>(undefined);

  // Format time in MM:SS format
  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Load audio metadata when component mounts or audio source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const setAudioData = () => {
      setDuration(audio.duration);
    };

    // Set up event listeners
    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('ended', handleEnded);
    
    // Clean up event listeners
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('ended', handleEnded);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioSrc]);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  // Update progress bar while playing
  const whilePlaying = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
    
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  // Handle when audio ends
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setProgress(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Change progress when user interacts with progress bar
  const changeProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressContainer = progressContainerRef.current;
    
    if (!audio || !progressContainer) return;
    
    const rect = progressContainer.getBoundingClientRect();
    const width = rect.width;
    const clickX = e.clientX - rect.left;
    
    const newProgress = (clickX / width) * 100;
    const newTime = (audio.duration * newProgress) / 100;
    
    setProgress(newProgress);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="audio-player">
      {/* Audio Element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {/* Track Information Component */}
      <TrackInfo 
        imageUrl={imageUrl} 
        title={title} 
        albumDetails={albumDetails} 
      />
      
      {/* Progress Bar Component with Click Handling */}
      <div ref={progressContainerRef} onClick={changeProgress}>
        <ProgressBar progress={progress} />
      </div>
      
      {/* Time Information Component */}
      <TimeInfo 
        currentTime={formatTime(currentTime)} 
        duration={formatTime(duration)} 
      />
      
      {/* Controls Component */}
      <Controls 
        isPlaying={isPlaying} 
        onPlayPause={togglePlayPause} 
      />
    </div>
  );
};

export default AudioPlayer;