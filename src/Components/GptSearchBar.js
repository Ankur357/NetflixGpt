import { useRef } from "react";
import openai from "../Utils/openai";
import { API_OPTIONS } from "../Utils/constant";
import { addGptMoviesResult } from "../Utils/gptSlice";
import { useDispatch } from "react-redux";
const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  //search movie in TMDB
  const searchMovieInTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptClick = async () => {
    const gptQuery =
      "Act as a movie recommandation system and suggest some movies for query " +
      searchText.current.value +
      ". Only give me name of 5 movies, comma separated like the exmple given ahead. Example result: Gadar, Avengers,Thor,Iron Man,Titanic";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    // console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    console.log(gptMovies);
    const data = gptMovies.map((movie) => searchMovieInTmdb(movie));

    const tmdbResults = await Promise.all(data);
    console.log(tmdbResults);
    dispatch(
      addGptMoviesResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder="What would yo like to search today ?"
        />
        <button
          onClick={handleGptClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
