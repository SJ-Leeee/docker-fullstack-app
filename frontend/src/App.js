import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // 데이터 가져오는 함수
  useEffect(() => {
    axios.get("/api/values").then((response) => {
      console.log("response", response);
      setLists(response.data);
    });
  }, []);
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  // onChange 이벤트 함수
  const changeHandler = (event) => {
    setValue(event.currentTarget.value);
  };

  // onSubmit 이벤트 함수
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post("/api/value", { value }).then((response) => {
      if (response.data.success) {
        console.log("response.data", response.data);
        setLists([...lists, response.data]);
        setValue("");
      } else {
        alert("값을 DB에 넣는데 실패했습니다.");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => <li key={index}>{list.value} </li>)} <br />
          <form className="example" onSubmit={submitHandler}>
            <input type="text" placeholder="입력해주22세요..." onChange={changeHandler} value={value} />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
