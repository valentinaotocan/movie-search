import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/movie-search/" element={<Home />} />
        <Route path="/movie-search/:id" element={<MovieDetail />} />
      </Routes>
    </>
  );
}
export default App;
