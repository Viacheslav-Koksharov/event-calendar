import { useState, useEffect, useContext } from "react";
import { ModalContext } from "../../context/ModalContextProvider";
import { notesContext } from "../../context/NotesContextProvider";
import { options } from "../../helpers/formatDate";
import { FormStyle, InputStyle, LabelStyle, Button } from "./EditForm.styled";

const EditForm = () => {
  const { setIsOpen, noteToEdit, setNoteToEdit } = useContext(ModalContext);
  const { notes, setNotes } = useContext(notesContext);
  const [noteToUpdate] = useState(
    notes.find((note) => note.data.title === noteToEdit) || null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (noteToUpdate) {
      setTitle(noteToUpdate.data.title);
      setDescription(noteToUpdate.data.description);
      setDate(noteToUpdate.data.date);
      setTime(noteToUpdate.data.time);
    }
    setNoteToEdit(null);
  }, [noteToUpdate, setNoteToEdit]);

  const changeNote = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        return;
    }
  };

  const updateNotesList = (e) => {
    e.preventDefault();

    const newNotesList = notes.map((note) => {
      if (note.unicId === noteToUpdate.unicId) {
        note.data.title = title;
        note.data.description = description;
        note.data.date = date;
        note.data.time = time;
        note.id = new Date(noteToUpdate.data.date).toLocaleString(
          "en-US",
          options
        );
        return note;
      }
      return note;
    });
    setNotes(newNotesList);
    setIsOpen(false);
  };

  const deleteNote = () => {
    const savedNotes = notes.filter(
      ({ unicId }) => unicId !== noteToUpdate.unicId
    );
    setNotes(savedNotes);
  };

  return (
    <FormStyle onSubmit={updateNotesList}>
      <LabelStyle>
        Title *
        <InputStyle
          type="text"
          name="title"
          value={title}
          autoComplete="off"
          onChange={changeNote}
          placeholder="Title goes here..."
        />
      </LabelStyle>
      <LabelStyle>
        Description
        <textarea
          name="description"
          value={description}
          rows="5"
          placeholder="Your message here..."
          onChange={changeNote}
        ></textarea>
      </LabelStyle>
      <LabelStyle>
        Date *
        <InputStyle
          type="date"
          name="date"
          value={date}
          min={new Date()}
          max="2099-01-01"
          onChange={changeNote}
          required
        />
      </LabelStyle>
      <LabelStyle>
        Begin time
        <InputStyle
          type="time"
          name="time"
          value={time}
          onChange={changeNote}
        />
      </LabelStyle>
      <Button type="submit" aria-label="save" onClick={() => deleteNote()}>
        Delete
      </Button>
      <Button type="submit" aria-label="save">
        Save
      </Button>
    </FormStyle>
  );
};

export default EditForm;
