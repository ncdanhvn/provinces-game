import { create } from "zustand";
import { MousePosition } from "../interfaces";
import Provinces from "../data/provinces";
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

const newScore = useResultStore((result) => result.newScore);

const usePlayStateStore = create<PlayStateStore>((set, get) => ({
    playState: { selectedId: null, answer: null, mousePosition: null },
    select: (id, mousePos) =>
        set(() => ({
            playState: {
                selectedId: id,
                mousePosition: mousePos,
                answer: null,
            },
        })),
    cancel: () =>
        set(() => ({
            playState: {
                ...defaultState,
            },
        })),
    answer: (answer) => {
        const id = get().playState.selectedId!;
        if (checkAnswer(answer, id)) newScore(id);
        set(() => ({
            playState: {
                ...defaultState,
            },
        }));
    },
}));

export default usePlayStateStore

const checkAnswer = (answer: string, selectedId: number): boolean =>
    answer.toLowerCase() ===
    Provinces.find((p) => p.id === selectedId)?.name.toLowerCase();
