import { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";
import useGameStateStore from "../stores/gameStateStore";
import usePlayStateStore from "../stores/playStateStore";

const TimeTotal = 0.5; // in minute

const Timer = () => {
    const gameState = useGameStateStore(({gameState}) => gameState)
    const finishGame = useGameStateStore(({finishGame}) => finishGame)
    const [count, setCount] = useState(0);
    const segmentTime = TimeTotal * 60 * 100;

    useEffect(() => {
        if (gameState === "RUNNING")
            if (count < 10) {
                if (count === 0) console.log("Timer start");
                setTimeout(() => {
                    setCount(count + 1);
                    // console.log(count + 1);
                }, segmentTime);
            } else {
                setCount(0)
                finishGame();
            }
    }, [count, gameState]);

    return (
        <div className="timer-box">
            <RxLapTimer className="timer-icon" />
            <div className="timer-segments">
                {[...Array(10).keys()].map((i) => (
                    <div
                        key={i}
                        className={
                            i < count ? "passed-segment" : "avaiable-segment"
                        }
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Timer;
