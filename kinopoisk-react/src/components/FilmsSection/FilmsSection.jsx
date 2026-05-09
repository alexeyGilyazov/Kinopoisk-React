import "./FilmsSection.css";

export default function FilmsSection({ films }) {
  return (
    <div className="container">
      <div className="films">
        {films.map((film) => (
          <div className="film" key={film.kinopoiskId}>
            <img
              style={{ width: "130px" }}
              src={film.posterUrlPreview}
              alt="img"
            />
            <p className="film__title">{film.nameRu}</p>
            <p className="film__genre">Жанр:{film.genres[0].genre}</p>
            <p className="film__year">Год релиза {film.year}</p>
            <p className="film__desc">Рейтинг {film.ratingKinopoisk}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
