import React, { useState } from "react";
import "./moviecard.css";
import Checkbox from "@mui/material/Checkbox";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import RatingModal from "../ratingModal/RatingModal";
// import img_not_found from '../../accets/img_not_found.jpg';
import { Link } from "react-router-dom";

//Contexts
// import WindowSizeContext from "../../contexts/windowSize/WindowSize";

const MovieCard = (props) => {

  // const {windowSize} = useContext(WindowSizeContext);
  
  // const image_url1 = `https://image.tmdb.org/t/p/w92${props.movie.poster_path}`;
  // const image_url2 = `https://image.tmdb.org/t/p/w154${props.movie.poster_path}`;
  const image_url3 = `https://image.tmdb.org/t/p/w185${props.movie.poster_path}`;
  // const image_url4 = `https://image.tmdb.org/t/p/w342${props.movie.poster_path}`;
  // const image_url5 = `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`;
  // const image_url6 = `https://image.tmdb.org/t/p/w780${props.movie.poster_path}`;

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="movie-card" style={{maxWidth : props.width , maxHeight: props.height}}>
        <Link to={(props.movie.title ? "/movie/" : "/tv/") + props.movie.id}>
          <div className="movie-img">
            <img
              // srcSet={image_url1 + ' 92w, ' + image_url2 + ' 154w, ' + image_url3 + ' 185w, ' + image_url4 + ' 342w, ' + image_url5 + ' 500w'}
              // sizes="(max-width: 320px) 92px,
              //         (max-width: 480px) 154px,
              //         (max-width: 768px) 185px,
              //         (max-width: 1024px) 342px,
              //         500px"
              loading={props.lazy ? "lazy" : "eager"}
              src={image_url3}
              alt="movie-poster"
            />
          </div>
        </Link>
        <div className="movie-description">
          <div className="rating-panel">
            <div className="rate">
              <StarIcon sx={{ color: "#f5c518" }} />
              <span>
                {props.movie.vote_average !== 0
                  ? parseFloat(props.movie.vote_average).toFixed(1)
                  : "NA"}
              </span>
            </div>
            <Checkbox
              checked={checked}
              id={`${props.movie.id}`}
              onChange={handleChange}
              icon={<StarOutlineIcon color="primary" />}
              checkedIcon={<StarIcon color="primary" />}
              sx={{
                ":hover": {
                  backgroundColor: "#ffffff21",
                  borderRadius: 2,
                },
              }}
            />
          </div>
          <Link to={(props.movie.title ? "/movie/" : "/tv/") + props.movie.id}>
            <h4 className="movie-title">
              {props.movie.title ? props.movie.title : props.movie.name}
            </h4>
          </Link>
        </div>
      </div>
      {checked && (
        <RatingModal
          movie={props.movie}
          setChecked={setChecked}
          checked={checked}
        />
      )}
    </>
  );
};

export default MovieCard;
