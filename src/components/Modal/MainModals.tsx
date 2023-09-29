import Modal from "react-modal";
import start_arrow from "../../assets/start_arrow.svg";
import useGameStateStore from "../../stores/gameStateStore";
import useResultStore from "../../stores/resultStore";

Modal.setAppElement("#root");

const inCenter = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const StartGameModal = () => {
    const { gameState, startGame } = useGameStateStore();

    return (
        <Modal
            isOpen={gameState === "INTRO"}
            style={inCenter}
            contentLabel="Start Game Modal"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="modal modal--main modal--start"
            overlayClassName="overlay"
        >
            <div className="modal__title">Cách chơi</div>
            <ol className="modal__ol">
                <li>Chọn một tỉnh thành trên bản đồ</li>
                <li>Nhập tên tỉnh thành đó</li>
            </ol>
            <p className="modal__p modal__p--start">
                Bạn có <span className="modal__highlight">5 phút</span> để hoàn
                thành càng nhiều tỉnh thành càng tốt
            </p>
            <button
                className="modal__button modal__button--start"
                onClick={startGame}
            >
                <span>Bắt Đầu</span>
                <img
                    src={start_arrow}
                    alt="start arow"
                    className="modal__button__icon"
                />
            </button>
        </Modal>
    );
};

const GameOverModal = () => {
    const { gameState, startGame } = useGameStateStore();
    const score = useResultStore(({result}) => result.score)

    return (
        <Modal
            isOpen={gameState === "OVER"}
            style={inCenter}
            contentLabel="Game Over Modal"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="modal modal--main modal--start"
            overlayClassName="overlay"
        >
            <div className="modal__title">Game Over</div>
            <p className="modal__p modal__p--start">
                Bạn đúng <span className="modal__highlight">{score}/63 </span>
                tỉnh thành. Chúc mừng bạn lọt
                <span className="modal__highlight"> Top 20% </span>
            </p>
            <p className="modal__rank">Xuất sắc</p>
            <button
                className="modal__button modal__button--over"
                onClick={startGame}
            >
                <span>Chơi Lại</span>
                <img
                    src={start_arrow}
                    alt="start arow"
                    className="modal__button__icon"
                />
            </button>
        </Modal>
    );
};

export { GameOverModal, StartGameModal };

