import React, { useEffect, useState } from "react";

import "./App.css";

import data from "./constants/data";
import TextInput from "./components/textInput";
import SliderInput from "./components/sliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(0);
  const [fee, setFee] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(12);

  const calculateEmi = (downPayment) => {
    if (!cost) return 0;

    let p = Number(cost) - Number(downPayment);
    let roi = Number(interest) / 100;
    let n = Number(tenure);

    let emiAmount = Number(
      (p * roi * (1 + roi) ** n) / ((1 + roi) ** n - 1)
    ).toFixed(2);
    return emiAmount;
  };

  const updateEmi = (e) => {
    if (!cost) return;

    //total dp calculation
    let dp = Number(e.target.value).toFixed(2);
    setDownPayment(Number(e.target.value).toFixed(2));

    //calculate emi & update
    let emi = calculateEmi(dp);
    setEmi(emi);
  };
  const calculateDp = (emi) => {
    if (!cost) return;

    let dp_percentage = 100 - (emi / calculateEmi(0)) * 100;
    return Number((dp_percentage / 100) * Number(cost)).toFixed(2);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    let emi = Number(e.target.value).toFixed(2);
    setEmi(emi);

    //calculate Dp & update it

    let dp = calculateDp(emi);

    setDownPayment(dp);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }
    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [tenure, cost]);

  return (
    <div className="App">
      <h1>EMI CALCULATOR</h1>
      <br></br>
      <br></br>
      <TextInput title="Enter the Total Cost" state={cost} setState={setCost} />
      <TextInput
        title="Enter the Interest rate"
        state={interest}
        setState={setInterest}
      />
      <TextInput
        title="Enter the Processing fee"
        state={fee}
        setState={setFee}
      />
      <SliderInput
        title="Down Payment"
        minValue={0}
        maxValue={cost}
        state={downPayment}
        setState={updateEmi}
      />

      <span className="span-label">{downPayment}</span>
      <br></br>
      <br></br>
      {cost > 0 && (
        <span className="span-label">
          Total Down Payment :{" "}
          {(
            Number(downPayment) +
            (Number(cost) - Number(downPayment)) * (Number(fee) / 100)
          ).toFixed(2)}
        </span>
      )}
      <br></br>
      <br></br>

      <SliderInput
        title="Loan Per Month"
        minValue={calculateEmi(cost)}
        maxValue={calculateEmi(0)}
        state={emi}
        setState={updateDownPayment}
      />
      <span className="span-label">{emi}</span>

      <br></br>
      <br></br>
      {cost > 0 && (
        <span className="span-label">
          Total Loan Amount : {(Number(tenure) * Number(emi)).toFixed(2)}
        </span>
      )}
      <br></br>
      <br></br>
      <br />
      <br />
      <div className="tenure-container">
        {data.map((ele, index) => {
          return (
            <span
              key={index}
              className={`tenure ${tenure == ele ? "selected" : ""}`}
              onClick={() => {
                setTenure(ele);
              }}
            >
              {ele}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
