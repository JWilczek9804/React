import { ACTION_TYPE } from "./App";
function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPE.NEXT_QUESTION })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPE.QUIZ_FINISHED })}
      >
        Check Results
      </button>
    );
  }
}
export default NextButton;
