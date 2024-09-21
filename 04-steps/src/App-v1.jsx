import { useEffect } from "react";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  let [step, setStep] = useState(1);
  let [isOpen, useStep] = useState(true);
  let date = new Date().get


  let i = 1;
  return (
    <>
      <button className="close" onClick={() => useStep((curStep) => !curStep)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {messages.map(() => (
              <div className={`${step == i ? "active" : ""}`}>{i++}</div>
            ))}
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={() =>
                step <= 1
                  ? setStep((val) => messages.length)
                  : setStep((val) => val - 1)
              }
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={() =>
                step >= messages.length
                  ? setStep((val) => 1)
                  : setStep((val) => val + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
// function Header() {
//   return (
//     <header>
//       <h1>Header Section</h1>
//     </header>
//   );
// }
// function Main() {
//   return (
//     <main className="contentApplication">
//       <h1>Main section</h1>
//       <div className="containerContentApplication">
//         <span>Container 1</span>
//         <span>Container 1</span>
//         <span>Container 1</span>
//         <span>Container 1</span>
//       </div>
//     </main>
//   );
// }
// function Footer() {
//   return (
//     <footer>
//       <h1>Footer section</h1>
//     </footer>
//   );
// }
