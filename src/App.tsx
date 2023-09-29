import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "./App.css";
import Map from "./components/Map";
import MapButtons from "./components/MapButtons";
import { GameOverModal, StartGameModal } from "./components/Modal/MainModals";
import QuestionModal from "./components/Modal/QuestionModal";
import Score from "./components/Score";
import Timer from "./components/Timer";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Score />
            <Timer />
            <TransformWrapper>
                <TransformComponent>
                    <Map />
                </TransformComponent>
                <MapButtons />
                <QuestionModal />
                <StartGameModal />
                <GameOverModal />
            </TransformWrapper>
        </Wrapper>
    );
}

export default App;
