import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlbumGrid from "../components/AlbumGrid";

interface ViewAlbumsProps {
  show: boolean;
  onHide: () => void;
}

const ViewAlbums: React.FC<ViewAlbumsProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton />
      <Modal.Body className="grid-example" >
        <AlbumGrid />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className="" disabled={false} type="button">
          Close
        </Button>
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
