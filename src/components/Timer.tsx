import { useEffect, useState } from "react";
import { RxLapTimer } from "react-icons/rx";

interface Props {
  timeTotal: number; // time total in minutes
  timeUp: () => void;
}

const Timer = ({ timeTotal, timeUp }: Props) => {
  const [count, setCount] = useState(0);
  const segmentTime = timeTotal * 60 * 100;

  useEffect(() => {
    if (count < 10)
      setTimeout(() => {
        setCount(count + 1);
        console.log(count + 1);
      }, segmentTime);
    else timeUp();
  }, [count]);

  return (
    <div className="timer-box">
      <RxLapTimer className="timer-icon" />
      <div className="timer-segments">
        {[...Array(10).keys()].map((i) => (
          <div
            key={i}
            className={i < count ? "passed-segment" : "avaiable-segment"}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
