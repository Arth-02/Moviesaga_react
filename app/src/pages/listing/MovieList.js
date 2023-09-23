import React, { useEffect, useState , useContext } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import "./movielist.css";
import Loading from "../../components/loader/Loading";

import Filter from "../../components/filter/Filter";

import Fab from "@mui/material/Fab";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import GeneralModal from "../../components/generalModal/GeneralModal";

import WindowSizeContext from "../../contexts/windowSize/WindowSize";

const MovieList = (props) => {

  const {windowSize} = useContext(WindowSizeContext);

  const [selectedItems , setSelectedItems] = useState([]);
  
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [filters , setFilters] = useState({
    with_original_language: '',
    sort_by: 'popularity.desc',
    with_genres: [],
    "release_date.gte": '',
    "release_date.lte": '',
  });
  const [selectedGenres, setSelectedGenres] = useState(filters.with_genres);

  let url = `https://api.themoviedb.org/3/discover/${props.type}?include_adult=false&include_video=false&language=en-US&page=${page}&api_key=ace3eeed99f6d9d19e61456a520cda0b`;


  if(props.type === 'all'){
    url = `https://api.themoviedb.org/3/trending/all/day?page=${page}&api_key=ace3eeed99f6d9d19e61456a520cda0b`
  }

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
    url = handleFilter();
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

  const handleFilter = () => {
    // url += `&language=${filters.language}&sort_by=${filters.sort_by}&with_genres=${filters.with_genres.join(',')}&release_date.gte=${filters["release_date.gte"]}&release_date.lte=${filters["release_date.lte"]}`;
      
    if(filters.with_original_language !== ''){
      console.log(filters.with_original_language);
      url += `&with_original_language=${filters.with_original_language}`;
    }
    if(filters.sort_by !== 'popularity.desc'){
      url += `&sort_by=${filters.sort_by}`;
    }
    if(filters?.with_genres?.length > 0){
      url += `&with_genres=${filters.with_genres}`;
    }
    if(filters["release_date.gte"] !== ''){
      url += `&release_date.gte=${filters["release_date.gte"]}`;
    }
    if(filters["release_date.lte"] !== ''){
      url += `&release_date.lte=${filters["release_date.lte"]}`;
    }
    
    return url;
  }

  useEffect(() => {
    setList([]);
    setPage(1);
    getData();
  } , [filters])

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
  }, [loading , page, totalPages]);

  useEffect(() => {
    setList([]);
    setTotalPages(0);
    // setPage(1);
    setFilters({
      with_original_language: '',
      sort_by: 'popularity.desc',
      with_genres: [],
      "release_date.gte": '',
      "release_date.lte": '',
    })

    // eslint-disable-next-line
  }, [props.type]);

   // Functions For Modal
   const [modalopen, setModalOpen] = useState(false);
   const handleModalOpen = () => setModalOpen(true);
   const handleModalClose = () => setModalOpen(false);

  return (
    <>
      <GeneralModal open={modalopen} handleClose={handleModalClose}>
        <Filter setList={setList} setFilters={setFilters} filters={filters} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      </GeneralModal>
      {error && <h1>Error</h1>}
      {windowSize[0] < 1024 && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: "25px", right: "25px" }}
          onClick={handleModalOpen}
        >
          <FilterAltIcon />
        </Fab>
      )}
      
      {
        <div className="movie-list-container">
          <div className="hading" id="back-to-top-anchor">
            Trending {props.title && props.title}
          </div>
            <div className="selected-item-section">
              {
                selectedItems?.map((item , index) => (
                  <div className="selected-item" key={index}>
                    {item}
                  </div>
                ))
              }
            </div>
          <div className="movie-list">
            <div className="movie-list-col1">
              <Filter setList={setList} setFilters={setFilters} filters={filters} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            </div>
            <div className="movie-list-col2">
              {list?.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      }
      {loading && <Loading />}
    </>
  );
};

export default MovieList;
