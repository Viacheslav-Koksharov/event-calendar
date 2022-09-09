import styled from "styled-components";

const FormStyle = styled.form`
  display: block;
  width: 60%;
  margin: 0 auto 20px;
  padding: 10px 10px;
  border: 3px solid #f1f1f1;
`;
const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
const InputStyle = styled.input`
  padding: 5px;
  color: #708db3;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border: 1px solid rgb(206, 205, 205);
`;

const TextareaStyle = styled.textarea`
  padding: 5px;
  resize: none;
  color: #708db3;
  font-size: 14px;
  font-weight: 400;
  outline: none;
  border: 1px solid rgb(206, 205, 205);
`;

const Button = styled.button`
  width: 30%;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 2.5;
  background-color: grey;
  border: none;
`;

export { Button, InputStyle, TextareaStyle, LabelStyle, FormStyle };
