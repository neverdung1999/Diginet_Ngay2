import React, { useState } from "react";
import "./styles.css";
import Circle from "../circle/Index";
import _ from "lodash";

function Index(props) {
  const [number, setNumber] = useState([]);

  const addItem = () => {
    if (number.length > 9) {
      alert("Thôi đủ rồi, nạp VIP để mở thêm !!!");
    } else {
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

  return (
    <div className="all">
      <div className="left">
        <h2>Chiếc nón diệu kì</h2>
        <div className="icon-plus" onClick={() => addItem()}>
          <i className="fas fa-plus-square"></i>
          <p>Thêm tên người chơi</p>
        </div>
        {number.length > 0 ? (
          <div className="textInput">
            {number.map((e, index) => (
              <div className="input" key={index}>
                <input
                  type="text"
                  onChange={(e) => hadleChange(e, index)}
                  placeholder={`Người chơi ${index + 1}`}
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
      <Circle number={number} />
    </div>
  );
}

export default Index;
