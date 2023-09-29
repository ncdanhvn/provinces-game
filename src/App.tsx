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
import Provinces from "./data/provinces";

const TimeTotal = 5; // in minute

function App() {
    const { gameState, startGame, finishGame } = useGameStateStore();
    const { playState, select, cancel: cancelSelection } = usePlayStateStore();
    const { result, reset: resetScore, newScore } = useResultStore();

    return (
        <>
            <Wrapper>
                <Score score={result.score} />
                <Timer
                    timeTotal={TimeTotal}
                    timeUp={() => {
                        // Cancel the current selection (if any), then change game state to over
                        cancelSelection();
                        finishGame();
                    }}
                    isEnableTimer={gameState === "RUNNING"}
                />
                <TransformWrapper>
                    <TransformComponent>
                        <Map
                            onClick={(clickData) =>
                                select(clickData.id, clickData.position)
                            }
                            answeredProvinces={result.answeredProvinces}
                            selectedId={playState.selectedId}
                            isHighlight={playState.selectedId !== null}
                        />
                    </TransformComponent>
                    <MapButtons />
                    <QuestionModal
                        isOpen={playState.selectedId !== null}
                        mousePosition={playState.mousePosition}
                        closeModal={cancelSelection}
                        checkAnswer={(answer) => {
                            if (checkAnswer(answer, playState.selectedId!))
                                newScore(playState.selectedId!);
                            cancelSelection();
                        }}
                    />
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

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    Provinces.find((p) => p.id === selectedId)?.name.toLowerCase();
