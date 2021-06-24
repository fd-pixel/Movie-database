import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  console.log("movies", movies);
  const [query, setQuery] = useState("");
  useEffect(() => {
    getData(FEATURED_API);
  }, []);

  const getData = (API) => {
    fetch(API)
      .then((response) => response.json())
      .then((response) => setMovies(response.results));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      getData(SEARCH_API + query);
    }
    setQuery("");
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          onChange={(e) => setQuery(e.target.value)}
          id=""
          autoFocus
        />
      </form>
      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
