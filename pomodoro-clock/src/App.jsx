import { useState, useEffect } from "react";
import "./App.css";
import { DisplayState } from "./helpers";
import TimeSetter from "./TimeSetter";
import Display from "./Display";
import AlarmSound from "./assets/AlarmSound.mp3";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const defaultDisplayState = {
    ...DisplayState, // Merge with DisplayState object
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  };
  const [displayState, setDisplayState] = useState(defaultDisplayState);

  useEffect(() => {
    let timerID = 0;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep");
      if (audio instanceof HTMLAudioElement) {
        audio.currentTime = audio.duration - 8;
        audio.play().catch((err) => console.log(err));
      }

      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState.time, breakTime, sessionTime]);

  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      ...defaultDisplayState,
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });
  
    const audio = document.getElementById("beep");
    if (audio instanceof HTMLAudioElement) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  

  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  const startStop = (DisplayState) => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  const changeBreakTime = (time) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  const changeSessionTime = (time) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      ...displayState,
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <>
      <div className="clock">
        <h1>Pomodoro clock</h1>
        <div className="setters">
          <div className="break">
            <h4 id="break-label">Break Lenght</h4>
            <TimeSetter
              time={breakTime}
              setTime={changeBreakTime}
              min={min}
              max={max}
              interval={interval}
              type="Break"
            />
          </div>
          <div className="session">
            <h4 id="session-label">Session Length</h4>
            <TimeSetter
              time={sessionTime}
              setTime={changeSessionTime}
              min={min}
              max={max}
              interval={interval}
              type="Session"
            />
          </div>
        </div>
        <Display
          displayState={displayState}
          reset={reset}
          startStop={startStop}
        />
        <audio src={AlarmSound} id="beep" />
      </div>
    </>
  );
}

export default App;
