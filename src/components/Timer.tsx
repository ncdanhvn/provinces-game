import { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";

interface Props {
    timeTotal: number; // time total in minutes
    timeUp: () => void;
    isEnableTimer: boolean;
}

const Timer = ({ timeTotal, timeUp, isEnableTimer }: Props) => {
    const [count, setCount] = useState(0);
    const segmentTime = timeTotal * 60 * 100;

    useEffect(() => {
        if (isEnableTimer)
            if (count < 10) {
                if (count === 0) console.log("Timer start");
                setTimeout(() => {
                    setCount(count + 1);
                    // console.log(count + 1);
                }, segmentTime);
            } else {
                setCount(0)
                timeUp();
            }
    }, [count, isEnableTimer]);

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
