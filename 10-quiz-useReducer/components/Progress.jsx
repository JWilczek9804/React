function Progress({ index, numQuestion, points, allPoints }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index} />
      <p>
        <strong>{index}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {allPoints.current}
      </p>
    </header>
  );
}

export default Progress;
