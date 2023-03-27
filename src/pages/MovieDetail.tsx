import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";

interface Movie {
  Title: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Released: string;
}

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieDetail() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${id}&apikey=5d763802`
        );
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
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
    fetchMovieDetail();
  }, [id]);

  return (
    <section className="movie">
      {loading && <SkeletonLoader />}
      {error && <p>Oops! Something went wrong.</p>}
      {!loading && !error && movie && (
        <>
          <h1>{movie.Title}</h1>
          <div className="movie__container">
            <div
              className="movie__container__content"
              style={{ backgroundImage: `url(${movie.Poster})` }}
            >
              <div className="movie__container__content__text">
                <p>
                  <b>Released: </b>
                  {movie.Released}
                </p>
                <p>
                  <b>Genre:</b> {movie.Genre}
                </p>
                <p>
                  <b>Short plot: </b>
                  {movie.Plot}
                </p>
              </div>
            </div>
          </div>
          <div className="btn">
            <button onClick={() => navigate(-1)}>Go back</button>
          </div>
        </>
      )}
    </section>
  );
}

export default MovieDetail;
