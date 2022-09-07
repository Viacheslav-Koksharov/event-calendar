import { DAYS, DAYS_LEAP } from "../utils/constants";

export const options = { year: "numeric", month: "numeric", day: "numeric" };

export const getStartDayOfMonth = (date) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return startDate === 0 ? 7 : startDate;
};

export const getNormalizedDate = (year, month, day) => {
  return new Date(year, month, day).toLocaleString("en-US", options);
};

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDays = (year) => {
  return isLeapYear(year) ? DAYS_LEAP : DAYS;
};
