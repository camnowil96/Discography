import React from 'react';
import BeeAnimation from './BeeAnimation';
import "../styles/AlbumGrid.css";
import "../styles/BeeAnimation.css";
import AlbumDetailsModal from './AlbumCard';

const albums = [
    { title: 'Dangerously in Love', releaseYear: 2003, genre: ["RnB"], coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Dangerously-in-Love.png', tracklist: ["Crazy in Love, Naughty Girl, Baby Boy, Hip Hop Star, Be with You, Me, Myself and I, Yes, Signs, Speechless, That's How I Like It, The Closer I Get To You, Dangerously In Love 2, Beyoncé Interlude, Gift From Virgo, Daddy"]}
];

const EachAlbumGrid: React.FC = () => {
  return (
    <div className="album-grid">
      {albums.map((album, index) => (
        <AlbumDetailsModal
          key={index}
          title={album.title}
          releaseYear={album.releaseYear}
          tracklist={album.tracklist}
          genre={album.genre}
          coverUrl={album.coverUrl}          
        />
      ))}
    </div>
  );
};

export default EachAlbumGrid;
