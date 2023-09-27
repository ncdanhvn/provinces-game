import provinces from "../data/provinces";
import { ClickData } from "../interfaces";

const checkAnswer = (answer: string, selectedId: number): boolean =>
  answer.toLowerCase() ===
  provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

interface GameState {
  // state: string;
  isOpenModal: boolean;
  selectedId: number | null;
  answeredProvinces: number[];
  score: number;
  answerResult: boolean | null;
}

interface SelectProvince {
  type: "SELECT";
  clickData: ClickData;
}

interface Answer {
  type: "ANSWER";
  answer: string;
}

interface CloseModal {
  type: "CLOSE";
}

type GameAction = SelectProvince | Answer | CloseModal;

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "SELECT":
      return state.isOpenModal
        ? state
        : { ...state, isOpenModal: true, selectedId: action.clickData.id };
    case "ANSWER":
      return checkAnswer(action.answer, state.selectedId!)
        ? {
            isOpenModal: false,
            selectedId: null,
            answeredProvinces: [...state.answeredProvinces, state.selectedId!],
            score: state.score + 1,
            answerResult: true,
          }
        : { ...state, answerResult: false };
    case "CLOSE":
      return {
        ...state,
        isOpenModal: false,
        selectedId: null,
        answerResult: null,
      };
  }
};

export default gameReducer;
