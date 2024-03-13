import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const TimeSetterProps = {
  time: 0, // Assuming default value is 0
  setTime: () => {}, // Placeholder function
  min: 0, // Assuming default value is 0
  max: 0, // Assuming default value is 0
  interval: 0, // Assuming default value is 0
  type: "Session", // Assuming default value is "Session"
};

const TimeSetter = (props) => {
    const { time, setTime, min, max, interval, type } = props;
  
    return (
      <div>
        <button
          onClick={() => (time > min ? setTime(time - interval) : null)}
          id={`${type.toLowerCase()}-decrement`} 
        >
          <FaArrowDown />
        </button>
        <span id={`${type.toLowerCase()}-length`}>{time / interval}</span> 
        <button
          onClick={() => (time < max ? setTime(time + interval) : null)}
          id={`${type.toLowerCase()}-increment`} 
        >
          <FaArrowUp />
        </button>
      </div>
    );
  };
  
  export default TimeSetter;
