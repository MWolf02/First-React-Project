import React, { useEffect, useState } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

import "./App.css";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2495c5ef";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div>
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
