import { FaPlay, FaPause, FaUndo } from "react-icons/fa";
import { DisplayState, formatTime } from "./helpers";

const DisplayProps = {
  displayState: DisplayState,
  reset: () => {},
  startStop: () => {}, // Corrected to match the function signature
};

const Display = ({ displayState, reset, startStop }) => {
  // Corrected to use object destructuring
  return (
    <div 
    className="display"
    style={{
        borderColor: `${displayState.timerRunning ? "orange" : "white"}`
      }}
    >
      <h4 id="timer-label">{displayState.timeType}</h4>
      <span 
      id="time-left" 
      style={{
        borderBottom: `${displayState.timerRunning ? "2px solid orange" : "none"}`
      }}>
        {formatTime(displayState.time)}
      </span>
      <div>
        <button
          id="start_stop"
          onClick={() => {
            startStop(displayState);
          }}
        >
          {displayState.timerRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default Display;
