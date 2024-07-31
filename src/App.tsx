import React from "react";
import "./App.css";
import StockList from "../src/Components/StocksList/StockList.tsx";

function App() {
  return (
    <div className="App">
      <h1>Список акций на бирже</h1>
      <StockList />
    </div>
  );
}

export default App;
