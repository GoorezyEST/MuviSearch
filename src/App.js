import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
// API KEY 7653d555

const API_URL = "https://www.omdbapi.com?apikey=7653d555";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <div className="app">
      <h1>MuviSerch</h1>
      <div className="search">
        <input
          id="inputField"
          placeholder="Search for movies ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") searchMovies(searchTerm);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <span>No movies found.</span>
          <h2>Enter above the movie title you wanna search.</h2>
        </div>
      )}
    </div>
  );
};

export default App;
