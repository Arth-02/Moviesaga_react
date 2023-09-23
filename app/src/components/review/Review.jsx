import React, { useState, useCallback, useEffect, useContext } from "react";
import "./review.css";
import useFetchData from "../../hooks/useFetchData";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Collapse from "@mui/material/Collapse";
import GeneralModal from "../generalModal/GeneralModal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AuthContext from "../../contexts/Auth/AuthContext";

const Review = React.memo(({ url, movie }) => {
  const { isAuthenticated, tokens } = useContext(AuthContext);

  const { data, error } = useFetchData(url);

  const [expandedReviews, setExpandedReviews] = useState([]);
  const [userReview, setUserReview] = useState({});
  const [updatedData, setUpdatedData] = useState([]);
  const [reviewId, setReviewId] = useState(null);
  const [loading, setLoading] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }

  const handleExpandReview = useCallback((index) => {
    setExpandedReviews((prevExpandedReviews) => [
      ...prevExpandedReviews,
      index,
    ]);
  }, []);

  const handleCollapseReview = useCallback((index) => {
    setExpandedReviews((prevExpandedReviews) =>
      prevExpandedReviews.filter((i) => i !== index)
    );
  }, []);

  function isReviewExpanded(index) {
    return expandedReviews.includes(index);
  }

  function getAvatarBackgroundColor(index) {
    const colors = [
      "#F44336",
      "#E91E63",
      "#9C27B0",
      "#673AB7",
      "#3F51B5",
      "#2196F3",
      "#03A9F4",
      "#00BCD4",
      "#009688",
      "#4CAF50",
      "#8BC34A",
      "#CDDC39",
      "#FFEB3B",
      "#FFC107",
      "#FF9800",
      "#FF5722",
      "#795548",
      "#9E9E9E",
      "#607D8B",
    ];
    return colors[index % colors.length];
  }

  function getReviewContent(review) {
    const words = review?.content?.split(" ");
    if (words?.length > 50) {
      const truncatedWords = words.slice(0, 50);
      const truncatedContent = truncatedWords.join(" ");
      const remainingWords = words.slice(50);
      const remainingContent = remainingWords.join(" ");
      return (
        <>
          {truncatedContent}{" "}
          <Collapse in={isReviewExpanded(review.index)} timeout="auto">
            <span>{remainingContent}</span>
          </Collapse>
          {isReviewExpanded(review.index) ? (
            <span
              className="review-less-btn"
              onClick={() => handleCollapseReview(review.index)}
            >
              Less
            </span>
          ) : (
            <span
              className="review-more-btn"
              onClick={() => handleExpandReview(review.index)}
            >
              More
            </span>
          )}
        </>
      );
    } else {
      return review?.content;
    }
  }

  // Functions For Modal
  const [modalopen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const getUserReview = async () => {
    setLoading(true);
    await fetch(
      `http://127.0.0.1:8000/movieapp/userreview/?movie_id=${movie.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    )
      .then(async (res) => {
        if (res.status === 200) {
          const responseData = await res.json();
          console.log(responseData);

          responseData[0].review &&
            setUserReview({
              author: responseData[0]?.username,
              content: responseData[0]?.review,
              rating: responseData[0]?.rating,
              created_at: responseData[0]?.timestamp,
            });

          responseData[0].review && setReviewId(responseData[0]?.id);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getOtherUserReview = async () => {
    setLoading(true);
    await fetch(`http://127.0.0.1:8000/movieapp/review/`)
      .then(async (res) => {
        if (res.status === 200) {
          const responseData = await res.json();
          console.log(responseData);
          // setUpdatedData(responseData);
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserReview();
      // getOtherUserReview();
    }
    else {
      // getOtherUserReview();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data) {
      setUpdatedData(data);
    }

    if (userReview.author) {
      setUpdatedData((prevData) => [userReview, ...prevData]);
    }
  }, [userReview, data]);

  if (data?.length === 0) {
    return null;
  }

  return (
    <div className="review-container">
      <GeneralModal open={modalopen} handleClose={handleModalClose}>
        <UserReview
          handleClose={handleModalClose}
          movie={movie}
          userReview={userReview}
          reviewId={reviewId}
          getUserReview={getUserReview}
        />
      </GeneralModal>
      <div className="review-main-header">
        <h2
          className="provider-heading heading"
          style={{ marginBottom: "15px" }}
        >
          <span>Reviews</span>
          <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
        </h2>
        <button onClick={handleModalOpen} className="give-review-btn">
          Give Review
        </button>
      </div>
      <div className="review-wrapper">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {updatedData &&
          !loading &&
          updatedData?.map((review, index) => (
            <div key={index} className="review border-bottom">
              <div className="review-header">
                <Avatar sx={{ bgcolor: getAvatarBackgroundColor(index) }}>
                  {review?.author?.charAt(0).toUpperCase()}
                </Avatar>
                <div className="review-header-info">
                  <h3 className="review-author">{review?.author}</h3>
                  <p className="review-date">
                    {formatDate(review?.created_at)}
                  </p>
                </div>
              </div>
              <div className="review-body">
                <Rating
                  name="read-only"
                  value={parseInt(review?.author_details?.rating) / 2 || parseInt(review?.rating / 2)}
                  readOnly
                  max={5}
                  emptyIcon={
                    <StarOutlineRoundedIcon
                      sx={{ fontSize: 32, color: "white" }}
                    />
                  }
                  icon={<StarRoundedIcon sx={{ fontSize: 32 }} />}
                />
                <p className="review-content">
                  {getReviewContent({ ...review, index })}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export default Review;

const UserReview = ({
  handleClose,
  movie,
  userReview,
  reviewId,
  getUserReview,
}) => {
  const [rating, setRating] = useState(
    userReview?.rating ? userReview?.rating : 0
  );
  const [review, setReview] = useState(
    userReview?.content ? userReview?.content : ""
  );

  const { isAuthenticated, tokens } = useContext(AuthContext);

  const handelChange = (event) => {
    setRating(event.target.value);
  };

  const sendPatchRequest = async () => {
    let data = {
      movie_id: movie.id,
      rating: rating,
      review: review,
    };

    await fetch(`http://127.0.0.1:8000/movieapp/review/${reviewId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.json();
          console.log(responseData);
          handleClose();
          getUserReview();
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    if (reviewId) {
      await sendPatchRequest();
      return;
    }

    let data = {
      movie_id: movie.id,
      rating: rating,
      review: review,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
    };

    await fetch("http://127.0.0.1:8000/movieapp/review/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 201) {
          const responseData = res.json();
          console.log(responseData);
          handleClose();
          getUserReview();
        } else {
          console.log("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <IconButton
          className="close-btn"
          onClick={handleClose}
          sx={{
            ":hover": { backgroundColor: "#ffffff21" },
          }}
        >
          <CloseIcon sx={{ fontSize: 30, color: "white" }} />
        </IconButton>
      </div>
      <div className="modal-body">
        <div className="review-movie-name">
          {movie.title ? movie.title : movie.name}
        </div>
        <div className="review-user-name">
          <div className="review-user-left">
            <Avatar sx={{ bgcolor: "#f5c518" }}>
              {userReview.author[0].toUpperCase()}
            </Avatar>
            <span>{userReview.author}</span>
          </div>
          <div className="review-user-right">
            <span className="user-rating">{rating}/10</span>
          </div>
        </div>
        <div className="star-rating" style={{ paddingTop: "0px" }}>
          <Rating
            name="customized-10"
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
        <div className="review-text">
          <textarea
            name="review"
            id="review"
            cols="38"
            rows="6"
            value={review}
            placeholder="Write your review here..."
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="post-review-btn"
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
              letterSpacing: "0.02rem",
              fontWeight: 600,
            }}
          >
            Post Review
          </Typography>
        </Button>
      </div>
    </div>
  );
};
