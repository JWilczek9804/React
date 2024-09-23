import { useEffect, useReducer, useRef, useState } from "react";
// import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const ACTION_TYPE = {
  FETCH_SUCCESS: "success",
  FETCH_FAILED: "error",
  QUIZ_START: "start",
  NEW_ANSWER: "newAnswer",
  TIMER_DOWN: "timerDown",
  NEXT_QUESTION: "nextQuestion",
  QUIZ_FINISHED: "finished",
  RESTART_QUIZ: "restart",
  SECS_PER_QUESTION: 30,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.FETCH_SUCCESS:
      return { ...state, questions: action.payload, status: "ready" };
    case ACTION_TYPE.QUIZ_START:
      return {
        ...state,
        status: "active",
        secondsRemaining:
          state.questions.length * ACTION_TYPE.SECS_PER_QUESTION,
      };
    case ACTION_TYPE.NEW_ANSWER:
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case ACTION_TYPE.TIMER_DOWN:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }; // Ponieważ jest StrictMode, wszystko wczytuje się podwójnie
    case ACTION_TYPE.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };
    case ACTION_TYPE.QUIZ_FINISHED:
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        secondsRemaining: state.secondsRemaining,
      };
    case ACTION_TYPE.RESTART_QUIZ:
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining:
          state.questions.length * ACTION_TYPE.SECS_PER_QUESTION,
      };
    case ACTION_TYPE.FETCH_FAILED:
      return { ...state, status: "error" };
    default:
      return state;
  }
}

function App() {
  const initialState = {
    questions: [],
    /* 'loading', 'error', 'ready', 'active', 'finished'*/
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondsRemaining: null,
  };

  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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
        dispatch({ type: ACTION_TYPE.FETCH_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: ACTION_TYPE.FETCH_FAILED });
        throw new Error(err.message);
      });
  }, []);
  const allPoints = useRef(0);

  allPoints.current = questions.reduce((acc, cur) => acc + cur.points, 0);
  console.log(allPoints.current);
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main>
        {status == "error" && <Error />}
        {status == "loading" && <Loader />}
        {status == "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status == "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              points={points}
              allPoints={allPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              >
                Next
              </NextButton>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            allPoints={allPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

export { ACTION_TYPE };
