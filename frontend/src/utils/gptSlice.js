import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        perplexityMovies: null,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleGptSearchView : (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addPerplexityResult: (state,action) => {
            const {movieNames,movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults; 
        }
    }
});

export const {toggleGptSearchView, addPerplexityResult} = gptSlice.actions;

export default gptSlice.reducer;