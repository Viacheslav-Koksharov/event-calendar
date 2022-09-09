import { ModalProvider } from "../../context/ModalContextProvider";
import { NotesProvider } from "../../context/NotesContextProvider";
import { Title } from "./App.styled";
import Container from "../Container";
import Calendar from "../Calendar";

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
