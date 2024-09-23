import { ACTION_TYPE } from "./App";

function FinishedScreen({ points, allPoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / allPoints.current) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {allPoints.current} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPE.RESTART_QUIZ })}
      >
        Return to menu
      </button>
    </>
  );
}

export default FinishedScreen;
