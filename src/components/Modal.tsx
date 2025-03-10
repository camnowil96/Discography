import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlbumGrid from "../components/AlbumGrid";
import "../styles/ModalCustom.css";
import { IoChevronBack } from "react-icons/io5";

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
      <Button type="button" onClick={() => setModalShow(true)} disabled={false} className="btn btn-primary four">
        Launch modal with grid
      </Button>

      <ViewAlbums show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default App;
