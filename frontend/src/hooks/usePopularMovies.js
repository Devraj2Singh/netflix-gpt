import { useEffect } from "react";
import { API_OPTIONS, } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {

  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies?.popularMovies );


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetch(
           "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
          ,API_OPTIONS
        );
        const json = await data.json();
        dispatch(addPopularMovies(json.results)); 
        
        
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    if (!popularMovies) fetchMovies();
  }, []);

};

export default usePopularMovies;
