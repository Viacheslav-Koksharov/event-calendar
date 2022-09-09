import styled from "styled-components";

const Button = styled.button`
  padding: 0;
  margin: 0 0 0 95%;
  color: grey;
  backgroundcolor: #bbb1df;
  border-radius: 50%;
`;

const ModalTitle = styled.h2`
  margin: 0 0 15px 0;
  color: #708db3;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
`;

const customStyles = {
  overlay: {
    background: "rgba(47, 48, 58, 0.8)",
    zIndex: "1999",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    height: "75%",
    padding: "5px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export { Button, ModalTitle, customStyles };
