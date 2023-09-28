import start_arrow from "../../assets/start_arrow.svg";
import Modal from "react-modal";
import Score from "../Score";

Modal.setAppElement("#root");

const inCenter = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

interface StartGameProps {
    isOpen: boolean;
    onStartGame: () => void;
}

const StartGameModal = ({ isOpen, onStartGame }: StartGameProps) => {
    return (
        <Modal
            isOpen={isOpen}
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
                onClick={onStartGame}
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

interface GameOverProps {
    isOpen: boolean;
    onStartGame: () => void;
    score: number;
}
const GameOverModal = ({ isOpen, onStartGame, score }: GameOverProps) => {
    return (
        <Modal
            isOpen={isOpen}
            style={inCenter}
            contentLabel="Game Over Modal"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="modal modal--main modal--start"
            overlayClassName="overlay"
        >
            <div className="modal__title">Game Over</div>
            <p className="modal__p modal__p--start">
                Bạn đúng <span className="modal__highlight">{score}/63</span>{" "}
                tỉnh thành. Chúc mừng bạn lọt{" "}
                <span className="highlight">Top 20% </span>
            </p>
            <p className="modal__rank">Xuất sắc</p>
            <button
                className="modal__button modal__button--start"
                onClick={onStartGame}
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

export { StartGameModal, GameOverModal };
