import { React, useState } from "react";
import "./App.css";

const App = () => {
  let buttonLotteryValue = "Lets Play!";

  const colorHEXRandomizer = () => {
    let result = [];
    let range = ["abcdef0123456789"];

    range = range.join("").split("");

    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 0; i <= 10; i++) {
      result.push(`${range[getRandomIntInclusive(0, range.length - 1)]}`);
      i++;
    }

    result.unshift("#");
    result = result.join("");

    return { backgroundColor: result };
  };

  const [color, setColor] = useState(colorHEXRandomizer());
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  const changeColor = () => {
    setColor(colorHEXRandomizer());
  };

  const copyToClipboard = () => {
    var copyText = document.getElementById("myInput");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);

    alert("Copied the color: " + copyText.value);
  };

  const colorLotteryApply = () => {
    let lotteryInterval = setInterval(() => {
      changeColor();
      setTimeout(() => {
        clearInterval(lotteryInterval);
      }, 4000);
    }, 150);
  };

  return (
    <div className='application__wrapper'>
      <div className='container'>
        <div className='application'>
          <div
            className={`application__face ${isActive ? "active" : ""}`}
          ></div>
          <div className='random__color' style={color}>
            <span className='random__color--hex'>{color.backgroundColor}</span>
            <input
              className='random__color--hex'
              hidden={true}
              type='text'
              readOnly
              value={color.backgroundColor}
              id='myInput'
            ></input>
          </div>
          <button
            type='button'
            className='random__color--button'
            onClick={changeColor}
          >
            Change!
          </button>

          <button
            type='button'
            className='random__color--button copy--btn'
            onClick={() => {
              copyToClipboard();
              handleClick();
            }}
          >
            Pick Up!
          </button>

          <button
            type='button'
            className='random__color--button lottery__btn'
            onClick={() => {
              colorLotteryApply();
              handleClick();
            }}
          >
            {buttonLotteryValue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
