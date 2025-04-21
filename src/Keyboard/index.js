import React, { useEffect, useState } from "react";

const backIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  [backIcon, "Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

function Keyboard() {

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyUp = (e) => {

  };

  const handleKeyDown = ({ key }) => {
  };

  const handleKeyClick = (key) => {
    console.log("Clicked", key);
  };  

  return (
    <div className="keyboard-container" onKeyDown={handleKeyDown}>
      <div className="keybard">
        {keys.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="keyboard-row">
              {row.map((key) => {
                return (
                  <div
                    key={key}
                    className="keyboard-button"
                    data-key={key}
                    onClick={() => handleKeyClick(key)}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Keyboard;
