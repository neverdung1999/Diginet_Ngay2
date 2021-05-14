import React, { useState } from "react";
import "./styles.css";
import Circle from "../circle/Index";
import _ from "lodash";

function Index(props) {
  const [number, setNumber] = useState([]);
  const [color, setColor] = useState([]);
  const [chosseOption, setChosseOption] = useState(-1);
  const [status, setStatus] = useState(false);
  let stt = false;

  stt = number.some((item) => _.isEmpty(item));

  const addItem = () => {
    if (number.length > 9) {
      alert("Thôi đủ rồi, nạp VIP để mở thêm !!!");
    } else {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      setColor([...color, randomColor]);
      setNumber([...number, ""]);
    }
  };

  const hadleChange = (e, index) => {
    const arrData = [...number];
    arrData[index] = e.target.value;
    setNumber(arrData);
  };

  const removeItem = (index) => {
    const arrData = number.filter((e, idx) => idx !== index);
    setNumber(arrData);
  };

  const handleChangeOption = (e) => {
    setChosseOption(e.target.value);
  };

  const okTestThu = (e) => {
    setStatus(e);
  };

  return (
    <div className="all">
      <div className="left">
        <h2>Chiếc nón diệu kì</h2>
        <button
          className="icon-plus"
          onClick={() => addItem()}
          disabled={status}
        >
          <i className="fas fa-plus-square"></i>
          <p>Thêm tên người chơi</p>
        </button>
        <div className="hackGame">
          <p className="p_hackGame">Hack game</p>
          {stt ? (
            <select
              className="selectOption"
              onChange={(e) => handleChangeOption(e)}
              disabled={true}
            >
              <option value={-1}>----- Random -----</option>
              {number.map((e, index) => {
                if (e !== null) {
                  return (
                    <option key={index} value={index}>
                      {e}
                    </option>
                  );
                }
              })}
            </select>
          ) : (
            <select
              className="selectOption"
              onChange={(e) => handleChangeOption(e)}
              // disabled={statusChecked}
            >
              <option value={-1}>---------- Random ----------</option>
              {number.map((e, index) => {
                if (e !== null) {
                  return (
                    <option key={index} value={index}>
                      {e}
                    </option>
                  );
                }
              })}
            </select>
          )}
        </div>

        {number.length > 0 ? (
          <div className="textInput">
            {number.map((e, index) => (
              <div className="input" key={index}>
                <input
                  type="text"
                  onChange={(e) => hadleChange(e, index)}
                  placeholder={`Người chơi ${index + 1}`}
                  value={e}
                  required
                />
                <div className="icon-i" onClick={() => removeItem(index)}>
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="textInput"
            style={{
              opacity: 0,
            }}
          ></div>
        )}
      </div>
      <Circle
        number={number}
        color={color}
        chosseOption={chosseOption}
        testThuNha={okTestThu}
      />
    </div>
  );
}

export default Index;
