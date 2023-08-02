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
import Loading from "../loader/Loading";

const Header = () => {
  const { isAuthenticated } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [loading , setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  const handleSearch = (e) => {
    setLoading(true);
    setSearchTerm(e.target.value);
    if ((e.key === "Enter" || e.button === 0) && searchTerm) {
      setSearchTerm(null);
      setLoading(false);
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({ q: searchTerm })}`,
      });
    }
  };

  const [list, setList] = useState([]);

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=ace3eeed99f6d9d19e61456a520cda0b&&query=${searchTerm}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data : ", data['results']);
        let topresuls = data["results"].slice(0, 6);
        setList(topresuls);
        setLoading(false);
        console.log("List : ", list);
      });
  };

  useEffect(() => {
    const delay = 1000;
    const timeoutId = setTimeout(() => {
      fetchData();
    }, delay);

    return () => clearTimeout(timeoutId);
  } , [searchTerm])

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
              // onChange={(e) => {
              //   setSearchTerm(e.target.value);
              // }}
              // onKeyUp={handleSearch}
              onChange={handleSearch}
            />
            {searchTerm && <SearchPreview list={list} loading={loading}/>}
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
                {" "}
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

const SearchPreview = ({ list , loading }) => {
  return (
    <div className="search-preview">
      {loading ? <Loading /> : 
      list.length > 0 &&
      list.map((result) => {
        return <span>{result.title || result.name}</span>; 
      })}
      {}
    </div>
  );
};
