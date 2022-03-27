import "./App.css";
import React from "react";
import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
