import { useState, useEffect, useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import { FiPlus } from "react-icons/fi";
import { DAYS_OF_THE_WEEK, MONTHS } from "../../utils/constants";
import { options, getStartDayOfMonth, getDays } from "../../helpers/formatDate";
import { getExistedNotes } from "../../helpers/notes";
import { ModalContext } from "../../context/ModalContextProvider";
import "../../index.css";
import {
  ButtonCreate,
  Header,
  InputSelect,
  Button,
  TableMonth,
  DayOfWeekList,
  DayOfWeek,
  DayOfMonthList,
  DayOfMonth,
} from "./Calendar.styled.js";
import CustomModal from "../CustomModal/CustomModal";
import Form from "../Form/Form";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const { openModal } = useContext(ModalContext);
  const [notes, setNotes] = useLocalStorage("notes", []);

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

  const handleSubmitForm = ({ title, description, date, time }) => {
    const newNote = {
      id: new Date(date).toLocaleString("en-US", options),
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
        <CustomModal>
          <Form onSubmit={handleSubmitForm} />
        </CustomModal>
        <ButtonCreate onClick={openModal}>
          <FiPlus className="IconStyle" />
        </ButtonCreate>
        <Button onClick={onButtonPrevClick}>
          <FaAngleLeft className="IconStyle" />
        </Button>
        {!selectedMonth ? (
          <div>
            {MONTHS[month]} {year}
          </div>
        ) : (
          <div>{`${selectedMonth.toLocaleString("en-US", {
            month: "long",
          })} ${selectedMonth.getFullYear()}`}</div>
        )}

        <Button onClick={onButtonNextClick}>
          <FaAngleRight className="IconStyle" />
        </Button>
        <InputSelect type="month" onChange={inputSubmit}></InputSelect>
      </Header>

      <TableMonth>
        <DayOfWeekList>
          {DAYS_OF_THE_WEEK.map((d) => (
            <DayOfWeek key={d}>{d}</DayOfWeek>
          ))}
        </DayOfWeekList>
        <DayOfMonthList>
          {Array(getDays()[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2);
              return (
                <DayOfMonth
                  key={index}
                  isToday={d === date.getDate()}
                  isSelected={d === day}
                >
                  {d > 0 ? d : ""}
                  {getExistedNotes(notes, year, month, d).length > 0 && (
                    <ul>
                      {getExistedNotes(notes, year, month, d).map((note) => (
                        <li key={note.data.title}>{note.data.title}</li>
                      ))}
                    </ul>
                  )}
                </DayOfMonth>
              );
            })}
        </DayOfMonthList>
      </TableMonth>
    </>
  );
};

export default Calendar;
