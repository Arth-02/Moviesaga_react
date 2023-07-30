import React from 'react';
import {useParams} from 'react-router-dom';
import './movie.css';
import useFetchData from '../../hooks/useFetchData';


const Movie = () => {

    const params = useParams();

    const {data , error , loading} = useFetchData(`https://api.themoviedb.org/3/movie/${params.id}?api_key=ace3eeed99f6d9d19e61456a520cda0b`);

    const image_url = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  return (
    <>
        {data && <section className='movie-page'>
            <div className='movie-box' style={{backgroundImage : `url(${image_url + data.backdrop_path})`}}>
                <div className='background'>
                    <div className='movie-info'>
                        <h1>ABC</h1>   
                    </div>
                </div>
            </div>
        </section>}
    </>
  )
}

export default Movie