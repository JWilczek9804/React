// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(null);
  const [currancy, setCurrancy] = useState("USD");
  const [exchangedCurrancy, setExchangedCurrancy] = useState("EUR");
  const [rates, setRates] = useState(1);

  useEffect(() => {
    async function getCurrancyData() {
      try {
        if (currancy !== exchangedCurrancy) {
          const responce = await fetch(
            `https://api.frankfurter.app/latest?amount=100&from=${currancy}&to=${exchangedCurrancy}`
          );
          console.log(responce);
          const data = await responce.json();
          console.log(data);
          setRates(data.rates[`${exchangedCurrancy}`]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getCurrancyData();
  }, [currancy, exchangedCurrancy]);

  return (
    <div>
      <input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => setValue(e.target?.value)}
      />
      <select value={currancy} onChange={(e) => setCurrancy(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={exchangedCurrancy}
        onChange={(e) => setExchangedCurrancy(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        OUTPUT:{" "}
        {currancy === exchangedCurrancy
          ? value
          : ((value * rates) / 100).toFixed(2)}
      </p>
    </div>
  );
}
