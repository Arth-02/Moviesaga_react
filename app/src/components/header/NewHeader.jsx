import useScrollTrigger from "@mui/material/useScrollTrigger";
import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
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
// import { MyContext } from "../../MyContext";
import "./header.css";
import { Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Loading from "../loader/Loading";

import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import CloseIcon from "@mui/icons-material/Close";


import AuthContext from '../../contexts/Auth/AuthContext'; 


// ScrollTop is a functional component that scrolls the page to the top when triggered.
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          top: 90,
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

// Scroll component that elevates when scrolled.
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      backgroundColor: trigger ? "rgb(18,18,18)" : "transparent",
      transition: "background-color 0.2s ease-in-out",
    },
  });
}

const NewHeader = (props) => {
  
  // const { isAuthenticated } = useContext(MyContext);

  const { isAuthenticated} = useContext(AuthContext);


  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [list, setList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [hasMore, setHasMore] = useState(false);

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
          (movie) => movie?.poster_path !== null && movie?.profile_path !== null
        );
        // if(newData.length > 5) setHasMore(true);
        newData.length > 5 ? setHasMore(true) : setHasMore(false);
        let topresults = newData.slice(0, 5);
        setList(topresults);
        setLoading(false);
      });
  };

  useEffect(() => {
    const delay = 500;
    const debounce = setTimeout(() => {
     searchTerm && fetchData();
    }, delay);

    return () => clearTimeout(debounce);
    // eslint-disable-next-line
  }, [searchTerm]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar sx={{backgroundColor: "transparent"}}>
          <div className="header">
            <div className="logo">
              <h3>
                <Link to={".."}>MovieSaga</Link>
              </h3>
            </div>
            <div className="mobile-search">
              <div className="mobile-search-box">
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
                  className="mobile-search-input"
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
                {searchTerm && showPreview && (
                  <SearchPreview
                    list={list}
                    loading={loading}
                    searchTerm={searchTerm}
                    hasMore={hasMore}
                  />
                )}
              </div>
            </div>
            <div className="mobile-user-panel">
                {isAuthenticated ? (
                  <Account />
                ) : (
                  <Button variant="text" color="inherit" 
                    sx={{
                      padding: "0px"
                    }}
                  >
                    <Link to={"/login"} style={{paddingBottom: '0px'}}>Sign In</Link>
                  </Button>
                )}
                <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{display: { md: "none" }  , padding : '0px'}}
            >
              <MenuIcon />
            </IconButton>
              </div>
            <div className="header-wrapper">
              <div className="navtabs">
                <span>
                  <Link
                    to={".."}
                    className={
                      location.pathname === "/" ? "active tabs" : "tabs"
                    }
                  >
                    Home
                  </Link>
                </span>
                <span>
                  <Link
                    to={"/popular/movie"}
                    className={
                      location.pathname === "/popular/movie"
                        ? "active tabs"
                        : "tabs"
                    }
                  >
                    Movies
                  </Link>
                </span>
                <span>
                  <Link
                    to={"/popular/tv"}
                    className={
                      location.pathname === "/popular/tv"
                        ? "active tabs"
                        : "tabs"
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
                      location.pathname === "/trending/all"
                        ? "active tabs"
                        : "tabs"
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
                  {searchTerm && showPreview && (
                    <SearchPreview
                      list={list}
                      loading={loading}
                      searchTerm={searchTerm}
                      hasMore={hasMore}
                    />
                  )}
                </div>
                <div className="user-panel">
                  <div className="liked-movies">
                    {" "}
                    <IconButton color="inherit">
                      {" "}
                      <FavoriteBorderIcon  />{" "}
                    </IconButton>{" "}
                  </div>

                  {isAuthenticated ? (
                    <Account />
                  ) : (
                    <Button variant="text" color="inherit">
                      <Link to={"/login"} style={{paddingBottom: '0px'}} >Sign In</Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AppBar>
      </ElevationScroll>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            maxWidth: "380px",
            width: "100%",
            backgroundColor: "rgb(18,18,18)",
          },
        }}
      >
        <div onClick={handleDrawerToggle}>
          <div className="drawer-logo">
            <h3>
              <Link to={".."}>MovieSaga</Link>
            </h3>
            <IconButton color="inherit">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="drawer-navtabs">
            <Link
              to={"../"}
              className={
                location.pathname === "/"
                  ? "drawer-navs active-drawer-navs"
                  : "drawer-navs"
              }
            >
              <HomeIcon />
              <span>Home</span>
            </Link>
            <Link
              to={"../trending/movie"}
              className={
                location.pathname === "/trending/movie"
                  ? "drawer-navs active-drawer-navs"
                  : "drawer-navs"
              }
            >
              <MovieIcon />
              <span>Trending Movies</span>
            </Link>
            <Link
              to={"../trending/tv"}
              className={
                location.pathname === "/trending/tv"
                  ? "drawer-navs active-drawer-navs"
                  : "drawer-navs"
              }
            >
              <TvIcon />
              <span>Trending TV Shows</span>
            </Link>
            <Link
              to={"../categories"}
              className={
                location.pathname === "/categories"
                  ? "drawer-navs active-drawer-navs"
                  : "drawer-navs"
              }
            >
              <HomeIcon />
              <span>Categories</span>
            </Link>
            <Link
              to={"../trending/all"}
              className={
                location.pathname === "/trending/all"
                  ? "drawer-navs active-drawer-navs"
                  : "drawer-navs"
              }
            >
              <TheatersIcon />
              <span>Trending</span>
            </Link>
          </div>
        </div>
      </Drawer>
      <ScrollTop {...props}>
        {/* <Fab size="small" aria-label="scroll back to top"> */}
        {/* </Fab> */}
        <div className="back-to-top-btn">
          <KeyboardArrowUpIcon />
          <span>Back To Top</span>
        </div>
      </ScrollTop>
    </>
  );
};

