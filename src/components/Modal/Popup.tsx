import { useEffect } from "react";
import Modal from "react-modal";
import checkIcon from "../../assets/check_icon.svg";
import usePlayStateStore from "../../stores/playStateStore";
import "./Modal.css";

Modal.setAppElement("#root");

const inUpperCenter = {
    content: {
        top: "14%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
};

const TimeOut = 2; // in second

const Popup = () => {
    const popupMessage = usePlayStateStore(
        ({ playState }) => playState.popupMessage
    );
    const closePopup = usePlayStateStore(store => store.closePopup)

    useEffect(() => {
        if (popupMessage !== null) setTimeout(closePopup, TimeOut * 1000);
    }, [popupMessage]);

    return (
        <Modal
            isOpen={popupMessage !== null}
            style={inUpperCenter}
            contentLabel="Correct Answer Popup"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            className="modal modal--popup"
            overlayClassName="overlay"
        >
            <img src={checkIcon} alt="Check_icon" />
            <span className="modal__popup-message">{popupMessage}</span>
        </Modal>
    );
};

export default Popup;
