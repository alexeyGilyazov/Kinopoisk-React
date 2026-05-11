import "./App.css";
import Header from "./components/Header/Header";
import FilmsSection from "./components/FilmsSection/FilmsSection";
import Loading from "./components/Loading/Loading";
import { useState, useEffect } from "react";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc"); // состояние порядка сортировки

  async function searchMoviesByTitle(query) {
    setLoading(true);
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
      setLoading(false);
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
    try {
      setLoading(true);
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
      setLoading(false);
      setFilms(data.items || []);
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  }

  // Обработка изменения порядка сортировки
  function handleChangeSortDirection(newDirection) {
    setSortDirection(newDirection);
  }

  // Эффект для сортировки фильмов при изменении sortDirection
  useEffect(() => {
    setFilms((prevFilms) => {
      const sortedFilms = [...prevFilms].sort((a, b) => {
        if (sortDirection === "asc") {
          return a.year - b.year;
        } else {
          return b.year - a.year;
        }
      });
      return sortedFilms;
    });
  }, [sortDirection]);

  // Изначально грузим жанр
  useEffect(() => {
    searchMoviesByGenre(1);
  }, []);

  return (
    <>
      <Header
        onSearch={searchMoviesByTitle}
        onGenreSelect={searchMoviesByGenre}
        onSortDirectionChange={handleChangeSortDirection}
        sortDirection={sortDirection}
      />
      {!loading ? <FilmsSection films={films} /> : <Loading />}
    </>
  );
}

export default App;
