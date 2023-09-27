import { useRef } from "react";
import Modal, { Styles } from "react-modal";
import "./Modal.css";
import { MousePosition, WindowDimensions } from "../../interfaces";
import {
    QuestionModalHeight,
    QuestionModalWidth,
} from "../../data/const";
import useWindowDimensions from "../../hooks/windowDimensions";

Modal.setAppElement("#root");

interface Props {
    mousePosition: MousePosition | null;
    isOpen: boolean;
    closeModal: () => void;
    checkAnswer: (answer: string) => void;
}

const QuestionModal = ({
    mousePosition,
    isOpen,
    closeModal,
    checkAnswer,
}: Props) => {
    const answerRef = useRef<HTMLInputElement>(null);
    const windowDim = useWindowDimensions();
    // mousePosToModalStyle(mousePosition, windowDim)

    return (
        <Modal
            isOpen={isOpen}
            style={mousePosToModalStyle(mousePosition, windowDim)}
            contentLabel="Example Modal"
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onAfterOpen={() => answerRef.current?.focus()}
            className="modal-box"
            overlayClassName="overlay"
        >
            <h3 className="modal-title">Tỉnh thành nào đây?</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (answerRef.current) checkAnswer(answerRef.current.value);
                    closeModal();
                }}
            >
                <input ref={answerRef} className="modal-input" />
                <button type="submit" className="modal-button">
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
    let x = mousePos?.x ?? 0;
    let y = mousePos?.y ?? 0;
    
    // Calculate where to put question modal, left or right, up or down to click point
    let xSide = -1; // -1 is left side, 0 is right side, 
    if (x < windowDim.width / 2) xSide = 0;
    let ySide = -1; // -1 is up side, 0 is down side
    if (y < windowDim.height / 2) ySide = 0;

    // Calculate the buffers
    let xBuffer = 40
    if (xSide === -1) xBuffer = -50 
    let yBuffer = 40
    if (ySide === -1) yBuffer = -50 
    const top = y + ySide * QuestionModalHeight + yBuffer
    const left = x + xSide * QuestionModalWidth + xBuffer

    return {
        content: {
            top: `${top}px`,
            left: `${left}px`,
            right: "auto",
            bottom: "auto",
        },
    };
};
