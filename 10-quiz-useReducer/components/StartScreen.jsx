function StartScreen({ numQuestions, startQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your react mastery</h3>
      <button className="btn btn-ui" onClick={() => startQuiz()}>
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
