import React, { useState } from "react";
import GlowButton from "../components/button.tsx";
import Modal from "react-bootstrap/Modal";
import AlbumGrid from "../components/AlbumGrid";
import "../styles/ModalCustom.css";
import { IoChevronBack } from "react-icons/io5";
import "../styles/Button.css";

interface ViewAlbumsProps {
  show: boolean;
  onHide: () => void;
}

const ViewAlbums: React.FC<ViewAlbumsProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
       <Modal.Header>
        <IoChevronBack onClick={onHide} className="chevron-back" />
       </Modal.Header>
      <Modal.Body className="grid-example" >
        <h1 className="h1">Beyoncé Albums</h1>
        <AlbumGrid />
      </Modal.Body>
      <Modal.Footer>       
      </Modal.Footer>
    </Modal>
  );
};

const App: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <>
      <GlowButton onClick={() => setModalShow(true)}/>          
      <ViewAlbums show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default App;

