import { create } from "zustand";

interface GameStateStore {
    gameState: "INTRO" | "RUNNING" | "OVER";
    startGame: () => void;
    finishGame: () => void;
}

const useGameStateStore = create<GameStateStore>((set) => ({
    gameState: "INTRO",
    startGame: () => set(() => ({ gameState: "RUNNING" })),
    finishGame: () => set(() => ({ gameState: "OVER" })),
}));

export default useGameStateStore;
