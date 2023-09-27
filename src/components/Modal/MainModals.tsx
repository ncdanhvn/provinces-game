import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    onStartGame: () => void;
}

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const StartGameModal = ({ isOpen, closeModal, onStartGame }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            contentLabel="Start Game Modal"
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            className="modal modal--main"
            overlayClassName="overlay"
        >
            <div className="modal__title">Cách chơi</div>
            <ol className="modal__ol">
                <li>Chọn một tỉnh, thành trên bản đồ</li>
                <li>Nhập tên tỉnh, thành đó</li>
            </ol>
            <p>
                Bạn có <span className="modal__highlight">5 phút</span> để hoàn
                thành càng nhiều tỉnh, thành càng tốt
            </p>
            <div className="modal__button">
                Bắt Đầu
                <img src="assets/start_arrow.svg" alt="start arow" />
            </div>
        </Modal>
    );
};

export { StartGameModal };
