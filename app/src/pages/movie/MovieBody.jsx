import React from "react";
import "./moviebody.css";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Slider from "../../components/slider/Slider";
import TrailerSection from "../../components/trailerSection/TrailerSection";
import useFetchData from "../../hooks/useFetchData";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

const MovieBody = ({ id, credits , data }) => {
  //   console.log(credits.cast);

  const { data: social } = useFetchData(
    `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const { data: keywords } = useFetchData(
    `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=ace3eeed99f6d9d19e61456a520cda0b`
    );

  return (
    <div className="movie-page-body">
      <div className="movie-page-body-col-1">
        {/* Cast Section */}
        <div className="movie-page-cast-section">
          <h2
            className="provider-heading heading"
            style={{ marginBottom: "20px" }}
          >
            Cast
            <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
          </h2>
          <div className="movie-page-cast-items slider-container">
            <Slider
              url={`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=ace3eeed99f6d9d19e61456a520cda0b`}
              type="cast"
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="movie-page-images-section">
          <h2
            className="provider-heading heading"
            style={{ marginBottom: "20px" }}
          >
            Images
            <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
          </h2>
          <div className="movie-page-images-items slider-container">
            <Slider
              url={`https://api.themoviedb.org/3/movie/${id}/images?api_key=ace3eeed99f6d9d19e61456a520cda0b`}
              type="images"
            />
          </div>
        </div>

        {/* Videos Section */}
        <div className="movie-page-videos-section">
          <TrailerSection
            url={`https://api.themoviedb.org/3/movie/${id}/videos?api_key=ace3eeed99f6d9d19e61456a520cda0b`}
            title={"Videos"}
            space={false}
          />
        </div>

        {/* Info Section */}
        <div className="movie-page-list-section border-bottom border-top">
          <div className="movie-page-list-title">Directors : </div>
          <div className="movie-page-list-items">
            {credits &&
              credits.crew.map((crew) => {
                if (crew.job === "Director") {
                  return (
                    <>
                      <div className="movie-page-list-item" key={crew.id}>
                        {crew.name}
                      </div>
                      <div className="search-preview-dot movie-page-dot"></div>
                    </>
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
              credits.crew.map((crew) => {
                if (
                  crew.job === "Screenplay" ||
                  crew.job === "Writer" ||
                  crew.job === "Story"
                ) {
                  return (
                    <>
                      <div className="movie-page-list-item" key={crew.id}>
                        {crew.name}
                      </div>
                      <div className="search-preview-dot movie-page-dot"></div>
                    </>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      </div>
      <div className="movie-page-body-col-2">

        {/* Social Media Section */}
        <div className="movie-page-social-media-section">
          {social && social.facebook_id && (
            <a
              href={`https://www.facebook.com/${social.facebook_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="movie-page-social-media-item">
                <IconButton
                  aria-label="facebook"
                  sx={{
                    color: "#1877F2",
                    "&:hover": {
                      color: "#1877F2",
                      backgroundColor: "rgba(255,255,255,0.15);",
                    },
                  }}
                >
                  <FacebookIcon
                    sx={{
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </div>
            </a>
          )}

          {social && social.instagram_id && (
            <a
              href={`https://www.instagram.com/${social.instagram_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="movie-page-social-media-item">
                <IconButton
                  aria-label="instagram"
                  sx={{
                    color: "#C13584",
                    "&:hover": {
                      color: "#C13584",
                      backgroundColor: "rgba(255,255,255,0.15);",
                    },
                  }}
                >
                  <InstagramIcon
                    sx={{
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </div>
            </a>
          )}

          {social && social.twitter_id && (
            <a
              href={`https://www.twitter.com/${social.twitter_id}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="movie-page-social-media-item">
                <IconButton
                  aria-label="twitter"
                  sx={{
                    color: "#1DA1F2",
                    "&:hover": {
                      color: "#1DA1F2",
                      backgroundColor: "rgba(255,255,255,0.15);",
                    },
                  }}
                >
                  <TwitterIcon
                    sx={{
                      fontSize: "25px",
                    }}
                  />
                </IconButton>
              </div>
            </a>
          )}
        </div>

        {/* Info Section */}
        <div className="movie-page-stats-section">
          <div className="movie-page-stats-item">
            <div className="movie-page-stats-title">Status </div>
            <span className="movie-page-stats-answer">{data.status}</span>
          </div>
          <div className="movie-page-stats-item">
            <div className="movie-page-stats-title">Original Language </div>
            <span className="movie-page-stats-answer">{data.original_language}</span>
          </div>
          <div className="movie-page-stats-item">
            <div className="movie-page-stats-title">Budget </div>
            <span className="movie-page-stats-answer"> ${data.budget}</span>
          </div>
          <div className="movie-page-stats-item">
            <div className="movie-page-stats-title">Revenue </div>
            <span className="movie-page-stats-answer">${data.revenue}</span>
          </div>
          <div className="movie-page-stats-item">
            <div className="movie-page-stats-title">Runtime </div>
            <span className="movie-page-stats-answer">{data.runtime} min</span>
          </div>
        </div>

        {/* KeyWords Section */}

        {
          keywords && keywords.keywords.length > 0 && (
            <div className="movie-page-keywords-section">
            <div className="movie-page-keywords-title">Keywords</div>
            <div className="movie-page-keywords-items">
                
                { keywords.keywords.map((keyword) => {
                    return (
                        <div className="movie-page-keywords-item" key={keyword.id}>{keyword.name}</div>
                    )
                })}
            </div>
            </div>
          )
        }


      </div>
    </div>
  );
};

export default MovieBody;
