import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage.jsx";

function App() {
    return (
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
  }

// rendering employee directory component in data div...
ReactDOM.render(<App />, document.getElementById('data'));