import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./App.css";
import Map from "./components/Map";
import MapButtons from "./components/MapButtons";
import QuestionModal from "./components/Modal/QuestionModal";
import Score from "./components/Score";
import Timer from "./components/Timer";
import Wrapper from "./components/Wrapper";
import { GameOverModal, StartGameModal } from "./components/Modal/MainModals";
import useResultStore from "./stores/resultStore";
import useGameStateStore from "./stores/gameStateStore";
import usePlayStateStore from "./stores/playStateStore";

function App() {
    const { gameState, startGame, finishGame } = useGameStateStore();
    const { playState, select, cancel: cancelSelection } = usePlayStateStore();
    const { result, reset: resetScore, newScore } = useResultStore();

    return (
        <>
            <Wrapper>
                <Score />
                <Timer />
                <TransformWrapper>
                    <TransformComponent>
                        <Map />
                    </TransformComponent>
                    <MapButtons />
                    <QuestionModal />
                    <StartGameModal
                        isOpen={gameState === "INTRO"}
                        onStartGame={startGame}
                    />
                    <GameOverModal
                        isOpen={gameState === "OVER"}
                        onStartGame={() => {
                            // Reset score and start new game
                            resetScore();
                            startGame();
                        }}
                        score={result.score}
                    />
                </TransformWrapper>
            </Wrapper>
        </>
    );
}

export default App;
