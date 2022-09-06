import { useState, createContext } from "react";

const ModalContext = createContext({
  modalIsOpen: false,
  setIsOpen: () => {},
  openModal: () => {},
});

const ModalProvider = ({ children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  const sampleModalContext = {
    modalIsOpen,
    setIsOpen,
    openModal,
  };

  return (
    <ModalContext.Provider value={sampleModalContext}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
