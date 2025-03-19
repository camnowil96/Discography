import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import { IoChevronBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import AlbumDetailsCard from "./AlbumDetailsCard";
import "../styles/ModalCustom.css";

interface AlbumData {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre: string[];
  index: number;
}

interface AlbumDetailsProps {
  show: boolean;
  onHide: () => void;
  selectedAlbum?: AlbumData;
}

const AlbumInfo = [
  {
    title: 'Dangerously in Love',
    songTitle: 'Crazy in Love ft. JAY-Z',
    releaseYear: 2003,
    coverUrl: "https://beyalbumcovers.s3.us-east-1.amazonaws.com/Dangerously-in-Love.png",
    genre: ['R&B, Pop, Hip Hop, Soul'],
    tracklist: [
      "1 Crazy in Love",
      "2 Naughty Girl",
      "3 Baby Boy",
      "4 Hip Hop Star",
      "5 Be with You",
      "6 Me, Myself and I",
      "7 Yes",
      "8 Signs",
      "9 Speechless",
      "10 That's How I Like It",
      "11 The Closer I Get To You",
      "12 Dangerously In Love 2",
      "13 Beyoncé Interlude",
      "14 Gift From Virgo",
      "15 Daddy",
    ]
  }
];

const AlbumDetailsModal: React.FC<AlbumDetailsProps> = ({ show, onHide, selectedAlbum }) => {
  const [shouldRenderContent, setShouldRenderContent] = useState(true);

  const handleClose = () => {
    setShouldRenderContent(false); // Instantly remove content
    setTimeout(() => {
      onHide(); // Close modal after delay
      setShouldRenderContent(true); // Reset state for next open
    }, 150);
  };

  const albumDetails = selectedAlbum
    ? AlbumInfo.find(album => album.title === selectedAlbum.title) || AlbumInfo[0]
    : AlbumInfo[0];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop={false}
          animation={false}
          style={{ backgroundColor: 'transparent' }}
        >
          {shouldRenderContent && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Modal.Header>
                <IoChevronBack onClick={handleClose} className="chevron-back" />
              </Modal.Header>
              <Modal.Body className="modal-details-body">
                <AlbumDetailsCard
                  title={albumDetails.title}
                  releaseYear={albumDetails.releaseYear}
                  coverUrl={albumDetails.coverUrl}
                  genre={albumDetails.genre}
                  tracklist={albumDetails.tracklist}
                  songTitle={albumDetails.songTitle}
                  index={selectedAlbum?.index}
                />
              </Modal.Body>
              <Modal.Footer />
            </motion.div>
          )}
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AlbumDetailsModal;