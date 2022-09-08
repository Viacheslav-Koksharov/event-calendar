import { useState, useEffect, useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import shortid from "shortid";
import { DAYS_OF_THE_WEEK, MONTHS } from "../../utils/constants";
import { options, getStartDayOfMonth, getDays } from "../../helpers/formatDate";
import { getExistedNotes } from "../../helpers/notes";
import { notesContext } from "../../context/NotesContextProvider";
import { ModalContext } from "../../context/ModalContextProvider";
import "../../index.css";
import {
  ButtonCreate,
  Header,
  ContainerNav,
  InputSelect,
  Button,
  MonthName,
  TableMonth,
  DayOfWeekList,
  DayOfWeek,
  DayOfMonthList,
  DayOfMonth,
  DayNotesList,
  DayNotes,
} from "./Calendar.styled.js";
import CustomModal from "../CustomModal/CustomModal";
import Form from "../Form/Form";
import EditForm from "../EditForm/EditForm";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const { openModal, isCreate } = useContext(ModalContext);
  const { notes, setNotes } = useContext(notesContext);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  useEffect(() => {
    if (selectedMonth) {
      setDate(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()));
    }
    setSelectedMonth(null);
  }, [selectedMonth]);

  const submitForm = ({ title, description, date, time }) => {
    const newNote = {
      id: new Date(date).toLocaleString("en-US", options),
      unicId: shortid.generate(),
      data: {
        title,
        description,
        date,
        time,
      },
    };

    setNotes([...notes, newNote]);
  };

  const onButtonPrevClick = () => {
    setDate(new Date(year, month - 1));
  };

  const onButtonNextClick = () => {
    setDate(new Date(year, month + 1));
  };

  const inputSubmit = (e) => {
    setSelectedMonth(new Date(e.target.value));
  };

  return (
    <>
      <Header>
        <ButtonCreate id="create" onClick={openModal}>
          <FiPlus className="IconStyle" />
        </ButtonCreate>
        <ContainerNav>
          <Button onClick={onButtonPrevClick}>
            <FaAngleLeft className="IconStyle" />
          </Button>
          {!selectedMonth ? (
            <MonthName>
              {MONTHS[month]} {year}
            </MonthName>
          ) : (
            <MonthName>{`${selectedMonth.toLocaleString("en-US", {
              month: "long",
            })} ${selectedMonth.getFullYear()}`}</MonthName>
          )}

          <Button onClick={onButtonNextClick}>
            <FaAngleRight className="IconStyle" />
          </Button>
          <InputSelect type="month" onChange={inputSubmit}></InputSelect>
        </ContainerNav>
      </Header>

      <TableMonth>
        <DayOfWeekList>
          {DAYS_OF_THE_WEEK.map((day) => (
            <DayOfWeek key={day}>{day}</DayOfWeek>
          ))}
        </DayOfWeekList>
        <DayOfMonthList>
          {Array(getDays()[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              const numericDay = index - (startDay - 2);
              return (
                <DayOfMonth
                  key={index}
                  isToday={numericDay === date.getDate()}
                  isSelected={numericDay === day}
                  onClick={() => setDate(new Date(year, month, numericDay))}
                >
                  {numericDay > 0 ? numericDay : ""}
                  {getExistedNotes(notes, year, month, numericDay).length >
                    0 && (
                    <DayNotesList>
                      {getExistedNotes(notes, year, month, numericDay).map(
                        (note) => (
                          <DayNotes key={note.data.title}>
                            <Button
                              id="edit"
                              type="button"
                              name={note.data.title}
                              onClick={openModal}
                            >
                              {note.data.title}
                            </Button>
                          </DayNotes>
                        )
                      )}
                    </DayNotesList>
                  )}
                </DayOfMonth>
              );
            })}
        </DayOfMonthList>
      </TableMonth>
      <CustomModal>
        {isCreate ? <Form onSubmit={submitForm} /> : <EditForm />}
      </CustomModal>
    </>
  );
};

export default Calendar;
