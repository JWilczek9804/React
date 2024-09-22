import { ACTION_TYPE } from "./App";
function NextButton({ dispatch, answer }) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: ACTION_TYPE.NEXT_QUESTION })}
    >
      Next
    </button>
  );
}

export default NextButton;
