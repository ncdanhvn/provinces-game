import React from "react";

interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  return (
    <div className="score-box">
      <span className="score">{score}</span>
      <span className="score-text">/63 tỉnh thành</span>
    </div>
  );
};

export default Score;
