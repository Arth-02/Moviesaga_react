import React from 'react'
import './castcard.css'

const CastCard = (props) => {
  return (
    <div className="movie-page-cast-card">
        <div className="movie-page-cast-img">
        <img
            src={`https://image.tmdb.org/t/p/w138_and_h175_face/${props.cast.profile_path}`}
            alt="profile_photo"
        />
        </div>
        <div className='movie-page-cast-description'>
          <h4 className='cast-title' > {props.cast.name}</h4>
          <div className='cast-character'>{props.cast.character}</div>
        </div>
    </div>
  )
}

export default CastCard