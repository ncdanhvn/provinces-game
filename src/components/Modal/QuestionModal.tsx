import { useRef } from "react";
import Modal from "react-modal";
import "./Modal.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface Props {
  id: number;
  isOpen: boolean;
  closeModal: () => void;
  checkAnswer: (answer: string) => void;
}

const QuestionModal = ({ id, isOpen, closeModal, checkAnswer }: Props) => {
  const answerRef = useRef<HTMLInputElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
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
