import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { API_OPTIONS } from "../utils/constants";
import {addPerplexityResult} from "../utils/gptSlice"

const GptSearchBar = () => {
  const dispatch = useDispatch()
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi mil gaya";

    try {
      const response = await fetch("http://localhost:5000/api/perplexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sonar",
          messages: [{ role: "user", content: query }],
        }),
      });

      const data = await response.json();
      console.log("Message content:",data.choices[0].message.content);
      // Now use this data in your UI
      const perplexityMovies = data.choices[0].message.content.split(",");
          
      const promiseArray = perplexityMovies.map((movie) => {
        const trimmedMovie = movie.trim(); // Remove whitespace
        //console.log("Searching TMDB for:", trimmedMovie);
        return searchMovieTMDB(trimmedMovie);
      });

      const tmdbResults = await Promise.all(promiseArray);
      console.log("TMDB Results:", tmdbResults);
      
      dispatch(addPerplexityResult({movieNames: perplexityMovies,movieResults: tmdbResults}));

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pt-[30%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3  m-4 py-2 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
