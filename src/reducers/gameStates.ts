import provinces from "../data/provinces";
import { ClickData, MousePosition } from "../interfaces";

interface GameState {
    state: "INTRO" | "RUNNING" | "OVER";
    isOpenModal: boolean;
    selectedId: number | null;
    answeredProvinces: number[];
    score: number;
    answerResult: boolean | null;
    mousePosition: MousePosition | null; // Position of mouse when click map province
    isRetry: boolean | null;
    isPopup: boolean | null;
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

interface ClosePopup {
    type: "CLOSE_POPUP";
}

interface EndGame {
    type: "END";
}

type GameAction = StartGame | SelectProvince | Answer | CloseModal | ClosePopup | EndGame;

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                state: "RUNNING",
                answeredProvinces: [],
                score: 0,
            };
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
            if (checkAnswer(action.answer, state.selectedId!))
                return {
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
                    isRetry: false,
                    isPopup: true,
                };            

            // Answer wrong
            onIncorrect();
            return { ...state, answerResult: false, isRetry: true };
        case "CLOSE":
            return {
                ...state,
                isOpenModal: false,
                selectedId: null,
                answerResult: null,
                mousePosition: null,
                isRetry: false,
            };
        case "CLOSE_POPUP":
            return {
                ...state,
                isPopup: false,
            };            
        case "END":
            return {
                ...state,
                state: "OVER",
                isOpenModal: false,
                selectedId: null,
                answerResult: null,
                mousePosition: null,
                isRetry: null,
                isPopup: null,
            };
    }
};

export default gameReducer;

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

const onIncorrect = () => {
    const questionModal = document.querySelector(".modal--question");

    questionModal!.classList.remove("modal--on-answer-wrong"); // reset animation
    setTimeout(
        () => questionModal!.classList.add("modal--on-answer-wrong"),
        100
    );

    // refocus input field
    const modalInput = document.querySelector(".modal__input") as HTMLElement;
    modalInput.focus();
};
