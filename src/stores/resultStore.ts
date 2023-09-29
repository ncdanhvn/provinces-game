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
        set(({result}) => ({
            result: {
                score: result.score + 1,
                answeredProvinces: [
                    ...result.answeredProvinces,
                    provinceId,
                ],
            },
        })),
    reset: () =>
        set(() => ({
            result: {
                score: 0,
                answeredProvinces: [],
            },
        })),
}));

export default useResultStore
