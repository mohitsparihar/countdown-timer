import axios from "axios";
import "./App.css";
import CountdownTimer from "./components/CountdownTimer";
import { useState, useEffect } from "react";

function App() {
  const bitcoinPriceUrl = import.meta.env.VITE_GET_REQUEST;

  const [state, setState] = useState({
    predictedDate: import.meta.env.VITE_PREDICTED_DATE,
    targetBlocks: 840000,
    blocksRemaining: 521,
    bitcoinPrice: "$62,716.13",
  });

  const { predictedDate, targetBlocks, blocksRemaining, bitcoinPrice } = state;

  const getStateData = (url) => {
    try {
      const request = axios.get(url);
      const { bitcoinPrice } = request.data;
      setState((prev) => ({ ...prev, bitcoinPrice }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bitcoinPriceUrl) {
      const interval = setInterval(() => {
        getStateData(bitcoinPriceUrl);
      }, 5000);

      return () => clearInterval(interval);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔥 Bitcoin Halving Countdown</h1>
      </header>
      <main>
        <div className="info">
          <CountdownTimer targetDate={predictedDate} />
          <div className="predicted-date">
            <div className="flex align-items-center justify-content-evenly subHeader">
              <span style={{ paddingLeft: "1rem", width: "100%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
              <span
                className="w-100"
                style={{ fontSize: "1.2rem", padding: "0 5px" }}
              >
                Predicted Date
              </span>
              <span style={{ paddingRight: "1rem", width: "100%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
            </div>
            <strong>{predictedDate}</strong>
          </div>
          <div className="blocks-remaining">
            <div className="flex align-items-center justify-content-evenly subHeader">
              <span style={{ paddingLeft: "1rem", width: "85%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
              <span
                className="w-100"
                style={{ fontSize: "1.2rem", padding: "0 5px" }}
              >
                Blocks Remaining
              </span>
              <span style={{ paddingRight: "1rem", width: "85%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
            </div>
            <strong>{blocksRemaining}</strong>
            <small>Target #{targetBlocks}</small>
          </div>
          <div className="bitcoin-price">
            <div className="flex align-items-center justify-content-evenly subHeader">
              <span style={{ paddingLeft: "1rem", width: "100%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
              <span
                // className="w-100"
                style={{ fontSize: "1.2rem", padding: "0 5px", width: "70%" }}
              >
                Bitcoin Price
              </span>
              <span style={{ paddingRight: "1rem", width: "100%" }}>
                <hr style={{ borderWidth: "medium" }} />
              </span>
            </div>
            <strong>{bitcoinPrice}</strong>
            <div style={{ padding: "0 1rem", display: "flex" }}>
              <span className="w-100">
                <hr
                  style={{
                    borderWidth: "medium",
                    borderColor: "rgb(36 84 38)",
                    borderStyle: "solid",
                  }}
                />
              </span>
              <span
                style={{
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  display: "flex",
                }}
              >
                <small className="live-indicator"></small>
                Live
              </span>
              <span className="w-100">
                <hr
                  style={{
                    borderWidth: "medium",
                    borderColor: "rgb(36 84 38)",
                    borderStyle: "solid",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
