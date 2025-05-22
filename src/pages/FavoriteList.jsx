import React from 'react'
import './FavoriteList.css'
import { Link } from 'react-router-dom';

const FavoriteList = ({ favoriteLists }) => {
  return (
    <div className='fvrt-container'>
      {favoriteLists.length === 0 ? (
        <p className='fvrt-text'>No favorite list found...</p>
      ) : (favoriteLists.map((list, index) => (
        <div key={index} className='fvrt-name'>
          <h2>{list.name}</h2>
          {list.movies.map((movie, i) => (
            <div key={i} className='fvrt-cards'>
              <div className='fvrt-card'>
                <p>{movie.Title || movie.name}</p>
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                >
                  <button className='imdb-btn'>IMDB</button>
                </a>

              </div>
            </div>
          ))}
          <Link to='/'>
            <button className='fvrtc-btn'>back to home page</button>
          </Link>
        </div>
      )))}
    </div>
  )
}

export default FavoriteList