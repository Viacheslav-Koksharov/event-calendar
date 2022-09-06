import { useState, useContext } from "react";
import { FormStyle, InputStyle, LabelStyle, Button } from "./Form.styled";
import { ModalContext } from "../../context/ModalContextProvider";

const Form = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { setIsOpen } = useContext(ModalContext);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date, time });
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    openModal();
  };
  const openModal = () => {
    setIsOpen(false);
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <LabelStyle>
        Title *
        <InputStyle
          type="text"
          name="title"
          value={title}
          autoComplete="off"
          onChange={handleChange}
          placeholder="Title goes here..."
          required
        />
      </LabelStyle>
      <LabelStyle>
        Description
        <textarea
          name="description"
          value={description}
          rows="5"
          placeholder="Your message here..."
          onChange={handleChange}
        ></textarea>
      </LabelStyle>
      <LabelStyle>
        Date *
        <InputStyle
          name="date"
          type="date"
          value={date}
          min={new Date()}
          max="2099-01-01"
          onChange={handleChange}
          required
        />
      </LabelStyle>

      <LabelStyle>
        Begin time
        <InputStyle
          name="time"
          type="time"
          value={time}
          onChange={handleChange}
        />
      </LabelStyle>
      <Button type="submit" aria-label="save">
        Save
      </Button>
    </FormStyle>
  );
};

export default Form;
