import { useEffect } from "react";
import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  let [step, setStep] = useState(1);
  let [isOpen, setIsOpen] = useState(true);
  let date = new Date().get;

  function handlePrevious() {
    step <= 1 ? setStep((val) => messages.length) : setStep((val) => val - 1);
  }
  function handleNext() {
    step >= messages.length ? setStep((val) => 1) : setStep((val) => val + 1);
  }

  let i = 1;
  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen((curStep) => !curStep)}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {messages.map(() => (
              <div className={`${step == i ? "active" : ""}`}>{i++}</div>
            ))}
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button
              bgColor={"#7950f2"}
              textColor={"#fff"}
              onClick={handlePrevious}
            >
              <span>👈</span> Previous
            </Button>
            <Button bgColor={"#7950f2"} textColor={"#fff"} onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3 style={{ display: "inline" }}>Step {step}:</h3> {children}
    </p>
  );
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
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
