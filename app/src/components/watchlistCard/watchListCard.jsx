import React, { useContext, useEffect } from "react";
import "./watchlistcard.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/Auth/AuthContext";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";

const WatchListCard = ({ movie }) => {
  const { tokens } = useContext(AuthContext);

  const image_url = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  const removeFromWL = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:8000/movieapp/delete-movie/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );
    if (response.status === 204) {
      alert("Success");
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="watchlist-card">
      {console.log(movie)}
      <div className="watchlist-card-img">
        {/* <Link to={'/movie/'+movie.id}> */}
        <img src={image_url} alt="movie-poster" />
        {/* </Link> */}
      </div>
      <div className="watchlist-card-body">
        <h3 className="wl-movie-title">{movie.title}</h3>
        <p className="wl-start-rating">
          <StarIcon sx={{ color: "#f5c518" }} />
          {movie.rating}/10.0
        </p>
        <p>{movie.release_date}</p>
        <div className="remove-btn">
          <Button
            endIcon={<DeleteIcon />}
            variant="contained"
            onClick={() => removeFromWL(movie.id)}
            sx={{
                backgroundColor: "#f5c518",
                color: '#000',
                '&:hover': {
                backgroundColor: '#f5c518',
                color: '#000',
                boxShadow: 'none',
                },
                padding: '5px 10px',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '12px'
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
