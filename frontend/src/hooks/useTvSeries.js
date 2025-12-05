import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTvSeries } from "../utils/movieSlice";

const useTvSeries = () => {

  const dispatch = useDispatch();
  const tvSeries = useSelector((store) => store.movies?.tvSeries);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetch(
           "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
          ,API_OPTIONS
        );
        const json = await data.json();
        dispatch(addTvSeries(json.results)); 
        
        
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    if (!tvSeries) fetchMovies();
  }, []);

};

export default useTvSeries;
