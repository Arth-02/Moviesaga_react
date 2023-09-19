import React from "react";
import "./review.css";
import useFetchData from "../../hooks/useFetchData";

const Review = ({ url }) => {
  const { data, loading, error } = useFetchData(url);

  return (
    <div className="review-container">
        {console.log(data)}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data &&
        data?.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <div className="review-title">{review.title}</div>
              <div className="review-rating">{review.rating}</div>
            </div>
            <div className="review-body">{review.body}</div>
            <div className="review-author">{review.author}</div>
          </div>
        ))}
    </div>
  );
};

export default Review;
