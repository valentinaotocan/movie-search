import { useState } from "react";

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
  Year: string;
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleFetch() {
    // Before calling the API
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=5d763802`
      );
      if (response.ok) {
        const data = await response.json();
        setMovies(data.Search);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      // After response is received
      setLoading(false);
    }
  }

  return (
    <section className="movie">
      <h1>Enter name of a movie:</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // const form = event.currentTarget
          // const data = new FormData(form)
          // const query = data.get('query')
          // if (typeof query !== 'string') {
          //   throw new Error('query ne postoji, ups!')
          // }
          handleFetch();
        }}
      >
        <input
          type="text"
          // name="query"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movie__container">
        {loading && <p className="movie__container__loading">Loading...</p>}
        {error && <p>Ooooooops! Something went wrong.</p>}
        {!loading && typeof movies === "undefined" && (
          <p className="movie__container__not-exist">
            Oops! The movie doesn't exist.
          </p>
        )}
        {!loading &&
          typeof movies !== "undefined" &&
          movies.map((movie) => {
            return (
              <div
                key={movie.imdbID}
                className="movie__container__content"
                style={{ backgroundImage: `url(${movie.Poster})` }}
              >
                <div className="movie__container__content__text">
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
