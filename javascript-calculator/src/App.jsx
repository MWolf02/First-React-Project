import React, { useState } from "react"; // Importing React and useState hook from React library
import "./App.css"; // Importing CSS file for styling

function App() {
  const [answer, setAnswer] = useState(""); // Initializing state for answer with useState hook
  const [expression, setExpression] = useState(""); // Initializing state for expression with useState hook
  const et = expression.trim(); // Trimming the expression

  const isOperator = (symbol) => { // Function to check if the symbol is an operator
    return /[*/+-]/.test(symbol); // Using regular expression to check if the symbol is an operator
  };

  const buttonPress = (symbol) => { // Function to handle button press
    if (symbol === "clear") { // If the symbol is "clear"
      setAnswer(""); // Clearing the answer
      setExpression("0"); // Resetting the expression to "0"
    } else if (symbol === "negative") { // If the symbol is "negative"
      if (answer === "") return; // If answer is empty, return
      setAnswer( // Setting the answer based on the condition
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") { // If the symbol is "percent"
      if (answer === "") return; // If answer is empty, return
      setAnswer((parseFloat(answer) / 100).toString()); // Calculating percentage and setting the answer
    } else if (isOperator(symbol)) { // If the symbol is an operator
      setExpression(et + " " + symbol + " "); // Adding the operator to the expression
    } else if (symbol === "=") { // If the symbol is "="
      calculate(); // Calling the calculate function
    } else if (symbol === "0") { // If the symbol is "0"
      if (expression.charAt(0) !== "0") { // If expression does not start with "0"
        setExpression(expression + symbol); // Adding "0" to the expression
      }
    } else if (symbol === ".") { // If the symbol is "."
      const lastNumber = expression.split(/[-+/*]/g).pop(); // Getting the last number in the expression
      if (!lastNumber) return; // If no last number, return
      if (lastNumber.includes(".")) return; // If last number already contains ".", return
      setExpression(expression + symbol); // Adding "." to the expression
    } else { // For other symbols
      if (expression.charAt(0) === "0") { // If expression starts with "0"
        setExpression(expression.slice(1) + symbol); // Removing "0" and adding the symbol to the expression
      } else { // For other cases
        setExpression(expression + symbol); // Adding the symbol to the expression
      }
    }
  };

  const calculate = () => { // Function to calculate the expression
    if (isOperator(et.charAt(et.length - 1))) return; // If last character is an operator, return
    const parts = et.split(" "); // Splitting the expression into parts
    const newParts = []; // Initializing an array for new parts

    for (let i = parts.length - 1; i >= 0; i--) { // Looping through parts backwards
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) { // If current part is an operator and previous part is also an operator
        newParts.unshift(parts[i]); // Adding current part to the beginning of new parts array
        let j = 0; // Initializing variable j
        let k = i - 1; // Initializing variable k
        while (isOperator(parts[k])) { // While previous parts are operators
          k--; // Decrementing k
          j++; // Incrementing j
        }
        i -= j; // Updating i based on j
      } else { // For other cases
        newParts.unshift(parts[i]); // Adding current part to the beginning of new parts array
      }
    }
    const newExpression = newParts.join(" "); // Joining new parts to form new expression
    if (isOperator(newExpression.charAt(0))) { // If first character of new expression is an operator
      setAnswer(eval(answer + newExpression).toString()); // Evaluating the expression and setting the answer
    } else { // For other cases
      setAnswer(eval(newExpression).toString()); // Evaluating the expression and setting the answer
    }
    setExpression(""); // Resetting the expression
  };

  return (
    <> {/* Fragment for wrapping multiple children */}
      <div className="container"> {/* Container for calculator */}
        <h1>Calculator Application</h1> {/* Heading */}
        <div id="calculator"> {/* Calculator display */}
          <div id="display" style={{ textAlign: "right" }}> {/* Display section */}
            <div id="answer">{answer}</div> {/* Answer display */}
            <div id="expression">{expression}</div> {/* Expression display */}
          </div>
          {/* Buttons for calculator operations */}
          <button
            id="clear"
            onClick={() => buttonPress("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => buttonPress("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => buttonPress("percent")}
            className="light-gray"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => buttonPress("/")}
            className="green"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => buttonPress("7")}
            className="darkgray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => buttonPress("8")}
            className="darkgray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => buttonPress("9")}
            className="darkgray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => buttonPress("*")}
            className="green"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => buttonPress("4")}
            className="darkgray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => buttonPress("5")}
            className="darkgray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => buttonPress("6")}
            className="darkgray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => buttonPress("-")}
            className="green"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => buttonPress("1")}
            className="darkgray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => buttonPress("2")}
            className="darkgray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => buttonPress("3")}
            className="darkgray"
          >
            3
          </button>
          <button id="add" onClick={() => buttonPress("+")} className="green">
            +
          </button>
          <button
            id="zero"
            onClick={() => buttonPress("0")}
            className="darkgray"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => buttonPress(".")}
            className="darkgray"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => buttonPress("=")}
            className="green"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App; // Exporting the App component
