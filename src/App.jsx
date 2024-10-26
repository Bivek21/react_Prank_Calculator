import { useState } from "react";
import "./App.css";
import { Button } from "./Button";
import aa from "./assets/error.mp3";

const audio = new Audio(aa);

const operators = ["%", "/", "*", "-", "+"];

const App = () => {
  const [strToDisplay, setStrToDisplay] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isMouseDown, setIsMouseDown] = useState();
  const [isPrank, SetIsPrank] = useState(false);

  const displayTotal = () => {
    const extraValue = randomValue();
    const total = eval(strToDisplay) + extraValue;
    setStrToDisplay(total.toString());
    SetIsPrank(extraValue !== 0); // Set prank to true only if extraValue is not 0

    if (extraValue) {
      resetAudio(); // Ensure audio is reset before playing
      audio.play();
    } else {
      SetIsPrank(false);
    }
  };

  const randomValue = () => {
    const num = Math.round(Math.random() * 10);
    return num < 8 ? num : 0;
  };

  const buttonAction = (value) => {
    if (value === "AC") {
      setStrToDisplay("");
      SetIsPrank(false);
      resetAudio();
      return;
    }

    if (value === "C") {
      setStrToDisplay(strToDisplay.slice(0, -1));
      return;
    }

    if (value === "=" || value === "Enter") {
      setLastOperator("");
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1));
      }
      return displayTotal();
    }

    if (operators.includes(value)) {
      setLastOperator(value);
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        setStrToDisplay(strToDisplay.slice(0, -1));
        return;
      }
    }

    if (value === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);
      if (lastNumberSet.includes(".")) {
        return;
      }
      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }

    setStrToDisplay(strToDisplay + value);
  };

  // const handleOnButtonClick = (value) => {
  //   setIsMouseDown();
  //   buttonAction(value);
  // };
  // const handleOnMouseDown = (value) => {
  //   console.log(value);
  // };
  // console.log(isMouseDown);
  const handleOnButtonClick = (value) => {
    setIsMouseDown(""); // Reset isMouseDown here
    buttonAction(value);
  };

  const handleOnMouseDown = (value) => {
    setIsMouseDown(value); // Set isMouseDown to true when button is pressed
  };
  const handleOnMouseUp = () => {
    setIsMouseDown("");
  };

  const btns = [
    { cls: "btn-ac", label: "AC" },
    { cls: "btn-c", label: "C" },
    { cls: "btn-per", label: "%" },
    { cls: "btn-divide", label: "/" },
    { cls: "btn-7", label: "7" },
    { cls: "btn-8", label: "8" },
    { cls: "btn-9", label: "9" },
    { cls: "btn-X", label: "*" },
    { cls: "btn-4", label: "4" },
    { cls: "btn-5", label: "5" },
    { cls: "btn-6", label: "6" },
    { cls: "btn-minus", label: "-" },
    { cls: "btn-1", label: "1" },
    { cls: "btn-2", label: "2" },
    { cls: "btn-3", label: "3" },
    { cls: "btn-plus", label: "+" },
    { cls: "btn-0", label: "0" },
    { cls: "btn-dot", label: "." },
    { cls: "btn-equal", label: "=" },
  ];
  const btnStyle = {
    transform: isMouseDown ? "scale(0.9)" : "scale(1)",
    transition: "transform 0.2s",
  };

  return (
    <>
      <div className="wrapper flex-center">
        <div className="calculator">
          <div className="display londrina-sketch-regular prank">
            {strToDisplay || "0.00"}
            {/* {isPrank && <p className="prank">Prank</p>} */}
          </div>
          {btns.map((btn, i) => (
            <Button
              key={i}
              {...btn}
              handleOnButtonClick={handleOnButtonClick}
              handleOnMouseDown={handleOnMouseDown}
              btnStyle={btnStyle}
              isMouseDown={isMouseDown}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
