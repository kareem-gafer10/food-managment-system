import { useState } from "react";

const useModals = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return { show, handleClose, handleShow };
};

export default useModals;
