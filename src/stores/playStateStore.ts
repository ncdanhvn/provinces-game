import { create } from "zustand";
import { MousePosition } from "../interfaces";

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
        set(() => ({
            playState: {
                selectedId: id,
                mousePosition: mousePos,
                answer: null,
            },
        })),
    cancel: () => set(() => ({ playState: { ...defaultState } })),
    answer: (answer) => set(() => ({ playState: { ...defaultState } })),    // Currently, after answer, either correct or incorrect, close the modal and reset playing state
}));

export default usePlayStateStore;