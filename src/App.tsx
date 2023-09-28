import { useReducer } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./App.css";
import Map from "./components/Map";
import MapButtons from "./components/MapButtons";
import QuestionModal from "./components/Modal/QuestionModal";
import Score from "./components/Score";
import Timer from "./components/Timer";
import Wrapper from "./components/Wrapper";
import gameReducer from "./reducers/gameStates";
import { GameOverModal, StartGameModal } from "./components/Modal/MainModals";

export interface Province {
  id: number;
  name: string;
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, {
    state: 'INTRO',
    isOpenModal: false,
    selectedId: null,
    answeredProvinces: [],
    score: 0,
    answerResult: null,
    mousePosition: null,
  });

  const newScore = () => {
    console.log("Well done, score: ", newScore);
  };

  const failAttemp = () => {
    console.log("Wrong answer, try again!");
  };

  return (
    <>
      <Wrapper>
        <Score score={state.score} />
        <Timer timeTotal={1} timeUp={() => console.log("Time up")} />
        <TransformWrapper>
          <TransformComponent>
            <Map
              onClick={(clickData) => dispatch({ type: "SELECT", clickData })}
              answeredProvinces={state.answeredProvinces}
              selectedId={state.selectedId}
              isHighlight={state.isOpenModal}
            />
          </TransformComponent>
          <MapButtons />
          <QuestionModal
            isOpen={state.isOpenModal}
            mousePosition={state.mousePosition}
            closeModal={() => dispatch({ type: "CLOSE" })}
            checkAnswer={(answer) => dispatch({ type: "ANSWER", answer })}
          />
          <StartGameModal isOpen={state.state === "INTRO"} onStartGame={() => dispatch({ type: "START" })}/>
          <GameOverModal isOpen={state.state === "OVER"} onStartGame={() => dispatch({ type: "START" })} score={state.score}/>
        </TransformWrapper>
      </Wrapper>
    </>
  );
}

export default App;
