import _ from "lodash";
import React, { useState } from "react";
import "./styles.css";

let numberRandom = 0;

function Index(props) {
  const { number, color, chosseOption } = props;
  const [test, setTest] = useState(false);
  const [addCss, setAddCss] = useState({
    transform: "",
  });
  const [userWin, setUserWin] = useState([]);
  const [statusNoti, setStatusNoti] = useState(false);
  const [statusRank, setStatusRank] = useState(false);

  let count = number.length;
  let result = 0;
  let soNhan = 100 / count;
  let arrTamtest = [];
  let arrFind = [];
  let ketQua = 360 / count;
  let arrDoLechTam = [];
  let stt = false;

  number.forEach((e, index) => {
    let doLechTam = 0;
    doLechTam = ((index + 1) * soNhan * 360) / 100;
    arrDoLechTam.push(doLechTam);
    result = soNhan * (index + 1);
    let onClick = "#" + color[index] + " 0 " + result + "%";
    arrFind.push(result);
    arrTamtest.push(onClick);
  });
  const aaaReverse = [...arrTamtest].join();

  const handleSpin = () => {
    stt = number.some((item) => _.isEmpty(item));
    if (!stt) {
      if (chosseOption == -1) {
        numberRandom = Math.floor(Math.random() * 10000) + 5000 + numberRandom;
        setTimeout(function () {
          setTest(false);
          props.testThuNha(false);
          numberRandom += 5000 + Math.floor(Math.random() * 1000) + 100;
        }, 1000);
      } else {
        // ---- hack game ----
        let randomNumber = Math.floor(Math.random() * ketQua);
        const a = 7200 - arrDoLechTam[chosseOption] + randomNumber;
        if (a <= numberRandom) {
          numberRandom +=
            360 -
            (numberRandom / 360 - Math.floor(numberRandom / 360)) * 360 +
            7200 -
            arrDoLechTam[chosseOption] +
            randomNumber;
        } else {
          numberRandom = 7200 - arrDoLechTam[chosseOption] + randomNumber;
        }

        setTimeout(function () {
          setTest(false);
          props.testThuNha(false);
        }, 1000);
        // ---- end hack game ----
      }
      setTest(true);
      props.testThuNha(true);
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
            setUserWin([...userWin, e]);
            setStatusNoti(true);
          }
        });
      }, 1000);
    } else {
      alert("Vui l??ng nh???p ?????y ????? th??ng tin");
    }
  };

  const closeNoti = () => {
    setStatusNoti(false);
  };

  const showRank = () => {
    setStatusRank(true);
  };

  const closeRank = () => { 
    setStatusRank(false);
  }

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
      {statusNoti ? (
        <div className="notiAll">
          <div className="alert_success">
            <h3>Ch??ng ta c?? m???t ng?????i chi???n th???ng!</h3>
            <p>
              {userWin[userWin.length - 1]} ???? l?? ng?????i d??nh ???????c chi???n th???ng
            </p>
            <button className="btnCloseNoti" onClick={closeNoti}>
              ????ng
            </button>
          </div>
        </div>
      ) : null}
      {_.isEmpty(userWin) ? (
        <button className="btnRank" onClick={() => showRank()} disabled={true}>
          B???ng x???p h???ng
        </button>
      ) : (
        <button className="btnRank" onClick={() => showRank()}>
          B???ng x???p h???ng
        </button>
      )}

      {statusRank ? (
        <div className="notiAll">
          <div className="tableRank">
            <p className="p_ranking">b???ng x???p h???ng</p>
            {[...new Set(userWin)].map((e, index) => {
              return (
                <p key={index} className="user_ranking">
                  {" "}
                  Ng?????i ch??i {e} : ???? th???ng {_.countBy(userWin)[e]} l???n
                </p>
              );
            })}
            <button className="btnCloseNoti" onClick={closeRank}>
              ????ng
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Index;
