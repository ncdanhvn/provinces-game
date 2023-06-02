import React from "react";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  return (
    <div className="score-box">
      <div className="score">{score}</div>
      <div className="score-text">/63 tỉnh thành</div>
    </div>
  );
};

export default Score;
