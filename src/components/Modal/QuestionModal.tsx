import { useRef } from "react";
import Modal, { Styles } from "react-modal";
import { QuestionModalHeight, QuestionModalWidth } from "../../data/const";
import useWindowDimensions from "../../hooks/windowDimensions";
import { MousePosition, WindowDimensions } from "../../interfaces";
import usePlayStateStore from "../../stores/playStateStore";
import "./Modal.css";

Modal.setAppElement("#root");

const QuestionModal = () => {
    const answerRef = useRef<HTMLInputElement>(null);
    const windowDim = useWindowDimensions();

    const {
        playState: { selectedId, mousePosition, retryMessage },
        cancel,
        answer,
    } = usePlayStateStore();

    return (
        <Modal
            isOpen={selectedId !== null}
            style={mousePosToModalStyle(mousePosition, windowDim)}
            contentLabel="Question Modal"
            onRequestClose={cancel}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onAfterOpen={() => answerRef.current?.focus()}
            className="modal modal--main modal--question"
            overlayClassName="overlay"
        >
            <h3 className="modal__question">Tỉnh thành nào đây?</h3>
            {retryMessage && <p className="modal__p">{retryMessage}</p>}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const answerValue = answerRef.current!.value.trim();
                    answerValue ? answer(answerValue) : cancel();
                }}
            >
                <input ref={answerRef} className="modal__input" />
                <button
                    type="submit"
                    className="modal__button modal__button--question"
                >
                    Ok
                </button>
            </form>
        </Modal>
    );
};

export default QuestionModal;

const mousePosToModalStyle = (
    mousePos: MousePosition | null,
    windowDim: WindowDimensions
): Styles => {
    // Check if mousePos is null (for the first time when app just start)
    let y = mousePos?.y ?? 0;

    // Calculate where to put question modal, up or down to click point
    let ySide = -1; // -1 is up side, 0 is down side
    if (y < windowDim.height / 2) ySide = 0;

    // Calculate the buffers
    let yBuffer = 55;
    if (ySide === -1) yBuffer = -yBuffer;
    const top = y + ySide * QuestionModalHeight + yBuffer;

    return {
        content: {
            top: `${top}px`,
            left: "calc(50% - 150px)",
            right: "auto",
            bottom: "auto",
        },
    };
};
