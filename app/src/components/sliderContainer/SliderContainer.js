import React, { useState } from "react";
import "./slidercontainer.css";
import Slider from "../slider/Slider";
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SliderContainer = (props) => {
  const links = {
    movie: {
      Trending:
        "https://api.themoviedb.org/3/trending/movie/week?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      "Now Playing":
        "https://api.themoviedb.org/3/movie/now_playing?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      "Top Rated":
        "https://api.themoviedb.org/3/movie/top_rated?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      },
    tv_show: {
      Trending:
        "https://api.themoviedb.org/3/trending/tv/week?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      "Top Rated":
        "https://api.themoviedb.org/3/tv/top_rated?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      "Now Playing":
        "https://api.themoviedb.org/3/tv/on_the_air?api_key=ace3eeed99f6d9d19e61456a520cda0b&region=IN",
      },
  };

  const [switchType, setSwitchType] = useState("movie");
  const [url, setUrl] = useState(links.movie[props.title]);

  const handleSwitch = (event, value) => {
    if (value !== null) {
      setSwitchType(value);
      setUrl(links[value][props.title]);
    }
  };

  return (
    <section className="slider-container">
      <div className="title-panel">
        <h2 className="heading">
          {props.title}{" "}
          <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
        </h2>
        <div className="toggle-switch">
          <ToggleButtonGroup
            value={switchType}
            exclusive
            onChange={handleSwitch}
            size="small"
            className="toggle-switch"
            color="info"
          >
            <ToggleButton
              aria-label="movie"
              value="movie"
              sx={{
                px: 1,
                py: 0,
                color: "white",
                borderRadius: 5,
                borderColor: "white",
              }}
            >
              <Typography variant="button" ml={1} mr={1}>
                Movie
              </Typography>
            </ToggleButton>
            <ToggleButton
              aria-label="tv_show"
              value="tv_show"
              sx={{
                px: 1,
                py: 0,
                color: "white",
                borderRadius: 5,
                borderColor: "white",
              }}
            >
              <Typography variant="button" ml={1} mr={1}>
                Tv Show
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <Slider url={url} />
    </section>
  );
};

export default SliderContainer;
