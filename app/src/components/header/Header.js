import React, { useState, useContext, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Account from "../account/Account";
import { MyContext } from "../../MyContext";
import "./header.css";
import { Button } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import Loading from "../loader/Loading";

const Header = () => {
  const { isAuthenticated } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [list, setList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleSearch = (e) => {
    if (searchTerm === e.target.value && e.key !== "Enter") {
      return;
    }
    setLoading(true);
    setSearchTerm(e.target.value);
    if ((e.key === "Enter" || e.button === 0) && searchTerm) {
      setSearchTerm(null);
      setLoading(false);
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ q: searchTerm.trim() })}`,
      });
    }
  };

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=ace3eeed99f6d9d19e61456a520cda0b&&query=${searchTerm}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newData = data.results.filter(
          (movie) => movie.poster_path !== null && movie?.profile_path !== null
        );
        let topresults = newData.slice(0, 5);
        setList(topresults);
        setLoading(false);
      });
  };

  useEffect(() => {
    const delay = 500;
    const debounce = setTimeout(() => {
      fetchData();
    }, delay);

    return () => clearTimeout(debounce);
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <>
      <header className="header">
        <div className="logo">
          <h3>
            <Link to={".."}>MovieSaga</Link>
          </h3>
        </div>
        <div className="navtabs">
          <span>
            <Link
              to={".."}
              className={location.pathname === "/" ? "active tabs" : "tabs"}
            >
              Home
            </Link>
          </span>
          <span>
            <Link
              to={"/trending/movie"}
              className={
                location.pathname === "/trending/movie" ? "active tabs" : "tabs"
              }
            >
              Movies
            </Link>
          </span>
          <span>
            <Link
              to={"/trending/tv"}
              className={
                location.pathname === "/trending/tv" ? "active tabs" : "tabs"
              }
            >
              Tv Shows
            </Link>
          </span>
          <span>
            <Link
              to={".."}
              className={
                window.pathname === "/categories" ? "active tabs" : "tabs"
              }
            >
              Categories
            </Link>
          </span>
          <span>
            <Link
              to={"/trending/all"}
              className={
                location.pathname === "/trending/all" ? "active tabs" : "tabs"
              }
            >
              Trending
            </Link>
          </span>
        </div>
        <div className="right-navbar">
          <div className="search-box">
            <IconButton
              color="inherit"
              className="search-icon"
              label="hidden"
              onClick={handleSearch}
            >
              {" "}
              <SearchIcon />{" "}
            </IconButton>
            <input
              type="text"
              className="search-input"
              placeholder="Search.... "
              name="Search"
              onFocus={() => setShowPreview(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowPreview(false);
                }, 250);
              }}
              onKeyUp={handleSearch}
            />
            {searchTerm && showPreview && <SearchPreview list={list} loading={loading} />}
          </div>
          <div className="user-panel">
            <div className="liked-movies">
              {" "}
              <IconButton color="inherit">
                {" "}
                <FavoriteBorderIcon />{" "}
              </IconButton>{" "}
            </div>

            {isAuthenticated ? (
              <Account />
            ) : (
              <Button variant="text" color="inherit">
                <Link to={"/login"}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const SearchPreview = ({ list, loading }) => {
  const image_url = "https://image.tmdb.org/t/p/w154";

  return (
    <div className="search-preview">
      {loading ? (
        <div className="loading-wrapper" style={{width: '100%' , height: '175px' , display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
          <Loading />
        </div>
      ) : list.length <= 0 ? (
        <span style={{width: '100%' , height: '175px' , display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>No results found</span>
      ) : (
        list.map((result, index) => {
          return (
            <Link to={ '/' + result.media_type + '/' + result.id} className="search-preview-item" key={index}>
              <div className="search-preview-image">
                <img
                  src={result.poster_path ? image_url + result.poster_path : image_url + result.profile_path}
                  alt="search-preview-result"
                />
              </div>
              <div className="search-preview-description">
                <div className="search-preview-title">{result.title || result.name}</div>
                  <div className="search-preview-date">{result.release_date?.slice(0,4) || result.first_air_date?.slice(0,4)}</div>
                <div className="search-preview-section">
                  <div className="search-preview-rating"><StarIcon sx={{fontSize: '0.8rem' , padding: '0px'}}/>{ result.media_type !== 'person' ? parseFloat(result.vote_average).toFixed(2) : parseFloat(result.popularity).toFixed(2)}</div>
                  <div className="search-preview-dot"></div>
                  <div className="search-preview-type">{result.media_type?.charAt(0).toUpperCase() + result.media_type?.slice(1)}</div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
