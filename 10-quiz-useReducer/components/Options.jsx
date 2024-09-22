import { ACTION_TYPE } from "./App";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: ACTION_TYPE.NEW_ANSWER, payload: index })
          }
        >
          {option}
        </button>
      ))}

    </div>
  );
}

export default Options;
