import React, { useState } from 'react'
import './moviecard.css'
import Checkbox from '@mui/material/Checkbox';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import RatingModal from '../ratingModal/RatingModal';
import img_not_found from '../../accets/img_not_found.jpg';
import {Link} from 'react-router-dom';

const MovieCard = (props) => {

  const image_url = "https://image.tmdb.org/t/p/w500";

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  return (
    <>
      <div className='movie-card'>
        <Link to={(props.movie.title ? '/movie/' : '/tv/')+ props.movie.id}>
          <div className='movie-img'>
            <img loading='lazy' src={props.movie.poster_path !== null ? image_url + props.movie.poster_path : img_not_found} alt='movie-poster'/>
          </div>
        </Link>
        <div className='movie-description'>
          <div className='rating-panel'>
            <div className='rate'>
              <StarIcon sx={{color : '#f5c518'}}/>
              <span>{props.movie.vote_average !== 0 ? parseFloat(props.movie.vote_average).toFixed(1) : 'NA'}</span>
            </div>
            <Checkbox checked={checked} id={`${props.movie.id}`} onChange={handleChange} icon={<StarOutlineIcon color='primary' />} checkedIcon={<StarIcon color='primary'/>} sx={{
              ":hover" : {
                backgroundColor: '#ffffff21',
                borderRadius: 2
              }
            }} />
          </div>
          <Link to={(props.movie.title ? '/movie/' : '/tv/') + props.movie.id}>
            <h4 className='movie-title'>{props.movie.title ? props.movie.title : props.movie.name}</h4>
          </Link>
        </div>
      </div>
      {checked && <RatingModal movie={props.movie} setChecked={setChecked} checked={checked} />}
    </>
  )
}

export default MovieCard