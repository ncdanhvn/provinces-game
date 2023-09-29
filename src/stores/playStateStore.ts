import { create } from "zustand";
import { MousePosition } from "../interfaces";
import { produce } from "immer";

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
    answer: (answer) =>
        set(
            produce((store) => {
                store.playState = { ...defaultState };
            })
        ), // Currently, after answer, either correct or incorrect, close the modal and reset playing state
}));

export default usePlayStateStore;
