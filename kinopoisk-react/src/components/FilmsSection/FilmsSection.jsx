import "./FilmsSection.css";
// import logo from "../../assets/imgFilmempty.jpg";
import Button from "../Button/Button";
import { useState } from "react";

export default function FilmsSection({ films }) {
  const [roll, setRoll] = useState(false);

  function rollCardFilm() {
    setRoll((prevRoll) => !prevRoll);
  }

  return (
    <div className="container">
      <div className="films">
        {films.map((film, index) => {
          const kinopoiskId = film.kinopoiskId || index;
          return (
            <div
              className={`film ${roll ? "rolled" : ""}`}
              key={`${kinopoiskId}`}
            >
              <div className="film__front">
                {console.log(film)}
                <img
                  style={{ width: "270px" }}
                  className="film__img"
                  src={film.posterUrlPreview}
                  alt="kino"
                />
                <p className="film__title">{film.nameRu || "Не указано"}</p>
                <p className="film__genre textAlign-left">
                  жанр:{" "}
                  <span className="film__content textAlign-left">
                    {film.genres[0]?.genre || "Не указано"}
                  </span>
                </p>
                <p className="film__year textAlign-left">
                  год релиза: <span className="film__content">{film.year}</span>
                </p>
                <p className="film__desc textAlign-left">
                  рейтинг:{" "}
                  <span className="film__content">{film.ratingKinopoisk}</span>
                </p>
                <Button text="Подробнее" onClick={rollCardFilm} />
              </div>
              <div className="film__back">
                <p className="film__back-title">Дополнительная информация</p>
                <p className="film__back-desc">
                  Здесь можно добавить описание, актеров и другие детали.
                </p>
                <Button text="Назад" onClick={rollCardFilm} />
              </div>
            </div>
          );
        })}
        {/* <div className={`film ${roll ? "rolled" : ""}`} key={`${kinopoiskId}`}>
          <div className="film__front">
            <img className="film__img" src={posterUrl} alt="kino" />
            <p className="film__title">{film.nameRu || "Не указано"}</p>
            <p className="film__genre textAlign-left">
              жанр:{" "}
              <span className="film__content textAlign-left">{film.genres[0]?.genre || "Не указано"}</span>
            </p>
            <p className="film__year textAlign-left">
              год релиза: <span className="film__content">{film.year}</span>
            </p>
            <p className="film__desc textAlign-left">
              рейтинг: <span className="film__content">{film.ratingKinopoisk}</span>
            </p>
            <Button text="Подробнее" onClick={rollCardFilm} />
          </div>
          <div className="film__back">
            <p className="film__back-title">Дополнительная информация</p>
            <p className="film__back-desc">
              Здесь можно добавить описание, актеров и другие детали.
            </p>
            <Button text="Назад" onClick={rollCardFilm} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
