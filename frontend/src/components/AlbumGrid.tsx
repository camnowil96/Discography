import React, { useEffect, useState } from "react";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import "../styles/AlbumGrid.css";

interface Album {
  title: string;
  releaseYear: number;
  coverUrl: string;
}

const AlbumGrid: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:8000/albums");
        setAlbums(response.data);  
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);  // Empty dependency array ensures this runs once on mount

  return (
    <div className="album-grid">
      {albums.map((album, index) => (
        <AlbumCard
          key={index}
          title={album.title}
          releaseYear={album.releaseYear}
          coverUrl={album.coverUrl}
          index={index}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
