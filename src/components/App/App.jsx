import { ModalProvider } from "../../context/ModalContextProvider";
import { NotesProvider } from "../../context/NotesContextProvider";
import Container from "../Container";
import Calendar from "../Calendar";
import { Title } from "./App.styled";

const App = () => {
  return (
    <>
      <ModalProvider>
        <Container>
          <Title>Event Calendar </Title>
          <NotesProvider>
            <Calendar />
          </NotesProvider>
        </Container>
      </ModalProvider>
    </>
  );
};

export default App;
