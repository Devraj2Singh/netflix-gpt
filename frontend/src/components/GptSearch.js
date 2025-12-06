import { BG_URL_IMG } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className=" fixed inset-0 -z-10">
        <img className="w-full h-full object-cover " src={BG_URL_IMG} alt="Logo" />
      </div>
      <div className="">
      <GptSearchBar />
      <GptMovieSuggestion />
    </div> </>
  );
};

export default GPTSearch;
