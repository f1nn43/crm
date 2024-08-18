import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";
import firebase from 'firebase/compat/app';

export default function Timer({ users, time, isPaused, user}) {
  const [displayTime, setDisplayTime] = useState(formatTime(time));
  const prevTimeRef = useRef(time);
  const isPausedRef = useRef(isPaused);

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
  };

  function postTime(time){
    const updatedUsers = users
    updatedUsers.forEach(us => {
      if(us.uid === localStorage.getItem('uid')){
        us.sessions.push({time: time, date: getCurrentDate()})
      }
    });
    firebase.database().ref('/users').set(updatedUsers);
  }

  useEffect(() => {
    if (isPaused) {
      isPausedRef.current = true;
      if(displayTime !== '00:00:00'){
        postTime(displayTime)
      }
    } else {
      isPausedRef.current = false;
      prevTimeRef.current = time;
      setDisplayTime(formatTime(time));
    }
  }, [time, isPaused]);

  useEffect(() => {
    let interval = null;

    if (!isPausedRef.current) {
      interval = setInterval(() => {
        const currentTimestamp = Date.now();
        const deltaTime = currentTimestamp - prevTimeRef.current;
        const newTime = prevTimeRef.current + deltaTime;
        prevTimeRef.current = currentTimestamp;
        setDisplayTime(formatTime(newTime));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(
      2,
      "0"
    )}`;
  }

  const hours = displayTime.split(':')[0]
  const minutes = displayTime.split(':')[1]
  const seconds = displayTime.split(':')[2]

  return <div className="timer"><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></div>;
}