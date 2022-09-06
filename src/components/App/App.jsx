import { ModalProvider } from "../../context/ModalContextProvider";

import Container from "../Container";
import Calendar from "../Calendar";
import "./App.css";

const App = () => {
  return (
    <>
      <ModalProvider>
        <Container>
          <h1>Event Calendar </h1>
          <Calendar />
        </Container>
      </ModalProvider>
    </>
  );
};

export default App;
