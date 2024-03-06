import React, { useEffect, useState } from "react"; // Importing necessary modules from React for creating components with hooks
import "./App.css"; // Importing the CSS file for styling the component
import TwitterIcon from "./icon.svg"; // Importing the Twitter icon image file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon component from FontAwesome library
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"; // Importing the faQuoteLeft icon from the FontAwesome library

function App() {
  const [quote, setQuote] = useState(""); // Initializing state variable 'quote' and its setter function using the useState hook
  const [author, setAuthor] = useState(""); // Initializing state variable 'author' and its setter function using the useState hook

  useEffect(() => { fetchQuote(); }, []); // Using the useEffect hook to perform side effects in the component. Calling the fetchQuote function when the component mounts

  const fetchQuote = async () => { // Defining an asynchronous function fetchQuote
    const url = "https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1"; // Defining the URL for fetching quotes from the API
    const options = { method: "GET", headers: { "X-RapidAPI-Key": "1bb2e5e5a5msh8c3fcf17d45c517p1dc9acjsneb6a55bcdcbc", "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com", }, }; // Defining options for the fetch request

    try { const response = await fetch(url, options); // Fetching data from the API using the defined URL and options
      const data = await response.json(); // Parsing the response data as JSON
      setQuote(data[0].quote); // Setting the quote state with the fetched quote
      setAuthor(data[0].author); // Setting the author state with the fetched author
    } catch (error) { console.error(error); } // Catching and logging any errors that occur during the fetch
  };

  const handleNewQuote = () => { fetchQuote(); }; // Defining a function handleNewQuote to fetch a new quote. Calling the fetchQuote function to fetch a new quote

  return ( // Returning the JSX representing the component
    <div className="App" id="quote-box"> {/* Wrapper element for the quote box */}
      <div className="quote-text"> {/* Wrapper for the quote text */}
        <FontAwesomeIcon icon={faQuoteLeft} /> {/* Adding the FontAwesome icon for the quote */}
        <p id="text">{quote}</p> {/* Displaying the fetched quote */}
      </div>
      <p id="author">- {author}</p> {/* Displaying the fetched author */}
      <div className="buttons"> {/* Wrapper for the buttons */}
        <button id="new-quote" onClick={handleNewQuote}>New Quote</button> {/* Button to fetch a new quote */}
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} target="_blank" rel="noopener noreferrer"> {/* Anchor tag for tweeting the quote */}
          <img className="tweet-icon" src={TwitterIcon} alt="search"></img> {/* Displaying the Twitter icon */}
        </a>
      </div>
    </div>
  );
}

export default App; // Exporting the App component as the default export

// Summary:
// This component fetches a random famous quote and its author from an external API on initial render.
// It displays the quote and author, along with a "New Quote" button to fetch a new quote.
// The "Tweet Quote" button allows users to share the current quote on Twitter.
// Key takeaways:
// - Using useState and useEffect hooks for managing state and performing side effects.
// - Fetching data from an external API using async/await and the fetch API.
// - Using FontAwesome icons and SVG images for visual elements.
// - Creating reusable components for a simple quote machine application.
