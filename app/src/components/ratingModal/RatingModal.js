import React, { useState, useContext, useEffect } from "react";
import "./ratingmodal.css";
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AuthContext from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import snackbarContext from "../../contexts/Snackbar/snackbarContext";
import Loading from "../loader/Loading";

const RatingModal = (props) => {
  const { isAuthenticated, tokens } = useContext(AuthContext);
  const { setOpen, setMessage, setStatus } = useContext(snackbarContext);

  const mystyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [rating, setRating] = useState(0);
  const [ratingID, setRatingID] = useState(null);
  const [loading, setLoading] = useState(false);

  const handelChange = (event) => {
    setRating(event.target.value);
  };

  const handelClose = () => {
    props.setChecked(false);
    setRating(0);
  };

  const navigate = useNavigate();

  const sendPatchRequest = async () => {
    let data = {
      rating: rating,
    };

    await fetch(`http://127.0.0.1:8000/movieapp/rating/${ratingID}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(true);
        setMessage("Rating Updated Successfully");
        setStatus("success");
        props.setChecked(false);
        setRating(0);
      })
      .catch((err) => {
        setOpen(true);
        setMessage("Something went wrong");
        setStatus("error");
        console.log(err);
      });
  };

  const submitRating = async () => {
    let data = {
      rating: rating,
      movie_id: props.movie.id,
      title: props.movie.title,
      poster_path: props.movie.poster_path,
      release_date: props.movie.release_date,
    };
    await fetch(`http://127.0.0.1:8000/movieapp/rating/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(true);
        setMessage("Rating Added Successfully");
        setStatus("success");
      })
      .catch((error) => {
        setOpen(true);
        setMessage("Error During Posting Rating");
        setStatus("error");
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      ratingID ? sendPatchRequest() : submitRating();
    }
  };

  const getUserRating = async () => {
    setLoading(true);
    await fetch(
      `http://127.0.0.1:8000/movieapp/userrating/?movie_id=${props.movie.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setRating(parseInt(data[0].rating));
        setRatingID(data[0].id);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    isAuthenticated && getUserRating();
  }, []);

  return (
    <>
      <Modal
        keepMounted
        open={props.checked}
        onClose={() => {
          handelClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        sx={{
          color: "white",
        }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.checked}>
          <div className="modal-container" style={mystyle}>
            <div className="modal">
              <div className="modal-header">
                <span className="rate-star">
                  <StarRoundedIcon color="primary" sx={{ fontSize: 115 }} />
                  <span
                    className="rate-text"
                    style={{
                      left: "50%",
                      transform: "translate(-55% , 0%)",
                    }}
                  >
                    {" "}
                    {rating ? rating : "?"}
                  </span>
                </span>
                <IconButton
                  className="close-btn"
                  onClick={() => {
                    handelClose();
                  }}
                  sx={{
                    ":hover": { backgroundColor: "#ffffff21" },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 30, color: "white" }} />
                </IconButton>
              </div>
              {
                !loading ? (
                  <div className="modal-body">
                <div className="rate-this-label">RATE THIS</div>
                <div className="movie-name">
                  {props.movie.title ? props.movie.title : props.movie.name}
                </div>
                <div className="star-rating">
                  <Rating
                    name="customized-10"
                    // id='star-rating'
                    emptyIcon={<StarOutlineRoundedIcon sx={{ fontSize: 32 }} />}
                    icon={<StarRoundedIcon sx={{ fontSize: 32 }} />}
                    defaultValue={parseInt(rating)}
                    value={parseInt(rating)}
                    max={10}
                    onChange={handelChange}
                    color="primary"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#2196f3",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "white",
                      },
                    }}
                  />
                </div>
              </div>
                ) : (
                  <div style={{display: 'flex' , minHeight: '123px', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Loading />  
                  </div>
                )
              }
              <div className="modal-footer">
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  id="rate-btn"
                  sx={{
                    width: "55%",
                    bgcolor: "#f5c518",
                    ":hover": {
                      bgcolor: "#cea613",
                    },
                  }}
                  disabled={rating === 0 ? true : false}
                >
                  <Typography
                    sx={{
                      color: rating === 0 ? "gray" : "black",
                      letterSpacing: "0.04rem",
                      fontWeight: 600,
                    }}
                  >
                    Rate
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default RatingModal;
