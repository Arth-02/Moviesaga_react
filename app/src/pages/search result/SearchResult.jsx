import React, { useState, useEffect } from "react";
import "./search-result.css";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../components/movieCard/MovieCard";
import '../listing/movielist.css'
import Loading from "../../components/loader/Loading";

const SearchResult = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0); // New state to track the total number of pages

  let [searchParams] = useSearchParams();
  let newSearchTerm = searchParams.get("q");

  useEffect(() => {
    setList([]);
    setPage(1);
    setLoading(true);
    setSearchTerm(newSearchTerm);
  }, [newSearchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/search/multi?api_key=ace3eeed99f6d9d19e61456a520cda0b&&query=${searchTerm}&&page=${page}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data && data["results"].length > 0) {

          let newData = data.results.filter((item) => item?.poster_path !== null && item?.profile_path !== null);

          setList((prevList) => [...prevList, ...newData]);
          setTotalPages(data["total_pages"]); // Set the total number of pages from the API response
          setLoading(false);
          setError(null);
        } else {
          setLoading(false);
          setError("No results found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setError("Something went wrong");
      }
    };

    fetchData();
  }, [searchTerm, page]);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [loading, page, totalPages]);

  return (
    <>
      {error && <div>{error}</div>}
      <div className="search-result movie-list-container">
        <div className="hading">Results for '{searchParams.get("q")}'</div>
        <div className="movie-list">
          {list.length > 0 ? (
            list.map((item, index) => (
              <div className="card" key={index}>
                <MovieCard movie={item} />
              </div>
            ))
          ) : (
            <div className="search-result__no-result">
              <h1>No results found</h1>
            </div>
          )}
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
};

export default SearchResult;
