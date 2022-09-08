import { useContext } from "react";
import Modal from "react-modal";
import { ModalContext } from "../../context/ModalContextProvider";
import { AiFillCloseCircle } from "react-icons/ai";
import "../../index.css";
import { Button, ModalTitle, customStyles } from "./CustomModal.styled";

const CustomModal = ({ children }) => {
  const { modalIsOpen, setIsOpen, setIsCreate } = useContext(ModalContext);

  const closeModal = () => {
    setIsOpen(false);
    setIsCreate(false);
  };

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
