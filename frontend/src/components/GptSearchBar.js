import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addPerplexityResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

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
    if (!searchText.current.value) return;

    setLoading(true);

    const query =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi mil gaya";

    try {
      const response = await fetch("https://ai-backend-ja4e.onrender.com/", {
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
      console.log("Message content:", data.choices[0].message.content);

      const perplexityMovies =
        data.choices[0].message.content.split(",") ?? [];

      const promiseArray = perplexityMovies.map((movie) =>
        searchMovieTMDB(movie.trim())
      );

      const tmdbResults = await Promise.all(promiseArray);
      console.log("TMDB Results:", tmdbResults);

      dispatch(
        addPerplexityResult({
          movieNames: perplexityMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[30%] md:pt-[10%] flex flex-col items-center gap-4">
      <form
        className="w-full md:w-1/2 bg-black/70 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-zinc-900 text-white rounded-lg outline-none"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 hover:bg-red-800 text-white rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>

      {/* Netflix + Perplexity shimmer */}
      {loading && (
        <div className="w-full md:w-3/4 lg:w-2/3 space-y-6 mt-4">
          {/* Perplexity-style answer header */}
          <div className="flex gap-3 items-start">
            {/* Avatar shimmer */}
            <div className="w-10 h-10 rounded-full shimmer shimmer-avatar" />

            {/* Text shimmer */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded-md shimmer" />
              <div className="h-4 w-4/5 rounded-md shimmer" />
              <div className="h-4 w-3/5 rounded-md shimmer" />
            </div>
          </div>

          {/* Netflix-style row title shimmer */}
          <div className="h-5 w-32 rounded-md shimmer" />

          {/* Netflix-style horizontal cards */}
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex-none w-32 sm:w-40 md:w-44 aspect-[2/3] shimmer shimmer-card"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
