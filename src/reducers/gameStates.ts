import provinces from "../data/provinces";
import { ClickData, MousePosition } from "../interfaces";

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

interface GameState {
    state: "INTRO" | "RUNNING" | "OVER";
    isOpenModal: boolean;
    selectedId: number | null;
    answeredProvinces: number[];
    score: number;
    answerResult: boolean | null;
    mousePosition: MousePosition | null; // Position of mouse when click map province
}

interface StartGame {
    type: "START";
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

type GameAction = StartGame | SelectProvince | Answer | CloseModal;

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) { 
        case "START":
            return {
                ...state,
                state: 'RUNNING'
            }
        case "SELECT":
            return state.isOpenModal
                ? state
                : {
                      ...state,
                      isOpenModal: true,
                      selectedId: action.clickData.id,
                      mousePosition: action.clickData.position,
                  };
        case "ANSWER":
            return checkAnswer(action.answer, state.selectedId!)
                ? {
                      ...state,
                      isOpenModal: false,
                      selectedId: null,
                      answeredProvinces: [
                          ...state.answeredProvinces,
                          state.selectedId!,
                      ],
                      score: state.score + 1,
                      answerResult: true,
                      mousePosition: null,
                  }
                : { ...state, answerResult: false };
        case "CLOSE":
            return {
                ...state,
                isOpenModal: false,
                selectedId: null,
                answerResult: null,
                mousePosition: null,
            };
    }
};

export default gameReducer;
