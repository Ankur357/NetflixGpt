import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrilerVideo } from "../Utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  //fetch trailer video & update store
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData ? filterData[0] : json.results[0];
    dispatch(addTrilerVideo(trailer));
  };
  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
