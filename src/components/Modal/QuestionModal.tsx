import { useRef } from "react";
import Modal from "react-modal";

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
    >
      <div>Enter province's name:</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (answerRef.current) checkAnswer(answerRef.current.value);
          closeModal();
        }}
      >
        <input ref={answerRef} />
        <button type="submit">Ok</button>
      </form>
    </Modal>
  );
};

export default QuestionModal;
