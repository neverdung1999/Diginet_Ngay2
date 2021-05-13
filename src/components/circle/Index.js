import React, { useState } from "react";
import "./styles.css";

let numberRandom = Math.floor(Math.random() * 10000) + 3000;

function Index(props) {
  const { number, color } = props;
  const [test, setTest] = useState(false);
  const [addCss, setAddCss] = useState({
    transform: "",
  });
  const [userWin, setUserWin] = useState("");
  let count = number.length;
  let result = 0;
  let soNhan = 100 / count;
  let arrTamtest = [];
  let arrFind = [];
  let ketQua = 360 / count;

  const handleSpin = () => {
    setTest(true);
    setTimeout(function () {
      setTest(false);
      numberRandom += 5000 + Math.floor(Math.random() * 1000) + 100;
    }, 10000);
    let onClick = "rotate(" + numberRandom + "deg)";
    setAddCss({
      transform: onClick,
    });

    let valueSau =
      (360 - (numberRandom / 360 - Math.floor(numberRandom / 360)) * 360) /
      ketQua;
    let tronLen = Math.ceil(valueSau);

    setTimeout(function () {
      number.forEach((e, index) => {
        if (index + 1 === tronLen) {
          setUserWin(e);
        }
      });
    }, 10000);
  };

  number.forEach((e, index) => {
    result = soNhan * (index + 1);
    let onClick = "#" + color[index] + " 0 " + result + "%";
    arrFind.push(result);
    arrTamtest.push(onClick);
  });
  const aaaReverse = [...arrTamtest].join();

  const closeNoti = () => {
    setUserWin("");
  };

  return (
    <div>
      {number.length > 0 ? (
        <div>
          <button id="spin" onClick={handleSpin} disabled={test}>
            Spin
          </button>
          <span className="arrow"></span>
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
        </div>
      ) : (
        <div>
          <button id="spin" onClick={handleSpin} disabled={true}>
            Spin
          </button>
          <span className="arrow"></span>
          <div
            className="container"
            style={{
              transform: addCss.transform,
              background: `conic-gradient(${aaaReverse})`,
              animationName: "example",
              animationDuration: "1000s",
              animationIterationCount: "infinite",
            }}
          ></div>
        </div>
      )}
      {userWin ? (
        <div className="notiAll">
          <div className="alert_success">
            <h3>Chúng ta có một người chiến thắng!</h3>
            <p>{userWin} đã là người dành được chiến thắng</p>
            <button className="btnCloseNoti" onClick={closeNoti}>
              Đóng
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
