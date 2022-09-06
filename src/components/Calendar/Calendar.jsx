import { useState, useEffect, useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import shortid from "shortid";
import { FiPlus } from "react-icons/fi";
import {
  DAYS,
  DAYS_LEAP,
  DAYS_OF_THE_WEEK,
  MONTHS,
} from "../../initial/initialCalendar.js";
import {
  ButtonCreate,
  Header,
  Button,
  TableMonth,
  DayOfWeekList,
  DayOfWeek,
  DayOfMonthList,
  DayOfMonth,
} from "./Calendar.styled.js";
import { ModalContext } from "../../context/ModalContextProvider";
import CustomModal from "../CustomModal/CustomModal";
import Form from "../Form/Form";
import "../../index.css";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const { openModal } = useContext(ModalContext);

  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(() => (savedNotes ? savedNotes : []));

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return startDate === 0 ? 7 : startDate;
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(year) ? DAYS_LEAP : DAYS;

  const handleSubmitForm = ({ title, description, date, time }) => {
    const newNote = {
      id: shortid.generate(),
      title,
      description,
      date,
      time,
    };
    setNotes([...notes, newNote]);
  };
  const onButtonPrevClick = () => {
    setDate(new Date(year, month - 1, day));
  };
  const onButtonNextClick = () => {
    setDate(new Date(year, month + 1, day));
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
        <div>
          {MONTHS[month]} {year}
        </div>
        <Button onClick={onButtonNextClick}>
          <FaAngleRight className="IconStyle" />
        </Button>
        <input type="month"></input>
      </Header>

      <TableMonth>
        <DayOfWeekList>
          {DAYS_OF_THE_WEEK.map((d) => (
            <DayOfWeek key={d}>{d}</DayOfWeek>
          ))}
        </DayOfWeekList>
        <DayOfMonthList>
          {Array(days[month] + (startDay - 1))
            .fill(null)
            .map((_, index) => {
              const d = index - (startDay - 2);
              return (
                <DayOfMonth
                  key={index}
                  isToday={d === today.getDate()}
                  isSelected={d === day}
                  onClick={() => setDate(new Date(year, month, d))}
                >
                  {d > 0 ? d : ""}
                </DayOfMonth>
              );
            })}
        </DayOfMonthList>
      </TableMonth>
    </>
  );
};

export default Calendar;
