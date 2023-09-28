import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./tv.css";
import useFetchData from "../../hooks/useFetchData";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TVShowBody from "./TVShowBody";

const TVShow = () => {
  const params = useParams();

  const [trailerKey, setTrailerKey] = useState("");

  const { data } = useFetchData(
    `https://api.themoviedb.org/3/tv/${params.id}?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const { data: credits } = useFetchData(
    `https://api.themoviedb.org/3/tv/${params.id}/credits?language=en-US&api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const image_url = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/";

  const { data: trailer } = useFetchData(
    `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

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
        <section className="tvshow-page">
          {console.log(data)}

          <div
            className="background"
            style={{
              backgroundImage: `url(${image_url + data.backdrop_path} `,
            }}
          >
            <div className="backdrop">
              {/* TV Show Page Header */}
              <div className="tvshow-page-header" id="back-to-top-anchor">
                <div className="tvshow-page-header-left">
                  <h1 className="tvshow-page-title">
                    {data.name ? data.name : "NA"}
                  </h1>
                  <div className="tvshow-page-title-bottom">
                    <div className="tvshow-page-date">
                      {data.first_air_date
                        ? data.first_air_date.slice(0, 4)
                        : "NA"}
                    </div>
                    <div className="search-preview-dot"></div>
                    <div className="tvshow-page-runtime">
                      {data.episode_run_time && data.episode_run_time.length > 0
                        ? data.episode_run_time[0]
                        : "NA"}{" "}
                      min
                    </div>
                  </div>
                </div>
                <div className="tvshow-page-header-right">
                  <div className="tvshow-page-rating">
                    <StarIcon sx={{ color: "#f5c518", fontSize: "2.2rem" }} />
                    <div className="tvshow-page-rating-box">
                      <div className="tvshow-page-rating-score">
                        {data.vote_average !== 0
                          ? parseFloat(data.vote_average).toFixed(1)
                          : "NA"}
                        <span className="tvshow-page-rating-total">/10</span>
                      </div>
                      <div className="tvshow-page-rating-count">
                        {data.vote_count ? data.vote_count : "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="tvshow-page-user-rating">
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
                    >
                      Rate
                    </Button>
                  </div>
                </div>
              </div>

              {/* TV Show Page trailer section */}

              <div className="img-vid-section">
                <div className="img-vid-top-section">
                  <div className="tvshow-page-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                      alt="tvshow-poster"
                    />
                  </div>
                  <div className="tvshow-page-trailer">
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
                  <div className="tvshow-page-other-media">
                    <div className="tvshow-page-other-videos">
                      <IconButton aria-label="videos" sx={{ color: "white" }}>
                        <VideoLibraryIcon />
                      </IconButton>
                      <span>Videos</span>
                    </div>
                    <div className="tvshow-page-other-imgs">
                      <IconButton aria-label="images" sx={{ color: "white" }}>
                        <PhotoLibraryIcon />
                      </IconButton>
                      <span>Images</span>
                    </div>
                  </div>
                </div>
                <div className="img-vid-bottom-section">
                  <div className="tvshow-page-other-videos">
                    <IconButton aria-label="videos" sx={{ color: "white" }}>
                      <VideoLibraryIcon />
                    </IconButton>
                    <span>Videos</span>
                  </div>
                  <div className="tvshow-page-other-imgs">
                    <IconButton aria-label="images" sx={{ color: "white" }}>
                      <PhotoLibraryIcon />
                    </IconButton>
                    <span>Images</span>
                  </div>
                </div>
              </div>

              {/* TV Show Page Overview Section */}
              <div className="tvshow-page-overview">
                <div className="tvshow-page-overview-col-1">
                  <div className="tvshow-page-overview-responsive">
                    <div className="tvshow-page-overview-responsive-col1">
                      <img
                        src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                        alt="poster"
                      />
                    </div>
                    <div className="tvshow-page-overview-responsive-col2">
                      <div className="tvshow-page-genre-section">
                        {data?.genres?.map((genre) => (
                          <div
                            className="tvshow-page-genre-item"
                            key={genre.id}
                          >
                            {genre.name}
                          </div>
                        ))}
                      </div>
                      <div className="tvshow-page-overview-section border-bottom">
                        {data.overview ? data.overview : "NA"}
                      </div>
                    </div>
                  </div>
                  <div className="tvshow-page-list-section border-bottom">
                    <div className="tvshow-page-list-title">Creators : </div>
                    <div className="tvshow-page-list-items">
                      {data?.created_by.length > 0
                        ? data?.created_by?.map((creator, index) => {
                            return (
                              <div key={index}>
                                <div
                                  className="tvshow-page-list-item"
                                  key={creator.id}
                                >
                                  {creator.name}
                                </div>
                                <div className="search-preview-dot tvshow-page-dot"></div>
                              </div>
                            );
                          })
                        : "NA"}
                    </div>
                  </div>
                  <div className="tvshow-page-list-section border-bottom">
                    <div className="tvshow-page-list-title">Stars : </div>
                    <div className="tvshow-page-list-items">
                      {credits &&
                        credits.cast.map((cast, index) => {
                          if (cast.order <= 3) {
                            return (
                              <div key={index}>
                                <div
                                  className="tvshow-page-list-item"
                                  key={cast.id}
                                >
                                  {cast.name}
                                </div>
                                <div className="search-preview-dot tvshow-page-dot"></div>
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </div>
                  </div>
                  <div className="tvshow-page-list-section border-bottom">
                    <div className="tvshow-page-list-title">
                      Tag Line :{" "}
                    </div>
                    <div className="tvshow-page-list-items">
                      {data ? data.tagline : "NA"}
                    </div>
                  </div>
                  {/* <div className="tvshow-page-list-section border-bottom">
                    <div className="tvshow-page-list-title">
                      Total Seasons :{" "}
                    </div>
                    <div className="tvshow-page-list-items">
                      {data ? data.number_of_seasons : "NA"}
                    </div>
                  </div>
                  <div className="tvshow-page-list-section border-bottom">
                    <div className="tvshow-page-list-title">
                      Total Episodes :{" "}
                    </div>
                    <div className="tvshow-page-list-items">
                      {data ? data.number_of_episodes : "NA"}
                    </div>
                  </div> */}
                </div>
                <div className="tvshow-page-overview-col-2">
                  <div className="tvshow-page-responsive-header-right">
                    <div className="tvshow-page-rating">
                      <StarIcon sx={{ color: "#f5c518", fontSize: "2.2rem" }} />
                      <div className="tvshow-page-rating-box">
                        <div className="tvshow-page-rating-score">
                          {data.vote_average !== 0
                            ? parseFloat(data.vote_average).toFixed(1)
                            : "NA"}
                          <span className="tvshow-page-rating-total">/10</span>
                        </div>
                        <div className="tvshow-page-rating-count">
                          {data.vote_count ? data.vote_count : "NA"}
                        </div>
                      </div>
                    </div>
                    <div className="tvshow-page-user-rating">
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
                      >
                        Rate
                      </Button>
                    </div>
                  </div>

                  <div className="tvshow-page-side-btns">
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
                      className="tvshow-page-btns"
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
                      className="tvshow-page-btns"
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
            <TVShowBody
              id={params.id}
              credits={credits}
              data={data}
              seasons={data.seasons}
            />
          )}
        </section>
      )}
    </>
  );
};

export default TVShow;
