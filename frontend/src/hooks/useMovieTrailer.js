import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();


  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      const json = await data.json();

      // Safe checks so results never crashes
      const results = json?.results || [];

      const filterData = results.filter(
        (video) => video?.type === "Trailer"
      );

      const trailer = filterData.length ? filterData[0] : results[0] || null;

      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
      dispatch(addTrailerVideo(null));
    }
  };

  useEffect(() => {
    
    if (movieId) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
