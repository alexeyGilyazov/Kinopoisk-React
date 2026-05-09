import "./Navigation.css";

export default function Navigation({ genres, onGenreSelect }) {
  return (
    <nav className="nav">
      {genres.map((genre) => (
        <a
          href="#"
          className="nav__item"
          onClick={() => onGenreSelect(genre)} // Используем только onGenreSelect
          key={genre.id}
          data-genre={genre.genreName}
        >
          {genre.genreName}
        </a>
      ))}
    </nav>
  );
}
