import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/movieCard/MovieCard';
import './movielist.css'
import Loading from '../../components/loader/Loading';

const MovieList = (props) => {

  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  let url = `https://api.themoviedb.org/3/trending/${props.type}/day?page=${page}&api_key=ace3eeed99f6d9d19e61456a520cda0b`;

  const handleScroll = () => {

    try{
      if (document.documentElement.scrollHeight <= (document.documentElement.scrollTop + window.innerHeight + 1)) {
        console.log('You are at the bottom!')
        setLoading(true);
        setPage(prev_page => prev_page + 1);
      }
    }
    catch(error) {
      console.log(error);
    }

  }

  useEffect(() => {

    const getData = async () => {

      await fetch(url).then((response) => response.json()).then((data) => {
        let newData = data.results.filter(
          (movie) => movie?.poster_path !== null && movie?.media_type !== 'person'
        );
        console.log(newData);
        setList(prev => [...prev, ...newData]);
        setError(false);
      }).catch((error) => {
        setError(true);
      })
      setLoading(false);
    }

    getData();
// eslint-disable-next-line
  }, [page , props.type])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    console.log(props.type);

    return () => {
      console.log("Clean Up");
      setList([]);
      document.removeEventListener('scroll', handleScroll);
    }
  } , [props.type])


  return (
    <>
      {error && <h1>Error</h1>}
      
      {/* {console.log(list.length)} */}
      {
        <div className='movie-list-container'>
          <div className='hading'>Trending {props.title && props.title}</div>
          <div className='movie-list'>
            {
              list.map((movie, index) => {
                return (
                  <div className='card' key={index}>
                    <MovieCard movie={movie} />
                  </div>
                )
              })
            }
          </div>
        </div>
      }
      {loading && <Loading />}
    </>
  )
}

export default MovieList