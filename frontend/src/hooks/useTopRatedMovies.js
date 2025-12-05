import { useEffect } from "react";
import { API_OPTIONS, } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {

  const dispatch = useDispatch();

  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetch(
           "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
          ,API_OPTIONS
        );
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results)); 
        
        
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

   if(!topRatedMovies) fetchMovies();
  }, []);

};

export default useTopRatedMovies;
