import useResultStore from "../stores/resultStore";

const Score = () => {
    const score = useResultStore(({ result }) => result.score);
    
    return (
        <div className="score-box">
            <div className="score">{score}</div>
            <div className="score-text">/63 tỉnh thành</div>
        </div>
    );
};

export default Score;
