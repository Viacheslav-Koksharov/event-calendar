import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const notesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useLocalStorage("notes", []);

  const value = {
    notes,
    setNotes,
  };

  return (
    <notesContext.Provider value={value}>{children}</notesContext.Provider>
  );
};

export { notesContext, NotesProvider };
