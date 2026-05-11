import { useState, useCallback } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Navigation from "../NavigationSection/Navigation";
import Select from "../Select/Select";
import { genres } from "../../../data";
import "./Header.css";
import logo from "../../assets/logo.svg";

export default function Header({
  onSearch,
  onGenreSelect,
  onSortDirectionChange,
  sortDirection,
}) {
  const [valueInput, setValueInput] = useState("");
  const [choiseGenre, setChoiseGenre] = useState(1);

  function handleInputChange(event) {
    setValueInput(event.target.value);
  }

  function searchFilm(event) {
    event.preventDefault();
    onSearch(valueInput);
    setValueInput("");
  }

  const getGenre = useCallback(
    (genre) => {
      setChoiseGenre(genre.id);
      onGenreSelect(genre.id);
    },
    [onGenreSelect],
  );

  return (
    <header>
      <div className="container">
        <div className="header">
          <img style={{ width: "450px" }} src={logo} alt="logo" />
          <Navigation genres={genres} onGenreSelect={getGenre} />
          <form onSubmit={searchFilm}>
            <Input
              handleInputChange={handleInputChange}
              valueInput={valueInput}
              placeholder="Введите название"
            />
            <Button
              searchFilm={searchFilm}
              text="Поиск"
              disabled={valueInput.trim().length === 0}
            />
          </form>
        </div>
        <div className="iteractions">
          <Select onGenreChange={onGenreSelect} text="Поиск по жанру" />
          <div className="sort">
            <p>Сортировка по году</p>
            {/* селект для выбора порядка */}
            <select
              value={sortDirection}
              onChange={(e) => onSortDirectionChange(e.target.value)}
            >
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
            {/* кнопка, показывающая текущий порядок с стрелкой */}
            <Button
              text={`Сортировать ${sortDirection === "asc" ? "↑" : "↓"}`}
              onClick={() => onSortDirectionChange(sortDirection)} // ничего не делает, можно убрать или оставить
            />
          </div>
        </div>
      </div>
    </header>
  );
}
