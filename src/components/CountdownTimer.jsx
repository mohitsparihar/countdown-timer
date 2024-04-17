import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  console.log(targetDate);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }

    timerComponents.push(
      <div key={index} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <strong>
            <span>{timeLeft[interval]}</span>
          </strong>
          {index < Object.keys(timeLeft).length - 1 && (
            <span style={{ marginLeft: "20px" }}>:</span>
          )}
        </div>
        <span style={{ fontSize: "1.1rem" }}>{interval.toUpperCase()}</span>
      </div>
    );
  });

  return (
    <div className="time-remaining">
      <div className="flex align-items-center justify-content-evenly subHeader">
        <span style={{ paddingLeft: "1rem", width: "70%" }}>
          <hr style={{ borderWidth: "medium" }} />
        </span>
        <span
          className="w-100"
          style={{ fontSize: "1.2rem", padding: "0 5px" }}
        >
          Est.Time Remianing
        </span>
        <span style={{ paddingRight: "1rem", width: "70%" }}>
          <hr style={{ borderWidth: "medium" }} />
        </span>
      </div>
      {timerComponents.length ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "70%",
            margin: "0 auto",
          }}
        >
          {timerComponents.map((el, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              {el}
            </div>
          ))}
        </div>
      ) : (
        <strong>
          <span>Time&apos;s up!</span>
        </strong>
      )}
      <div style={{ padding: "0 1rem" }}>
        <hr
          style={{
            borderWidth: "medium",
            borderColor: "rgb(36 84 38)",
            borderStyle: "solid",
          }}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;

CountdownTimer.propTypes = {
  targetDate: PropTypes.string,
};
