import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { IoChevronBack } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import AlbumDetailsCard from "./AlbumDetailsCard";
import "../styles/AlbumDetailsCard.css";
import axios from "axios";
import "../styles/ModalCustom.css";

interface AlbumData {
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre: string[];
  tracklist: string[];
  songTitle: string;
  audioSrc: string;
  index: number;
}

interface AlbumDetailsProps {
  show: boolean;
  onHide: () => void;
  selectedAlbum?: { 
    title: string; 
    releaseYear: number; 
    coverUrl: string; 
    genre: string[]; 
    index: number; 
  };
  
}

const AlbumDetailsModal: React.FC<AlbumDetailsProps> = ({ show, onHide, selectedAlbum }) => {
  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const [albumDetails, setAlbumDetails] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (selectedAlbum?.title) {
        try {
          const response = await axios.get(`/api/album/${selectedAlbum.title}`);
          setAlbumDetails(response.data);  // Assuming response.data has album details
        } catch (error) {
          console.error("Error fetching album details:", error);
        }
      }
    };

    if (show && selectedAlbum) {
      fetchAlbumDetails();
    }
  }, [show, selectedAlbum]);

  const handleClose = () => {
    setShouldRenderContent(false); // Instantly remove content
    setTimeout(() => {
      onHide(); // Close modal after delay
      setShouldRenderContent(true); // Reset state for next open
    }, 150);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {show && albumDetails && (
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
                  audioSrc={albumDetails.audioSrc}
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
