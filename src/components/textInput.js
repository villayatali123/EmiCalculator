import React from "react";

function TextInput({ title, className, state, setState }) {
  return (
    <>
      <label>{title}</label>
      <input
        className="input"
        type="number"
        placeholder={title}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </>
  );
}

export default TextInput;
