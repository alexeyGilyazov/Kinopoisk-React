import { useState, useCallback } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Navigation from '../NavigationSection/Navigation';
import { genres } from '../../../data'
import './Header.css'
import logo from '../../assets/logo.svg';


export default function Header({ onSearch }) {

    const [valueInput, setValueInput] = useState('')
    const [choiseGenre, setChoiseGenre] = useState('Боевик')
    const [saveFilm, setSaveFilm] = useState('')

    function handleInputChange(event) {
        setValueInput(event.target.value)
    }

    function searchFilm(event) {
        event.preventDefault()
        const saveValue = valueInput
        setSaveFilm(saveValue)
        onSearch(saveValue)
        setValueInput('')
    }
    const getGenre = useCallback((genre) => {
        setChoiseGenre(genre.genreName);
    }, []);

    return (
        <header>
            <div className="container">
                <div className="header">
                    <img style={{ width: '450px' }} src={logo} alt="logo" />
                    <Navigation genres={genres} onGenreSelect={getGenre} />
                    <form>
                        <Input handleInputChange={handleInputChange} valueInput={valueInput} placeholder='Введите название' />
                        <Button searchFilm={searchFilm} text='Поиск' disabled={valueInput.trim().length === 0} />
                    </form>
                </div>
                <p>Выбранный жанр: {choiseGenre}</p>
                <p>Введенный фильм: {saveFilm}</p>
            </div>
        </header>
    )
}