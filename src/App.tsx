import { useState, useMemo } from "react";
import SkeletonLoader from "./SkeletonLoader";
import Dropdown from "./Dropdown";
import debounce from "lodash.debounce";

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
  const [dropdownItems, setDropdownItems] = useState<string[]>([]);

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
      setLoading(false);
    }
  }

  function handleItemClick(item: string) {
    setQuery(item);
    setDropdownItems([]);
  }

  function handleClear() {
    setQuery("");
    setMovies([]);
    setError(false);
  }

  const autocomplete = useMemo(() =>
      debounce(async (q: string) => {
        if (q) {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${q}&apikey=5d763802`
          );
          const data = await response.json();
          if (data.Search) {
            const titles = data.Search.map((movie: Movie) => movie.Title);
            // Remove duplicates and ignore case sensitivity
            const uniqueTitles = [...new Set(titles)].map((title) =>
              String(title)
            );
            setDropdownItems(uniqueTitles);
          } else {
            setDropdownItems([]);
          }
        } else {
          setDropdownItems([]);
        }
      }, 300),
    []
  );


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
            autocomplete(event.target.value);
          }}
        />
        <Dropdown items={dropdownItems} onItemClick={handleItemClick} />
        <div className="btn">
          <button type="submit">Search</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>

      <div className="movie__container">
        {loading && <SkeletonLoader />}
        {error && <p className="message">Ooooooops! Something went wrong.</p>}
        {!loading && typeof movies === "undefined" && (
          <p className="message">Oops! The movie doesn't exist.</p>
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
