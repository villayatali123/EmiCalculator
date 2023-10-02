import React from "react";

function SliderInput({ title, minValue, maxValue, state, setState }) {
  return (
    <>
      <label>{title}</label>
      <input
        className="input"
        type="range"
        min={minValue}
        max={maxValue}
        value={state}
        onChange={setState}
      />
    </>
  );
}

export default SliderInput;
