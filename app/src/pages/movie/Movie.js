import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./movie.css";
import useFetchData from "../../hooks/useFetchData";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MovieBody from "./MovieBody";
import AddToWatchList from "../../components/addToWatchList/AddToWatchList";
import GeneralModal from "../../components/generalModal/GeneralModal";
import AuthContext from "../../contexts/Auth/AuthContext";
import RatingModal from "../../components/ratingModal/RatingModal";

const Movie = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  const [trailerKey, setTrailerKey] = useState("");

  const { data } = useFetchData(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const { data: credits } = useFetchData(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US&api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const image_url = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  const { data: trailer } = useFetchData(
    `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  // Functions For Rating Modal
  const [checked, setChecked] = useState(false);
  const handleChecked = () => setChecked(!checked);

  // Functions For Modal
  const [modalopen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleRedirect = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log(trailer);
    trailer &&
      setTrailerKey(
        trailer.filter(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube" &&
            video.official === true
        )[0]?.key
      );
  }, [trailer]);

  return (
    <>
      {data && (
        <section className="movie-page">
          <div
            className="background"
            style={{
              backgroundImage: `url(${image_url + data.backdrop_path} `,
            }}
          >
            <div className="backdrop">
              {/* Movie Page Header */}
              <div className="movie-page-header" id="back-to-top-anchor">
                <div className="movie-page-header-left">
                  <h1 className="movie-page-title">
                    {data.title ? data.title : "NA"}
                  </h1>
                  <div className="movie-page-title-bottom">
                    <div className="movie-page-date">
                      {data.release_date ? data.release_date.slice(0, 4) : "NA"}
                    </div>
                    <div className="search-preview-dot"></div>
                    <div className="movie-page-runtime">
                      {data.runtime ? data.runtime : "NA"} min
                    </div>
                  </div>
                </div>
                <div className="movie-page-header-right">
                  <div className="movie-page-rating">
                    <StarIcon sx={{ color: "#f5c518", fontSize: "2.2rem" }} />
                    <div className="movie-page-rating-box">
                      <div className="movie-page-rating-score">
                        {data.vote_average !== 0
                          ? parseFloat(data.vote_average).toFixed(1)
                          : "NA"}
                        <span className="movie-page-rating-total">/10</span>
                      </div>
                      <div className="movie-page-rating-count">
                        {data.vote_count ? data.vote_count : "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="movie-page-user-rating">
                    <Button
                      variant="text"
                      color="primary"
                      size="large"
                      onClick={handleChecked}
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textTransform: "none",
                        lineHeight: "1.2rem",
                        "&:hover": {
                          backgroundColor: "#ffffff21",
                          borderRadius: 2,
                        },
                        "& .MuiButton-startIcon": {
                          marginRight: "3px",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.6rem",
                        },
                      }}
                      startIcon={<StarOutlineIcon />}
                    >
                      Rate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Movie Page trailer section */}

              <div className="img-vid-section">
                <div className="img-vid-top-section">
                  <div className="movie-page-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                      alt="movie-poster"
                    />
                  </div>
                  <div className="movie-page-trailer">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="YouTube video player"
                      frameBorder="0"
                      className="trailer-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                  <div className="movie-page-other-media">
                    <div className="movie-page-other-videos">
                      <IconButton aria-label="videos" sx={{ color: "white" }}>
                        <VideoLibraryIcon />
                      </IconButton>
                      <span>Videos</span>
                    </div>
                    <div className="movie-page-other-imgs">
                      <IconButton aria-label="images" sx={{ color: "white" }}>
                        <PhotoLibraryIcon />
                      </IconButton>
                      <span>Images</span>
                    </div>
                  </div>
                </div>
                <div className="img-vid-bottom-section">
                  <div className="movie-page-other-videos">
                    <IconButton aria-label="videos" sx={{ color: "white" }}>
                      <VideoLibraryIcon />
                    </IconButton>
                    <span>Videos</span>
                  </div>
                  <div className="movie-page-other-imgs">
                    <IconButton aria-label="images" sx={{ color: "white" }}>
                      <PhotoLibraryIcon />
                    </IconButton>
                    <span>Images</span>
                  </div>
                </div>
              </div>

              {/* Movie Page Overview Section */}
              <div className="movie-page-overview">
                <div className="movie-page-overview-col-1">
                  <div className="movie-page-overview-responsive">
                    <div className="movie-page-overview-responsive-col1">
                      <img
                        src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                        alt="poster"
                      />
                    </div>
                    <div className="movie-page-overview-responsive-col2">
                      <div className="movie-page-genre-section">
                        {data.genres.map((genre) => (
                          <div className="movie-page-genre-item" key={genre.id}>
                            {genre.name}
                          </div>
                        ))}
                      </div>
                      <div className="movie-page-overview-section border-bottom">
                        {data.overview ? data.overview : "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="movie-page-list-section border-bottom">
                    <div className="movie-page-list-title">Directors : </div>
                    <div className="movie-page-list-items">
                      {credits &&
                        credits.crew.map((crew, index) => {
                          if (crew.job === "Director") {
                            return (
                              <div key={index}>
                                <div
                                  className="movie-page-list-item"
                                  key={crew.id}
                                >
                                  {crew.name}
                                </div>
                                <div className="search-preview-dot movie-page-dot"></div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                  </div>
                  <div className="movie-page-list-section border-bottom">
                    <div className="movie-page-list-title">Writers : </div>
                    <div className="movie-page-list-items">
                      {credits &&
                        credits.crew.map((crew, index) => {
                          if (
                            crew.job === "Screenplay" ||
                            crew.job === "Writer" ||
                            crew.job === "Story"
                          ) {
                            return (
                              <div key={index}>
                                <div
                                  className="movie-page-list-item"
                                  key={crew.id}
                                >
                                  {crew.name}
                                </div>
                                <div className="search-preview-dot movie-page-dot"></div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                  </div>
                  <div className="movie-page-list-section border-bottom">
                    <div className="movie-page-list-title">Stars : </div>
                    <div className="movie-page-list-items">
                      {credits &&
                        credits.cast.map((cast, index) => {
                          if (cast.order <= 3) {
                            return (
                              <div key={index}>
                                <div
                                  className="movie-page-list-item"
                                  key={cast.id}
                                >
                                  {cast.name}
                                </div>
                                <div className="search-preview-dot movie-page-dot"></div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                  </div>
                </div>
                <div className="movie-page-overview-col-2">
                  <div className="movie-page-responsive-header-right">
                    <div className="movie-page-rating">
                      <StarIcon sx={{ color: "#f5c518", fontSize: "2.2rem" }} />
                      <div className="movie-page-rating-box">
                        <div className="movie-page-rating-score">
                          {data.vote_average !== 0
                            ? parseFloat(data.vote_average).toFixed(1)
                            : "NA"}
                          <span className="movie-page-rating-total">/10</span>
                        </div>
                        <div className="movie-page-rating-count">
                          {data.vote_count ? data.vote_count : "NA"}
                        </div>
                      </div>
                    </div>
                    <div className="movie-page-user-rating">
                      <Button
                        variant="text"
                        color="primary"
                        size="large"
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          lineHeight: "1.2rem",
                          "&:hover": {
                            backgroundColor: "#ffffff21",
                            borderRadius: 2,
                          },
                          "& .MuiButton-startIcon": {
                            marginRight: "3px",
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: "1.6rem",
                          },
                        }}
                        startIcon={<StarOutlineIcon />}
                        onClick={handleChecked}
                      >
                        Rate
                      </Button>
                    </div>
                  </div>

                  <div className="movie-page-side-btns">
                    <Button
                      variant="contained"
                      href={data.homepage ? data.homepage : "#"}
                      target="_blank"
                      sx={{
                        backgroundColor: "#f5c518",
                        color: "black",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: "#ceac31",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "1.35rem",
                        },
                      }}
                      endIcon={<OpenInNewIcon />}
                      className="movie-page-btns"
                    >
                      Official Website
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                        },
                        "& .MuiSvgIcon-root": {
                          fontSize: "2rem",
                        },
                      }}
                      endIcon={<AddIcon />}
                      onClick={
                        isAuthenticated ? handleModalOpen : handleRedirect
                      }
                      className="movie-page-btns"
                    >
                      Add To Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body Section */}
          {credits && (
            <MovieBody id={params.id} credits={credits} data={data} />
          )}

          {/* Add To WatchList Model */}
          <GeneralModal open={modalopen} handleClose={handleModalClose}>
            <AddToWatchList movie={data} handleClose={handleModalClose} />
          </GeneralModal>

          {/* Rating Modal */}
          {
            checked && <RatingModal movie={data} setChecked={setChecked} checked={checked} />
          }
        </section>
      )}
    </>
  );
};

export default Movie;
