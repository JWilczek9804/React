import { useEffect, useReducer, useState } from "react";
// import DateCounter from "./DateCounter";
import Header from "../components/Header";
import Main from "../components/Main";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";

const ACTION_TYPE = {
  FETCH_SUCCESS: "success",
  FETCH_STATUS: "status",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.FETCH_SUCCESS:
      return { ...state, questions: action.payload, status: "ready" };
    case ACTION_TYPE.FETCH_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

function App() {
  const initialState = {
    questions: [],
    /* loading, error, ready, active, finished*/
    status: "loading",
  };

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  // const { data, loading, error } = state;

  const numQuestions = questions.length;

  useEffect(function () {
    // try {
    //   async function getData() {
    //     dispatch({ type: ACTION_TYPE.FETCH_LOADING, payload: true });
    //     dispatch({ type: ACTION_TYPE.FETCH_ERROR, payload: false });
    //     const responce = await fetch("http://localhost:8000/questions");
    //     if (!responce.ok)
    //       return dispatch({ type: ACTION_TYPE.FETCH_ERROR, payload: true });

    //     const dataRepsonse = await responce.json();
    //     dispatch({ type: ACTION_TYPE.FETCH_SUCCESS, payload: dataRepsonse });
    //     dispatch({ type: ACTION_TYPE.FETCH_LOADING, payload: false });
    //     console.log(state.questions);
    //   }
    //   getData();
    // } catch (err) {
    //   if (state.error) {
    //     console.error(err);
    //   }
    // }
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          { type: ACTION_TYPE.FETCH_SUCCESS, payload: data },
          { type: ACTION_TYPE.FETCH_STATUS, payload: "ready" }
        );
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPE.FETCH_STATUS, payload: "error" });
        throw new Error(err.message);
      });
  }, []);

  function handleStartQuiz() {
    dispatch({ type: ACTION_TYPE.FETCH_STATUS, payload: "active" });
  }
  function handleFinishQuiz() {
    dispatch({ type: ACTION_TYPE.FETCH_STATUS, payload: "finished" });
  }

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status == "error" && <Error />}
        {status == "loading" && <Loader />}
        {status == "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            startQuiz={handleStartQuiz}
          />
        )}
        {status == "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
