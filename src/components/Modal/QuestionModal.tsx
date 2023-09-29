import { useRef } from "react";
import Modal, { Styles } from "react-modal";
import "./Modal.css";
import { MousePosition, WindowDimensions } from "../../interfaces";
import { QuestionModalHeight, QuestionModalWidth } from "../../data/const";
import Provinces from "../../data/provinces";
import useWindowDimensions from "../../hooks/windowDimensions";
import usePlayStateStore from "../../stores/playStateStore";
import useResultStore from "../../stores/resultStore";

Modal.setAppElement("#root");

const QuestionModal = () => {
    const answerRef = useRef<HTMLInputElement>(null);
    const windowDim = useWindowDimensions();

    const {
        playState: { selectedId, mousePosition },
        cancel,
    } = usePlayStateStore();

    const newScore = useResultStore(({ newScore }) => newScore);

    return (
        <Modal
            isOpen={selectedId !== null}
            style={mousePosToModalStyle(mousePosition, windowDim)}
            contentLabel="Example Modal"
            onRequestClose={cancel}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onAfterOpen={() => answerRef.current?.focus()}
            className="modal modal--main"
            overlayClassName="overlay"
        >
            <h3 className="modal__question">Tỉnh thành nào đây?</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    checkAnswer(answerRef.current!.value, selectedId!) &&
                        newScore(selectedId!);
                    cancel()
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

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    Provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

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
    let xBuffer = 40;
    if (xSide === -1) xBuffer = -50;
    let yBuffer = 40;
    if (ySide === -1) yBuffer = -50;
    const top = y + ySide * QuestionModalHeight + yBuffer;
    const left = x + xSide * QuestionModalWidth + xBuffer;

    return {
        content: {
            top: `${top}px`,
            left: `${left}px`,
            right: "auto",
            bottom: "auto",
        },
    };
};
