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

import Review from "../../components/review/Review";

const MovieBody = ({ id, credits, data }) => {
  //   console.log(credits.cast);

  const similar_movie_url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  const review_url = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=ace3eeed99f6d9d19e61456a520cda0b`

  const { data: social } = useFetchData(
    `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const { data: keywords } = useFetchData(
    `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  return (
    <div className="movie-page-body">
      <div className="movie-page-col">
        <div className="movie-page-body-col-1">
          {/* Cast Section */}
          <div className="movie-page-cast-section">
            <h2
              className="provider-heading heading"
              style={{ marginBottom: "20px" }}
            >
              Cast
              <ArrowForwardIosIcon
                sx={{ fontSize: "26px" }}
                className="arrow"
              />
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
              <ArrowForwardIosIcon
                sx={{ fontSize: "26px" }}
                className="arrow"
              />
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

          {/* Info Section For Small Devices */}
          <div className="movie-page-stats-section-small">
            <div className="movie-page-stats-item-title">
              <h2
                className="provider-heading heading"
                style={{ marginBottom: "15px" }}
              >
                Info
                <ArrowForwardIosIcon
                  sx={{ fontSize: "26px" }}
                  className="arrow"
                />
              </h2>
            </div>
            <div className="movie-page-stats-item border-bottom border-top">
              <div className="movie-page-stats-title">Status :</div>
              <span className="movie-page-stats-answer">
                {data.status ? data.status : "Not Available"}
              </span>
            </div>
            <div className="movie-page-stats-item border-bottom">
              <div className="movie-page-stats-title">Original Language :</div>
              <span className="movie-page-stats-answer">
                {data.original_language
                  ? data.original_language
                  : "Not Available"}
              </span>
            </div>
            <div className="movie-page-stats-item border-bottom">
              <div className="movie-page-stats-title">Budget :</div>
              <span className="movie-page-stats-answer">
                {" "}
                {data.budget !== 0 ? "$" + data.budget : "Not Available"}
              </span>
            </div>
            <div className="movie-page-stats-item border-bottom">
              <div className="movie-page-stats-title">Revenue :</div>
              <span className="movie-page-stats-answer">
                {data.revenue !== 0 ? "$" + data.revenue : "Not Available"}
              </span>
            </div>
            <div className="movie-page-stats-item border-bottom">
              <div className="movie-page-stats-title">Runtime :</div>
              <span className="movie-page-stats-answer">
                {data.runtime ? data.runtime + "min" : "Not Available"}
              </span>
            </div>
          </div>

          {/* Keyword for Small devices */}
          {keywords && keywords.keywords.length > 0 && (
            <div className="movie-page-keywords-section-small">
              <div className="movie-page-keywords-title">
                <h2
                  className="provider-heading heading"
                  style={{ marginBottom: "5px" }}
                >
                  Keywords
                  <ArrowForwardIosIcon
                    sx={{ fontSize: "26px" }}
                    className="arrow"
                  />
                </h2>
              </div>
              <div className="movie-page-keywords-items">
                {keywords.keywords.map((keyword) => {
                  return (
                    <div className="movie-page-keywords-item" key={keyword.id}>
                      {keyword.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Media Section For Small Devices */}
          <div className="movie-page-social-media-section-small">
            <div className="movie-page-social-media-title">
              <h2
                className="provider-heading heading"
                style={{ marginBottom: "5px" }}
              >
                Social Media
                <ArrowForwardIosIcon
                  sx={{ fontSize: "26px" }}
                  className="arrow"
                />
              </h2>
            </div>
            <div className="movie-page-social-media-items-container-small">
              <div className="movie-page-social-media-items">
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
              </div>
              <div className="movie-page-social-media-items">
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
              </div>
              <div className="movie-page-social-media-items">
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
              <span className="movie-page-stats-answer">
                {data.original_language}
              </span>
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
              <span className="movie-page-stats-answer">
                {data.runtime} min
              </span>
            </div>
          </div>

          {/* KeyWords Section */}

          {keywords && keywords.keywords.length > 0 && (
            <div className="movie-page-keywords-section">
              <div className="movie-page-keywords-title">Keywords</div>
              <div className="movie-page-keywords-items">
                {keywords.keywords.map((keyword) => {
                  return (
                    <div className="movie-page-keywords-item" key={keyword.id}>
                      {keyword.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Similar Movie Section */}
      <div className="movie-page-similar-movie-section slider-container">
        <h2
          className="provider-heading heading"
          style={{ marginBottom: "20px" }}
        >
          Similar Movies
          <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
        </h2>

        <Slider url={similar_movie_url} />
      </div>

      {/* Review Section */}
      <Review url={review_url} />

    </div>
  );
};

export default MovieBody;
