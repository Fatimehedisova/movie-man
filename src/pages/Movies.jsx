import React, { useEffect, useState } from 'react'
import './Movies.css'
import { X } from 'lucide-react';
import myFavMovies from '../data/movies.json';
import { Link } from 'react-router-dom';
const Movies = ({ favoriteLists, setFavoriteLists }) => {

    const [movies, setMovies] = useState([]);
    const [text, setText] = useState('');
    const [apiIsRunning, setApiIsRunning] = useState(false)
    const [favorites, setFavorites] = useState([])
    const [listText, setListText] = useState('');
    const [listSubmitted, setListSubmitted] = useState(false)
    useEffect(() => {
        setMovies(myFavMovies);
        setApiIsRunning(false);
        setFavoriteLists([]);
    }, [])
    async function searchMovies() {
        if (!text.trim()) return;
        const url = `http://www.omdbapi.com/?s=${text}&apikey=d29e49b4`
        const res = await fetch(url)
        const data = await res.json()
        if (data.Search) {
            setMovies(data.Search)
            setApiIsRunning(true)
        }
        else {
            setMovies([])
            setApiIsRunning(true)
        }
    }
    const addFavorites = (movie) => {
        if (!favorites.find(data => (data.imdbID || data.id) === (movie.imdbID || movie.id)))
            setFavorites([...favorites, movie]);
    }
    const removeFavorites = (movie) => {
        setFavorites(favorites.filter(data => (data.imdbID || data.id) !== (movie.imdbID || movie.id)))
    }
    const isFavorited = (movie) => {
        return favorites.find(data => (data.imdbID || data.id) === (movie.imdbID || movie.id))
    }
   const addToFavoriteList = () => {
    if (listText.trim()) {
        setFavoriteLists([...favoriteLists, { name: listText, movies: favorites }]);
        setFavorites([]);
        setListText('');
        setListSubmitted(true)
    }
}

    return (
        <>
            <div>
                <header>
                    <h1>MOVIE-MAN</h1>
                </header>
                <div className="search">
                    <input type="text" placeholder='search' value={text} onChange={(e) => setText(e.target.value)} />
                    <button onClick={searchMovies}>Search</button>
                </div>
                <div className="container">
                    <div className="movie-list">

                        {movies.length > 0 ? (
                            movies.map((movie, index) => (
                                <div key={index} className='movie-card'>
                                    <img src={(movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : movie.image} alt={movie.Title || movie.name} />
                                    <div className="movie-card-box">
                                        <h3>{movie.Title || movie.name}</h3>
                                        <p>Year: {movie.Year || movie.year}</p>
                                        <button className={isFavorited(movie) || listSubmitted ? "favorited" : "favorite"}
                                            disabled={!!isFavorited(movie) || listSubmitted} onClick={() => addFavorites(movie)}>Favorite</button>
                                    </div>
                                </div>
                            ))
                        ) : (<p>{apiIsRunning ? 'Film tapılmadı' : 'Heç bir film yoxdur'}</p>)}
                    </div>
                    <div className='favorite-container'>
                        <div className="favorites-list">
                            {favorites.map((movie, index) => (
                                <div key={index} className='favorite-items'>
                                    <div className="favorite-text">
                                        <h3>{movie.Title || movie.name}</h3>
                                        <button className='remove-btn' onClick={() => { removeFavorites(movie) }}>
                                            <X />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="btns">
                            <input type="text" className='favorites-list-input' value={listText} onChange={(e) => setListText(e.target.value)} disabled={listSubmitted} />
                            <button className={listSubmitted ? 'favorited-list-btn': 'favorite-btn'} onClick={addToFavoriteList} disabled={listSubmitted}>Add favorite list</button>
                            <Link to='/favorite-list'>
                                <button className={listSubmitted? 'favorite-list-btn':'favorited-list-btn'} disabled={!listSubmitted}>Favorite List</button>
                            </Link>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Movies