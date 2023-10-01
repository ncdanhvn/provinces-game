import { produce } from "immer";
import { create } from "zustand";
import Provinces from "../data/provinces";
import { MousePosition } from "../interfaces";
import useResultStore from "./resultStore";
import { Congratulation, FirstTimeMessage, TryAgain } from "../data/messages";

interface PlayState {
    selectedId: number | null;
    answer: string | null;
    mousePosition: MousePosition | null;
    retryMessage: string | null;
    popupMessage: string | null;
}

const defaultState: PlayState = {
    selectedId: null,
    answer: null,
    mousePosition: null,
    retryMessage: null,
    popupMessage: null,
};

interface PlayStateStore {
    playState: PlayState;
    select: (id: number, mousePos: MousePosition) => void;
    cancel: () => void;
    answer: (answer: string) => void;
    closePopup: () => void;
}

const usePlayStateStore = create<PlayStateStore>((set, get) => ({
    playState: { ...defaultState, retryMessage: FirstTimeMessage },
    select: (id, mousePos) =>
        set(
            produce(({ playState }) => {
                playState.selectedId = id;
                playState.mousePosition = mousePos;
            })
        ),
    cancel: () =>
        set(
            produce((store) => {
                store.playState = {
                    ...defaultState,
                    popupMessage: store.playState.popupMessage,
                };
            })
        ),
    answer: (answer) => {
        // If answer correctly, set new score and 'cancel' then set popup message
        // else do onIncorrect (shake modal and refocus to input field), and set isRetry to new message
        const id = get().playState.selectedId!;
        if (checkAnswer(answer, id)) {
            useResultStore.setState(
                produce(({ result }) => {
                    result.score += 1;
                    result.answeredProvinces.push(id);
                })
            );
            set(
                produce((store) => {
                    store.playState = {
                        ...defaultState,
                        popupMessage: getMessage(
                            Congratulation,
                            store.playState.popupMessage
                        ),
                    };
                })
            );
        } else {
            onIncorrect();
            set(
                produce(({ playState }) => {
                    playState.retryMessage = getMessage(
                        TryAgain,
                        playState.retryMessage
                    );
                })
            );
        }
    },
    closePopup: () => {
        set(
            produce(({ playState }) => {
                playState.popupMessage = null;
            })
        );
    },
}));

export default usePlayStateStore;

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    Provinces.find((p) => p.id === selectedId)?.name.toLowerCase();

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

const getMessage = (
    messages: string[],
    previousMessage: string | null
): string => {
    let message = previousMessage;
    while (message === previousMessage) {
        message = messages[Math.floor(Math.random() * messages.length)];
    }

    return message!;
};
