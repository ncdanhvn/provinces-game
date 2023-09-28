import Modal from "react-modal";
import "./Modal.css";
import checkIcon from '../../assets/check_icon.svg'
import { Congratulation } from "../../data/messages";

Modal.setAppElement("#root");

const inUpperCenter = {
    content: {
        top: "20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

interface Props {
    isOpen: boolean;
}

const Popup = ({ isOpen }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            style={inUpperCenter}
            contentLabel="Correct Answer Popup"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="modal modal--popup"
            overlayClassName="overlay"
        >
            <img src={checkIcon} alt="Check_icon" />
            <div className="modal__popup-message">{getMessage()}</div>
        </Modal>
    );
};

export default Popup;

const getMessage = (): string | null => {
    // if (firstTime) return FirstTimeMessage
    return Congratulation[Math.floor(Math.random() * Congratulation.length)];
};