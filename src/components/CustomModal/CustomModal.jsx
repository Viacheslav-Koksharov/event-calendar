import { useContext } from "react";
import Modal from "react-modal";
import { ModalContext } from "../../context/ModalContextProvider";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, ModalTitle, customStyles } from "./CustomModal.styled";
import "../../index.css";

const CustomModal = ({ children }) => {
  const { modalIsOpen, setIsOpen } = useContext(ModalContext);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal Form"
    >
      <Button onClick={closeModal}>
        <AiFillCloseCircle className="IconStyle" />
      </Button>

      <ModalTitle>Add new idea item</ModalTitle>
      {children}
    </Modal>
  );
};

export default CustomModal;
