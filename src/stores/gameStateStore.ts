import { produce } from "immer";
import { create } from "zustand";
import usePlayStateStore from "./playStateStore";
import useResultStore from "./resultStore";

interface GameStateStore {
    gameState: "INTRO" | "RUNNING" | "OVER";
    startGame: () => void;
    finishGame: () => void;
}

const useGameStateStore = create<GameStateStore>((set) => ({
    gameState: "INTRO",
    startGame: () => {
        // reset score first
        useResultStore.setState(
            produce(({ result }) => {
                result.score = 0;
                result.answeredProvinces = [];
            })
        );
        set(
            produce((store) => {
                store.gameState = "RUNNING";
            })
        );
    },
    finishGame: () => {
        // cancel selection first (if any)
        usePlayStateStore.setState(
            produce((store) => {
                store.playState = {
                    selectedId: null,
                    answer: null,
                    mousePosition: null,
                };
            })
        );
        set(
            produce((store) => {
                store.gameState = "OVER";
            })
        );
    },
}));

export default useGameStateStore;
