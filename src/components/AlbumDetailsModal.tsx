import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoChevronBack } from "react-icons/io5";
import AlbumDetailsCard from "../components/AlbumDetailsCard";
import "../styles/ModalCustom.css";


interface AlbumDetailsProps {
  show: boolean;
  onHide: () => void;
}
const AlbumInfo = [
  {title:'Dangerously in Love', songTitle: 'Crazy in Love', releaseYear:2003, coverUrl:"https://beyalbumcovers.s3.us-east-1.amazonaws.com/Dangerously-in-Love.png", genre:['R&B, Pop, Hip Hop, Soul'], 
   tracklist:[
    "1. Crazy in Love",
    "2. Naughty Girl",
    "3. Baby Boy",
    "4. Hip Hop Star",
    "5. Be with You",
    "6. Me, Myself and I",
    "7. Yes",
    "8. Signs",
    "9. Speechless",
    "10. That's How I Like It",
    "11. The Closer I Get To You",
    "12. Dangerously In Love 2",
    "13. Beyoncé Interlude",
    "14. Gift From Virgo",
    "15. Daddy",
   ]
  }];

const AlbumDetailsModal: React.FC<AlbumDetailsProps> = ({ show, onHide, }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <IoChevronBack onClick={onHide} className="chevron-back" />
       </Modal.Header>
      <Modal.Body className="modal-details-body">
        {AlbumInfo.map((album, index) => (
          <AlbumDetailsCard
          key={index}
          title={album.title}          
          releaseYear={album.releaseYear}
          coverUrl={album.coverUrl} 
          genre={album.genre}
          tracklist={album.tracklist}
          songTitle={album.songTitle}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default AlbumDetailsModal;
