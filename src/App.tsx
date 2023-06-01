import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./App.css";
import Map from "./components/Map";
import MapButtons from "./components/MapButtons";
import QuestionModal from "./components/Modal/QuestionModal";
import Wrapper from "./components/Wrapper";
import provinces from "./data/provinces";

export interface Province {
  id: number;
  name: string;
}

function App() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [answeredProvinces, setAnwseredProvinces] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const onProvinceClick = (id: number) => {
    setOpenModal(true);
    setSelectedId(id);
  };

  const checkAnswer = (answer: string) =>
    answer.toLowerCase() ===
    provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

  const newScore = () => {
    const newScore = score + 1;
    setScore(newScore);
    setAnwseredProvinces([...answeredProvinces, selectedId!!]);
    console.log("Well done, score: ", newScore);
  };

  const failAttemp = () => {
    console.log("Wrong answer, try again!");
  };

  return (
    <>
      <Wrapper>
        <TransformWrapper>
          <TransformComponent>
            <Map
              onClick={onProvinceClick}
              answeredProvinces={answeredProvinces}
            />
          </TransformComponent>
          <MapButtons />
          <QuestionModal
            isOpen={isOpenModal}
            id={selectedId!!}
            closeModal={() => setOpenModal(false)}
            checkAnswer={(a) => (checkAnswer(a) ? newScore() : failAttemp())}
          />
        </TransformWrapper>
      </Wrapper>
    </>
  );
}

export default App;
