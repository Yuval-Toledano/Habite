import React, { useState, useEffect } from "react";

export default function ChallengeTimer(props) {
  const { endTime } = props;

  const calculateTimeLeft = () => {
    let endDate = new Date(endTime.seconds * 1000);
    let nowDate = new Date();

    let difference = endDate - nowDate;
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        <span style={{color:"#E71C7D", fontSize: "20px"}}>{timeLeft[interval]}</span> {interval}{" "}
      </span>
    );
  });

  return (
    <div>
    {timerComponents.length ? timerComponents : <span>Time's up!</span>}
 </div> 
  );
}
