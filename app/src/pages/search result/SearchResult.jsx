import React, { useEffect } from "react";
import "./search-result.css";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const SearchResult = () => {
  let [searchParams] = useSearchParams();

  const { data, loading, error } = useFetchData(
    `https://api.themoviedb.org/3/search/multi?api_key=ace3eeed99f6d9d19e61456a520cda0b&&query=${searchParams.get(
      "q"
    )}`
  );

  return (
    <>
      {console.log(searchParams.get("q"))}
      {data && console.log(data)}
    </>
  );
};

export default SearchResult;
