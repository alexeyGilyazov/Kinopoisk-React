import "./App.css";
import Header from "./components/Header/Header";
import FilmsSection from "./components/FilmsSection/FilmsSection";
import { useState } from "react";

function App() {
  const [films, setFilms] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  async function searchMoviesByTitle(query) {
    if (!apiKey) {
      console.error("проверь апи кей");
      return;
    }
    const url = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(query)}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFilms(data.films || []);
      if (data.films && data.films.length > 0) {
        console.log("good data");
      } else {
        console.log("No films found.");
      }
    } catch (err) {
      console.error("error:", err);
    }
  }

  async function searchMoviesByGenre(genreId) {
    if (!apiKey) {
      console.error("проверь апи ключ");
      return;
    }
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${genreId}&page=1`;
    // const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data.items);
      setFilms(data.items || []);
      if (data.items && data.items.length <= 0) {
        console.log("No films found.");
      }
    } catch (err) {
      console.error("error:", err);
    }
  }

  return (
    <>
      <Header
        onSearch={searchMoviesByTitle}
        onGenreSelect={searchMoviesByGenre}
      />
      <FilmsSection films={films} />
    </>
  );
}

export default App;
