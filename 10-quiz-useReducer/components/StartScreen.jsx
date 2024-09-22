import { ACTION_TYPE } from "./App";

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ACTION_TYPE.QUIZ_START })}
      >
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
