import { BG_URL_IMG } from "../utils/constants";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = ()=>{
    return <div>
         <div className=" fixed -z-10">
        <img
          src={BG_URL_IMG}
          alt="Logo"
        />
      </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
    </div>
}

export default GPTSearch;