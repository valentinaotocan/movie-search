import { useState } from "react";

interface Movies {
  Title: string;
  imbdID: string;
  Poster: string;
  Year: string;
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movies[]>([]);

  async function handleFetch() {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=5d763802`
    );
    const data = await response.json();
    setMovies(data.Search);
    console.log(data.Search);
  }

  return (
    <section className="movie">
      <h1>Enter name of a movie:</h1>
      {/* <form> */}
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button onClick={handleFetch}>Search</button>
      {/* </form> */}
      <div className="movie__container">
        {movies.map((movie) => {
          return (
            <div key={movie.imbdID} className="movie__container__content" style={{backgroundImage: `url(${movie.Poster})`}}>
              <div
                className="movie__container__content__text"
                
              >
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default App;
