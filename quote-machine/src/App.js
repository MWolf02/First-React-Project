import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []); // Empty dependency array means this effect runs once after the first render

  const fetchQuote = async () => {
    const url = 'https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1bb2e5e5a5msh8c3fcf17d45c517p1dc9acjsneb6a55bcdcbc',
        'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <div className="App" id="quote-box">
      <p id="text">{quote}</p>
      <p id="author">- {author}</p>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`} target="_blank" rel="noopener noreferrer">Tweet Quote</a>
    </div>
  );
}

export default App;
