import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../loader/Loading";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";
import "./carousel.css";

//constans
import { movie_genres } from "../../constants/genres";

//Icons
import StarIcon from "@mui/icons-material/Star";

//Contexts
import WindowSizeContext from "../../contexts/windowSize/WindowSize";

const Carousel = () => {
  const image_base_url = "https://image.tmdb.org/t/p";
  const image_size = "w1920_and_h800_multi_faces";

  const { data, loading, error } = useFetchData(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN&api_key=ace3eeed99f6d9d19e61456a520cda0b"
  );

  const { windowSize, setWindowSize } = useContext(WindowSizeContext);
  const [navigation, setNavigation] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    const isMobile = windowSize[0] < 768;
    setNavigation(!isMobile);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    // eslint-disable-next-line
  }, [windowSize]);

  // For Autoplay TIme
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  //Transition
  const handleTransitionON = (e) => {
    const titleBefore = e.currentTarget.querySelector(".title-before");
    titleBefore.style.width = "100%";
  };

  const handleTransitionOFF = (e) => {
    const titleBefore = e.currentTarget.querySelector(".title-before");
    titleBefore.style.width = "0px";
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      <section className="slider-container" id="back-to-top-anchor">
        {loading ? (
          <div className="carousel-loading">
            <Loading />
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={5}
            centeredSlides={true}
            navigation={navigation}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            lazyPreloadPrevNext={1}
            className="mySwiper carousel"
          >
            {data &&
              data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    {({ isActive }) => (
                      <div
                        loading="lazy"
                        className="carousel-background-img"
                        style={{
                          backgroundImage: `linear-gradient(to right, rgb(32 32 32 / 90%) calc((50vw - 170px) - 340px), rgb(32 32 32 / 75%) 50%, rgb(32 32 32 / 72%) 100%) , url(${image_base_url}/${image_size}${item.backdrop_path})`,
                        }}
                      >
                        <div
                          className="backdrop-content"
                          key={index}
                          style={isActive ? { animationName: "slideUp" } : {}}
                        >
                          <h1
                            className="carousel-link"
                            onMouseEnter={handleTransitionON}
                            onMouseLeave={handleTransitionOFF}
                          >
                            <div
                              className="title-before"
                              style={{
                                position: "absolute",
                                width: "0",
                                height: "100%",
                                overflow: "hidden",
                                color: "#d3a604eb",
                                transition: "width 0.4s ease-in-out",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.title}
                            </div>
                            <Link to={`/movie/${item.id}`}>{item.title}</Link>
                          </h1>
                          <div className="carousel-info-wrapper">
                            <div className="carousel-rating">
                              <StarIcon sx={{ color: "#f5c518" }} />
                              <span className="carousel-rating-value">
                                {item.vote_average === 0
                                  ? "NA"
                                  : item.vote_average}
                              </span>
                            </div>
                            <div className="search-preview-dot"></div>
                            <div className="carousel-release-date">
                              {item.release_date.split("-").reverse().join("-")}
                            </div>
                          </div>
                          <div className="carousel-genres-wrapper">
                            {movie_genres.map((genre, index) => {
                              return (
                                item.genre_ids.includes(genre.id) && (
                                  <span key={index} className="carousel-genre">
                                    {genre.name}
                                  </span>
                                )
                              );
                            })}
                          </div>
                          <div className="carousel-btn-wrapper">
                            <Link to={`/movie/${item.id}`}>
                              <Button
                                variant="contained"
                                size="small"
                                endIcon={<LaunchIcon />}
                                sx={{
                                  backgroundColor: "#d3a604eb",
                                  color: "#000",
                                  minWidth: "100px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "4px 10px",
                                  fontWeight: "bold",
                                  fontSize: "0.78rem",
                                  '& svg': {
                                    transition: "all 0.2s ease-in-out",
                                    opacity: '0.5',
                                  },
                                  '&:hover': {
                                    backgroundColor: "#f5c518",
                                    '& svg': {
                                      opacity: '1',
                                    }
                                  }
                                }}
                              >
                                Show More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        )}
      </section>
    </>
  );
};

export default Carousel;
