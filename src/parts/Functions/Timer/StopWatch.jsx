import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css";
import Timer from "./Timer";
import ControlButtons from "./ControlButtons";

function StopWatch(props) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  const prevTimestampRef = useRef(null);
  const pauseAccumulatedRef = useRef(0);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("stopWatchIsActive", isActive.toString());
      localStorage.setItem("stopWatchIsPaused", isPaused.toString());
      localStorage.setItem("stopWatchElapsedTime", elapsedTime.toString());
      localStorage.setItem("stopWatchPausedTime", pausedTime.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isActive, isPaused, elapsedTime, pausedTime]);

  useEffect(() => {
    const savedIsActive = localStorage.getItem("stopWatchIsActive");
    const savedIsPaused = localStorage.getItem("stopWatchIsPaused");
    const savedElapsedTime = localStorage.getItem("stopWatchElapsedTime");
    const savedPausedTime = localStorage.getItem("stopWatchPausedTime");

    setIsActive(savedIsActive === "true");
    setIsPaused(savedIsPaused === "true");
    setElapsedTime(parseInt(savedElapsedTime) || 0);
    setPausedTime(parseInt(savedPausedTime) || 0);
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      prevTimestampRef.current = Date.now() - pausedTime;
      interval = setInterval(() => {
        const currentTimestamp = Date.now();
        const deltaTime = currentTimestamp - prevTimestampRef.current;
        setElapsedTime((prevElapsedTime) => prevElapsedTime + deltaTime);
        prevTimestampRef.current = currentTimestamp;
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, pausedTime]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    prevTimestampRef.current = Date.now();
  };

  const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
    if (!isPaused) {
      pauseAccumulatedRef.current = elapsedTime;
    } else {
      prevTimestampRef.current = Date.now();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setElapsedTime(0);
    setPausedTime(0);
    pauseAccumulatedRef.current = 0;
    localStorage.removeItem("stopWatchIsActive");
    localStorage.removeItem("stopWatchIsPaused");
    localStorage.removeItem("stopWatchElapsedTime");
    localStorage.removeItem("stopWatchPausedTime");
    props.rerender() 
  };

  return (
    <div className="stop-watch">
      <Timer users={props.users} time={isPaused ? pausedTime : elapsedTime} isPaused={isPaused} user={props.user}/>
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}

export default StopWatch;