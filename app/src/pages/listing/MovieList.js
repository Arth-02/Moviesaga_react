import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import "./movielist.css";
import Loading from "../../components/loader/Loading";

const MovieList = (props) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  let url = `https://api.themoviedb.org/3/trending/${props.type}/day?page=${page}&api_key=ace3eeed99f6d9d19e61456a520cda0b`;

  const handleScroll = () => {
    try {
      if (
        document.documentElement.scrollHeight <=
          document.documentElement.scrollTop + window.innerHeight + 1 &&
        !loading &&
        page < totalPages // Check if there are more pages left to fetch
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    setLoading(true);

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newData = data.results.filter(
          (movie) =>
            movie?.poster_path !== null && movie?.media_type !== "person"
        );
        console.log(newData);
        setList((prev) => [...prev, ...newData]);
        setTotalPages(data["total_pages"]);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      });
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => {
      console.log("Clean Up");
      document.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    setList([]);
    setPage(1);
    setTotalPages(0);
    page===1 && getData();
    // eslint-disable-next-line
  }, [props.type]);

  return (
    <>
      {error && <h1>Error</h1>}

      {/* {console.log(list.length)} */}
      {
        <div className="movie-list-container">
          <div className="hading">Trending {props.title && props.title}</div>
          <div className="movie-list">
            {list.map((movie, index) => {
              return (
                <div className="card" key={index}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </div>
        </div>
      }
      {loading && <Loading />}
    </>
  );
};

export default MovieList;
