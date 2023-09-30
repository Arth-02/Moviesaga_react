import React from "react";
import "./tvshowbody.css";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Slider from "../../components/slider/Slider";
import TrailerSection from "../../components/trailerSection/TrailerSection";
import useFetchData from "../../hooks/useFetchData";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";

import Review from "../../components/review/Review";

const TVShowBody = ({ id, credits, data }) => {
  //   console.log(credits.cast);

  const similar_movie_url = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=ace3eeed99f6d9d19e61456a520cda0b`;
  const review_url = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1&api_key=ace3eeed99f6d9d19e61456a520cda0b`;

  const { data: social } = useFetchData(
    `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  const { data: keywords } = useFetchData(
    `https://api.themoviedb.org/3/tv/${id}/keywords?api_key=ace3eeed99f6d9d19e61456a520cda0b`
  );

  return (
    <div className="tv-page-body">
      <div className="tv-page-col">
        <div className="tv-page-body-col-1">
          {/* Cast Section */}
          <div className="tv-page-cast-section">
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
            <div className="tv-page-cast-items slider-container removeminheight">
              <Slider
                url={`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=ace3eeed99f6d9d19e61456a520cda0b`}
                type="cast"
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="tv-page-images-section">
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
            <div className="tv-page-images-items slider-container removeminheight">
              <Slider
                url={`https://api.themoviedb.org/3/tv/${id}/images?api_key=ace3eeed99f6d9d19e61456a520cda0b`}
                type="images"
              />
            </div>
          </div>

          {/* Videos Section */}
          <div className="tv-page-videos-section">
            <TrailerSection
              url={`https://api.themoviedb.org/3/tv/${id}/videos?api_key=ace3eeed99f6d9d19e61456a520cda0b`}
              title={"Videos"}
              space={false}
            />
          </div>

          {/* Info Section For Small Devices */}
          <div className="tv-page-stats-section-small">
            <div className="tv-page-stats-item-title">
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
            <div className="tv-page-stats-item border-bottom border-top">
              <div className="tv-page-stats-title">Status :</div>
              <span className="tv-page-stats-answer">
                {data.status ? data.status : "Not Available"}
              </span>
            </div>
            <div className="tv-page-stats-item border-bottom">
              <div className="tv-page-stats-title">Original Language :</div>
              <span className="tv-page-stats-answer">
                {data.original_language
                  ? data.original_language
                  : "Not Available"}
              </span>
            </div>
            <div className="tv-page-stats-item border-bottom">
              <div className="tv-page-stats-title">Total Seasons :</div>
              <span className="tv-page-stats-answer">
                {" "}
                {data.number_of_seasons}
              </span>
            </div>
            <div className="tv-page-stats-item border-bottom">
              <div className="tv-page-stats-title">Total Episodes :</div>
              <span className="tv-page-stats-answer">
                {" "}
                {data.number_of_episodes}
              </span>
            </div>
            <div className="tv-page-stats-item border-bottom">
              <div className="tv-page-stats-title">Runtime :</div>
              <span className="tv-page-stats-answer">
                {data.runtime ? data.runtime + "min" : "Not Available"}
              </span>
            </div>
          </div>

          {/* Keyword for Small devices */}
          {keywords && keywords?.length > 0 && (
            <div className="tv-page-keywords-section-small">
              <div className="tv-page-keywords-title">
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
              <div className="tv-page-keywords-items">
                {keywords.map((keyword) => {
                  return (
                    <div className="tv-page-keywords-item" key={keyword.id}>
                      {keyword.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Media Section For Small Devices */}
          {social &&
            (social.instagram_id ||
              social.twitter_id ||
              social.facebook_id) && (
              <div className="tv-page-social-media-section-small">
                <div className="tv-page-social-media-title">
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
                <div className="tv-page-social-media-items-container-small">
                  <div className="tv-page-social-media-items">
                    {social && social.facebook_id && (
                      <a
                        href={`https://www.facebook.com/${social.facebook_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="tv-page-social-media-item">
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
                  <div className="tv-page-social-media-items">
                    {social && social.instagram_id && (
                      <a
                        href={`https://www.instagram.com/${social.instagram_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="tv-page-social-media-item">
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
                  <div className="tv-page-social-media-items">
                    {social && social.twitter_id && (
                      <a
                        href={`https://www.twitter.com/${social.twitter_id}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="tv-page-social-media-item">
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
            )}

          {/* Review Section */}
          <Review url={review_url} movie={data} />
        </div>
        <div className="tv-page-body-col-2">
          {/* Social Media Section */}
          <div className="tv-page-social-media-section">
            {social && social.facebook_id && (
              <a
                href={`https://www.facebook.com/${social.facebook_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="tv-page-social-media-item">
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
                <div className="tv-page-social-media-item">
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
                <div className="tv-page-social-media-item">
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
          <div className="tv-page-stats-section">
            <div className="tv-page-stats-item">
              <div className="tv-page-stats-title">Status </div>
              <span className="tv-page-stats-answer">{data.status}</span>
            </div>
            <div className="tv-page-stats-item">
              <div className="tv-page-stats-title">Original Language </div>
              <span className="tv-page-stats-answer">
                {data.original_language}
              </span>
            </div>
            <div className="tv-page-stats-item">
              <div className="tv-page-stats-title">Total Seasons </div>
              <span className="tv-page-stats-answer">
                {" "}
                {data.number_of_seasons}
              </span>
            </div>
            <div className="tv-page-stats-item">
              <div className="tv-page-stats-title">Total Episodes </div>
              <span className="tv-page-stats-answer">
                {" "}
                {data.number_of_episodes}
              </span>
            </div>
            <div className="tv-page-stats-item">
              <div className="tv-page-stats-title">Runtime </div>
              <span className="tv-page-stats-answer">
                {" "}
                {data.runtime ? data.runtime + "min" : "Not Available"}
              </span>
            </div>
          </div>

          {/* KeyWords Section */}
          {keywords && keywords?.length > 0 && (
            <div className="tv-page-keywords-section">
              <div className="tv-page-keywords-title">Keywords</div>
              <div className="tv-page-keywords-items">
                {keywords.map((keyword) => {
                  return (
                    <div className="tv-page-keywords-item" key={keyword.id}>
                      {keyword.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Similar Tv Show Section */}
      <div className="tv-page-similar-tv-section slider-container removeminheight">
        <h2
          className="provider-heading heading"
          style={{ marginBottom: "20px" }}
        >
          Similar Tv Shows
          <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
        </h2>

        <Slider url={similar_movie_url} />
      </div>
    </div>
  );
};

export default TVShowBody;
