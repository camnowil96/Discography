import React from 'react';
import AlbumCard from './AlbumCard';
import BeeAnimation from './BeeAnimation';
import "../styles/AlbumGrid.css";
import "../styles/BeeAnimation.css";

const albums = [
  { title: 'Dangerously in Love', releaseYear: 2003, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Dangerously-in-Love.png'},
  { title: 'Live at Wembley', releaseYear: 2004, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Live-at-Wembley.png' },
  { title: "B'Day", releaseYear: 2006, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Bday.png'},
  { title: 'The Beyoncé Experience Live', releaseYear: 2007, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/The-Beyonce-Experience.png' },
  { title: 'I Am... Sasha Fierce', releaseYear: 2008, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/I-am-Sasha-Fierce.png'},
  { title: 'I Am... Yours: An Intimate Performance at Wynn Las Vegas', releaseYear: 2009, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/I-am-Yours.png' },
  { title: 'I Am... World Tour', releaseYear: 2010, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/I-am-World-Tour.png'},
  { title: '4', releaseYear: 2011, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/4.png'},
  { title: 'Beyoncé', releaseYear: 2013, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Self-Titled.png' },
  { title: 'Lemonade', releaseYear: 2016, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Lemonade.png'},
  { title: 'Everything is Love', releaseYear: 2018, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Everything-is-Love.png' },
  { title: 'The Lion King: The Gift', releaseYear: 2019, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/The-Gift.png'},
  { title: 'Homecoming', releaseYear: 2019, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Homecoming.png' },
  { title: 'Renaissance', releaseYear: 2022, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Renaissance.png' },
  { title: "Cowboy Carter", releaseYear: 2024, coverUrl: 'https://beyalbumcovers.s3.us-east-1.amazonaws.com/Cowboy-Carter.png' },  
];

const AlbumGrid: React.FC = () => {
  return (
    <div className="album-grid">
      {albums.map((album, index) => (
        <AlbumCard
          key={index}
          title={album.title}
          releaseYear={album.releaseYear}
          coverUrl={album.coverUrl}
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
