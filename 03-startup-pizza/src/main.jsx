import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { pizzaData } from "./data.js";
import "./index.css";

console.log(pizzaData);
function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <dev className="container">
      <Header />
      <Menu />
      <Footer time={time} />
    </dev>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Welcome in pizzeria's menu!</h1>
    </header>
  );
}
function Menu() {
  const numPizzas = pizzaData.length;
  return (
    <main className="menu">
      <h2>Our menu!</h2>
      {numPizzas > 0 ? (
        <>
          {" "}
          {/* Pattern of use React Fragment,
         what can merge two block or more of elements. 
         It allow to seperate blocks in the same block. We dont need to create new div
         and putting it into him */}
          <p>Authetic Italian cuisine. 6 creative dishes to choose from.</p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We are still working on our menu. Please come back later</p>
      )}
      {/* <Pizza
        name={pizzaData[0].name}
        ingredients={pizzaData[0].ingredients}
        photoName={pizzaData[0].photoName}
        price={pizzaData[0].price}
      />
      <Pizza
        name={pizzaData[1].name}
        ingredients={pizzaData[1].ingredients}
        photoName={pizzaData[1].photoName}
        price={pizzaData[1].price}
      />
      <Pizza
        name={pizzaData[2].name}
        ingredients={pizzaData[2].ingredients}
        photoName={pizzaData[2].photoName}
        price={pizzaData[2].price}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer({ time }) {
  let currTime = new Date().getHours();
  let closedHour = 22;
  let openHour = 10;
  let isOpen = currTime < closedHour && currTime > openHour;
  return (
    <footer className="footer">
      {time}
      {isOpen ? (
        <Order closedHour={closedHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closedHour}:00.
        </p>
      )}
    </footer>
  );
}
function Order(props) {
  return (
    <div className="order">
      <p>
        We're open until {props.closedHour}:00. Come visit us or order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const react = ReactDOM.createRoot(document.getElementById("root"));

react.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
