"use client";

import React from "react";
import { useTimer } from "react-timer-hook";

type TimerProps = {
  expiryTimestamp: Date;
};

const Timer = ({ expiryTimestamp }: TimerProps) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return <div>{`${hours} : ${minutes} : ${seconds}`}</div>;
};

export default Timer;
