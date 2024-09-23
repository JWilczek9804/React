function Progress({ index, numQuestion, points, allPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {allPoints.current}
      </p>
    </header>
  );
}

export default Progress;
