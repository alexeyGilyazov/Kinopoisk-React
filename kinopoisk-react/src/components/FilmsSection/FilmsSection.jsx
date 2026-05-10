import "./FilmsSection.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function FilmsSection({ films }) {
  const [activeIndex, setActiveIndex] = useState(null);

  function toggleRoll(index) {
    setActiveIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="container">
      <div className="films">
        {films.map((film, index) => {
          const kinopoiskId = film.kinopoiskId || index;

          const isRolled = activeIndex === index;
          return (
            <div
              className={`film ${isRolled ? "rolled" : ""}`}
              key={`${kinopoiskId}`}
            >
              <div className="film__front">
                <img
                  style={{ width: "270px" }}
                  className="film__img"
                  src={film.posterUrlPreview}
                  alt="poster"
                />
                <p className="film__title">{film.nameRu || "Не указано"}</p>

                <p className="film__genre textAlign-left">
                  жанр:{" "}
                  <span className="film__content textAlign-left">
                    {film.genres?.[0]?.genre || "Не указано"}
                  </span>
                </p>

                <p className="film__raiting textAlign-left">
                  рейтинг:{" "}
                  <span className="film__content">{film.ratingKinopoisk}</span>
                </p>

                <p className="film__year textAlign-left">
                  <span className="film__content">{film.year}</span>
                </p>
                <Button
                  className="film__btn"
                  text="Подробнее"
                  onClick={() => toggleRoll(index)}
                />
              </div>

              <div className="film__back">
                <p className="film__back-title">Дополнительная информация</p>
                <p className="film__back-desc">
                  Оригинальное название:{" "}
                  {film.nameOriginal || `Нет информации на сервере`}
                </p>

                <Button
                  className="film__btn"
                  text="Назад"
                  onClick={() => toggleRoll(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
