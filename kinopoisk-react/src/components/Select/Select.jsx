import { useEffect, useState } from "react";

export default function Select({ onGenreChange, text }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [allGenres, setAllGenres] = useState([]);
  const [error, setError] = useState("");
  const [films, setFilms] = useState([]);

  async function getGenresOption() {
    const url = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": `${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`); // Обработка ошибок
      }

      const data = await response.json();
      setAllGenres(data.genres);
    } catch (err) {
      console.error("Ошибка при загрузке жанров:", err);
      setError(err.message); // Записываем ошибку в состояние
    }
  }

  async function searchByGenreId(genreId) {
    const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${genreId}&page=1`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": `${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const data = await response.json();
      if (data.items.length) {
        setFilms(data.items);
      }
    } catch (err) {
      setError(`${err} это код ошбки `);
    } finally {
      console.log("запрос окончен");
    }
  }

  useEffect(() => {
    getGenresOption();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
      }}
    >
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>} <p>{text}</p>
      <select
        onChange={(event) => {
          const genreId = event.target.value;
          if (onGenreChange) {
            onGenreChange(genreId);
          }
        }}
      >
        {allGenres.length > 0 ? (
          allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))
        ) : (
          <option disabled>Нет доступных жанров</option>
        )}
      </select>
    </div>
  );
}
