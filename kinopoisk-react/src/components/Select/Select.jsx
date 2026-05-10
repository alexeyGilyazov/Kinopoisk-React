import { useEffect, useState } from "react";

export default function Select() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [allGenres, setAllGenres] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getGenresOption();
  }, []);

  return (
    <>
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}{" "}
      <select name="" id="">
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
    </>
  );
}
