import styled, { css } from "styled-components";

const ButtonCreate = styled.button`
  display: flex;
  padding: 0;
  margin: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #85b6f5;

  &:hover {
    box-shadow: 0 1px 1px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
    transform: scale(1.1);
  }
`;
const Header = styled.div`
  font-weight: bold;
  padding: 10px 10px 5px 10px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.div`
  cursor: pointer;
`;

const TableMonth = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid lightgrey;
`;

const DayOfWeekList = styled.ul`
  display: flex;
  width: 100%;
`;

const DayOfWeek = styled.li`
  display: flex;
  width: calc((100% - 14px) / 7);
  height: 45px;
  align-items: center;
  justify-content: center;
  border: 1px solid #708db3;
`;

const DayOfMonthList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const DayOfMonth = styled.li`
  display: flex;
  width: calc((100% - 14px) / 7);
  height: 80px;
  align-items: flex-start;
  justify-content: flex-start;
  border: 1px solid #708db3;
  cursor: pointer;

  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid lightgray;
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: lightgray;
    `}
`;

export {
  Header,
  ButtonCreate,
  Button,
  TableMonth,
  DayOfWeekList,
  DayOfWeek,
  DayOfMonthList,
  DayOfMonth,
};
