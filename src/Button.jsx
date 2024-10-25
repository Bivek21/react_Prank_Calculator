import React from "react";

export const Button = ({
  cls,
  label,
  handleOnButtonClick,
  handleOnMouseDown,
  btnStyle,
  isMouseDown,
}) => {
  return (
    <div
      style={isMouseDown === label ? btnStyle : {}}
      onMouseDown={() => handleOnMouseDown(label)}
      onClick={() => handleOnButtonClick(label)}
      className={"btn " + cls}
    >
      {label}
    </div>
  );
};
