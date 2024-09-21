import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./StarRating.jsx";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" setMovieRating={setMovieRating} />
      {movieRating ? (
        <p>
          The movie is rate on {movieRating}{" "}
          {movieRating == 1 ? "star" : "stars"}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={5} size={30} color={"#e03131"} />
    <StarRating maxRating={10} size={48} color={"#dfdf00"} />
    <StarRating maxRating={8} />
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    /> */}
    {/* <Test /> */}
  </StrictMode>
);
