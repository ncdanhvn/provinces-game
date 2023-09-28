import { produce } from "immer";
import { create } from "zustand";
import Provinces from "../data/provinces";
import { MousePosition } from "../interfaces";
import useResultStore from "./resultStore";

interface PlayState {
    selectedId: number | null;
    answer: string | null;
    mousePosition: MousePosition | null;
}

const defaultState: PlayState = {
    selectedId: null,
    answer: null,
    mousePosition: null,
};

interface PlayStateStore {
    playState: PlayState;
    select: (id: number, mousePos: MousePosition) => void;
    cancel: () => void;
    answer: (answer: string) => void;
}

const usePlayStateStore = create<PlayStateStore>((set, get) => ({
    playState: { ...defaultState },
    select: (id, mousePos) =>
        set(
            produce((store) => {
                store.playState = {
                    selectedId: id,
                    mousePosition: mousePos,
                    answer: null,
                };
            })
        ),
    cancel: () =>
        set(
            produce((store) => {
                store.playState = { ...defaultState };
            })
        ),
    answer: (answer) => {
        // If answer correctly, set new score and 'cancel'
        // else do onIncorrect (shake modal and refocus to input field)
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
                    store.playState = { ...defaultState };
                })
            );
        } else onIncorrect();
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
