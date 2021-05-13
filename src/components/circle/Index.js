import _ from "lodash";
import React, { useState } from "react";
import "./styles.css";

let numberRandom = 5000;

function Index(props) {
  const { number } = props;
  const [addCss, setAddCss] = useState({
    transform: "",
  });
  const handleSpin = () => {
    // let number = Math.ceil(Math.random() * 10000);
    let onClick = "rotate(" + numberRandom + "deg)";
    numberRandom += 5000;
    setAddCss({
      transform: onClick,
    });
  };
  let count = number.length;
  let result = 0;
  let soNhan = 100 / count;
  let arrTamtest = [];

  number.forEach((e, index) => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    result = soNhan * (index + 1);
    let onClick = "#" + randomColor + " 0 " + result + "%";
    arrTamtest.push(onClick);
  });
  const aaaReverse = [...arrTamtest].join();
  let ketQua = 360 / count;

  return (
    <div>
      <button id="spin" onClick={handleSpin}>
        Spin
      </button>
      <span className="arrow"></span>
      {number.length > 0 ? (
        <div
          className="container"
          style={{
            transform: addCss.transform,
            background: `conic-gradient(${aaaReverse})`,
          }}
        >
          {number.map((value, index) => {
            return (
              <div
                key={index}
                className="text"
                style={{
                  transform: `rotate(${360 / count / 2 + ketQua * index}deg)`,
                }}
              >
                <span id="value-span">{value}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="container"
          style={{
            transform: addCss.transform,
            background: `conic-gradient(${aaaReverse})`,
            animationName: "example",
            animationDuration: "4s",
            animationIterationCount: "infinite",
          }}
        ></div>
      )}
    </div>
  );
}

export default Index;
