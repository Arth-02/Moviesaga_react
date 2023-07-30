import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
// import './tv.css';


const Tv = () => {

    const params = useParams();

    const [movie , setMovie] = useState(null);

    const image_url = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

    useEffect(() => {
        const getMovieDetails = async () => {
            await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=ace3eeed99f6d9d19e61456a520cda0b`).then((response) => response.json()).then((data) => {
                console.log(data);
                setMovie(data);
            }).catch((error) => console.log(error));

            console.log("Tv useEffect");
        }
        getMovieDetails();
    },[params.id])

  return (
    <>
        {movie && <section className='movie-page'>
            <div className='movie-box' style={{backgroundImage : `url(${image_url + movie.backdrop_path})`}}>
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

export default Tv