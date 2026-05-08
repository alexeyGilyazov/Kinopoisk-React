import './FilmsSection.css'

export default function FilmsSection({ films }) {

    return (
        <div className="container">
            <div className="films">
                {films.map((film) => (
                    <div className="film" key={film.filmId}>
                        <img style={{ width: '130px' }} src={film.posterUrlPreview} alt="img" />
                        <p className='film__title'>{film.nameRu}</p>
                        <p className="film__genre">Жанр:{film.genres[0].genre}</p>
                        <p className="film__year">Год релиза {film.year}</p>
                        <p className="film__desc">Описание {film.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
