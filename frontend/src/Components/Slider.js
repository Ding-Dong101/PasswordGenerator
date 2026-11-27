import React from "react";
import "../App.css";
import CheckbtnContainer from "./CheckContainer";
import GenButn from "./GenButn";
import StrengthTestBox from "./StrengthTestBox";

export default function Slider({
  length,
  onLengthChange,
  options,
  onToggleOption,
  strength,
  onGenerate,
  loading,
  error,
}) {
  const handleSliderChange = (event) => {
    onLengthChange(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate();
  };

  return (
    <form className="bg" onSubmit={handleSubmit}>
      <div className="text-area">
        <div className="charLen">
          <p>Character length</p>
        </div>
        <div className="charNumber">{length}</div>
      </div>
      <input
        type="range"
        className="sliderElement"
        value={length}
        min="1"
        max="100"
        onChange={handleSliderChange}
        aria-label="Character length"
      />
      <CheckbtnContainer options={options} onToggleOption={onToggleOption} />
      <StrengthTestBox score={strength.score} label={strength.label} />
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <GenButn loading={loading} />
    </form>
  );
}
