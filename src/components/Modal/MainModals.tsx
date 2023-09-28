import start_arrow from '../../assets/start_arrow.svg'
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
    isOpen: boolean;
    onStartGame: () => void;
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const StartGameModal = ({ isOpen, onStartGame }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
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
            <button className="modal__button modal__button--start" onClick={onStartGame}>
                <span>Bắt Đầu</span>
                <img src={start_arrow} alt="start arow" className='modal__button__icon'/>
            </button>
        </Modal>
    );
};

export { StartGameModal };