export default NewHeader;

const SearchPreview = ({ list, loading, searchTerm, hasMore }) => {
  const image_url = "https://image.tmdb.org/t/p/w154";

  return (
    <div className="search-preview">
      {loading ? (
        <div
          className="loading-wrapper"
          style={{
            width: "100%",
            height: "175px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : list.length <= 0 ? (
        <span
          style={{
            width: "100%",
            height: "175px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No results found
        </span>
      ) : (
        list.map((result, index) => {
          return (
            <Link
              to={"/" + result.media_type + "/" + result.id}
              className="search-preview-item"
              key={index}
            >
              <div className="search-preview-image">
                <img
                  src={
                    result.poster_path
                      ? image_url + result.poster_path
                      : image_url + result.profile_path
                  }
                  alt="search-preview-result"
                />
              </div>
              <div className="search-preview-description">
                <div className="search-preview-title">
                  {result.title || result.name}
                </div>
                <div className="search-preview-date">
                  {result.release_date?.slice(0, 4) ||
                    result.first_air_date?.slice(0, 4)}
                </div>
                <div className="search-preview-section">
                  <div className="search-preview-rating">
                    <StarIcon sx={{ fontSize: "0.8rem", padding: "0px" }} />
                    {result.media_type !== "person"
                      ? parseFloat(result.vote_average).toFixed(2) !==
                        parseFloat(0).toFixed(2)
                        ? parseFloat(result.vote_average).toFixed(2)
                        : "NA"
                      : parseFloat(result.popularity).toFixed(2) !==
                        parseFloat(0).toFixed(2)
                      ? parseFloat(result.popularity).toFixed(2)
                      : "NA"}
                  </div>
                  <div className="search-preview-dot"></div>
                  <div className="search-preview-type">
                    {result.media_type?.charAt(0).toUpperCase() +
                      result.media_type?.slice(1)}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
      )}
      {!loading && hasMore && (
        <Link to={"/search?q=" + searchTerm} className="search-preview-item">
          <div className="search-preview-description">
            <div
              className="search-preview-title"
              style={{ paddingBottom: "5px", margin: "auto" }}
            >
              See all results for "{searchTerm.trim()}"
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
