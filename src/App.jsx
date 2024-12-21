import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Chat from "./Components/Chat/Chat";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const [state, setState] = useState({
    status: "on",
    navWidth: "18%",
    chatWidth: "82%",
    promptRight: "232px",
  });

  const onOff = () => {
    if (state.status === "on") {
      setState({
        status: "off",
        navWidth: "0%",
        chatWidth: "100%",
        promptRight: "370px",
      });
    } else {
      setState({
        status: "on",
        navWidth: "18%",
        chatWidth: "82%",
        promptRight: "232px",
      });
    }
    console.log("Clicked");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar state={state} func={onOff} />

      <Routes>
        <Route path="/" element={<Navigate to={"/chatgpt16/0"} />} />
        <Route path="/chatgpt16/:id" element={<Chat state={state} />} />
      </Routes>
    </>
  );
};

export default App;
