import { useState, createContext } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [isCreate, setIsCreate] = useState(false);

  const openModal = (e) => {
    setIsOpen(true);
    setNoteToEdit(e.target.name);

    if (e.currentTarget.id === "create") {
      setIsCreate(true);
    }
  };

  const sampleModalContext = {
    modalIsOpen,
    setIsOpen,
    noteToEdit,
    setNoteToEdit,
    isCreate,
    setIsCreate,
    openModal,
  };

  return (
    <ModalContext.Provider value={sampleModalContext}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
