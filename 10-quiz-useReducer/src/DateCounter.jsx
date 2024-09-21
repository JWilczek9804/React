import { act } from "react";
import { useReducer } from "react";
import { useState } from "react";

const ACTION_TYPES = {
  INC: "inc",
  DEC: "dec",
  SETCOUNT: "setCount",
  SETSTEP: "setStep",
  RESET: "reset",
};

function reducer(state, action) {
  if (action.type === "inc") return state + 1;
  if (action.type === "dec") return state - 1;
  if (action.type === "setCount") return action.payLoading;
}

function DateCounter() {
  //   const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(function (state, action) {
    console.log(state, action);

    switch (action.type) {
      case "inc":
        return { ...state, count: state.count + state.step };
      case "dec":
        return { ...state, count: state.count - state.step };
      case "setCount":
        return { ...state, count: action.payLoad };
      case "setStep":
        return { ...state, step: action.payLoad };
      case "reset":
        return action.payLoad;
      default:
        throw new Error("Unknown action");
    }
  }, initialState);

  const { count, step } = state;
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: ACTION_TYPES.DEC });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: ACTION_TYPES.INC });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: ACTION_TYPES.SETCOUNT, payLoad: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: ACTION_TYPES.SETSTEP, payLoad: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: ACTION_TYPES.RESET, payLoad: initialState });
    console.log(state);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
