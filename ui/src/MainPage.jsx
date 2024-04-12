import React from "react";
import Navigation from "./Navigation.jsx";
import Content from "./Content.jsx";

function MainPage() {
  return (
    <>
      <Navigation />
      <div className="container">
      <Content />
      </div>
    </>
  );
}
export default MainPage;
