import Modal from "react-bootstrap/Modal";

const Modals = ({ children, show, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;
