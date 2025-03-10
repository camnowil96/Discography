import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IoChevronBack } from "react-icons/io5";
import "../styles/ModalCustom.css";

interface AlbumDetailsProps {
  show: boolean;
  onHide: () => void;
  title: string;
  releaseYear: number;
  coverUrl: string;
  genre?: string[];
}

const AlbumDetailsModal: React.FC<AlbumDetailsProps> = ({ show, onHide, title, releaseYear, coverUrl, genre }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <IoChevronBack onClick={onHide} className="chevron-back" />
       </Modal.Header>
      <Modal.Body>
        <img src={coverUrl} alt={`${title} cover`} style={{ width: "100%", borderRadius: "10px", objectFit: 'cover' }} />
        <h3 className="h3">{title}</h3>
        <p className="p">Release Year: {releaseYear}</p>
        {genre && <p>Genre: {genre.join(", ")}</p>}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default AlbumDetailsModal;

