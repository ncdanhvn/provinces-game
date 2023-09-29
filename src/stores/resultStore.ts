import { produce } from "immer";
import { create } from "zustand";

interface Result {
    score: number;
    answeredProvinces: number[];
}

interface ResultStore {
    result: Result;
    newScore: (provinceId: number) => void;
    reset: () => void;
}

const useResultStore = create<ResultStore>((set) => ({
    result: { score: 0, answeredProvinces: [] },
    newScore: (provinceId) =>
        set(
            produce(({ result }) => {
                result.score += 1;
                result.answeredProvinces.push(provinceId);
            })
        ),
    reset: () =>
        set(
            produce(({ result }) => {
                result.score = 0;
                result.answeredProvinces = [];
            })
        ),
}));

export default useResultStore;
