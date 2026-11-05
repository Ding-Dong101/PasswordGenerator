import React, { useState } from "react";
import "../App.css";
import CheckbtnContainer from "./CheckContainer";
import GenButn from "./GenButn";
import StrengthTestBox from "./StrengthTestBox";

export default function Slider() {
  const [charLength, setCharLength] = useState(0); // Initialize state for character length

  const handleSliderChange = (event) => {
    setCharLength(event.target.value); // Update state when slider value changes
  };

  return (
    <div className="bg">
      <div className="text-area">
        <div className="charLen">
          <p>Character length</p>
        </div>
        <div className="charNumber">
          {charLength} {/* Display the current character length */}
        </div>
      </div>
      <input
        type="range"
        className="sliderElement"
        value={charLength}
        min="1"
        max="100"
        onChange={handleSliderChange} // Attach event handler
      ></input>
      <CheckbtnContainer />
      <StrengthTestBox />
      <GenButn />
    </div>
  );
}
