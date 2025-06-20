import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./components/HomePage/Home";
import Navbar from "./components/Navbar/Navbar";
// import Movies from "./components/Movies/movies";
// import Trending from "./components/TrendingMovies/Trending";
// import Leaderboard from "./components/Leaderboard/Leaderboard";
// import TvShow from "./components/TVshows/TvShow";
import { lazy } from "react";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";

function App() {
  const LazyHome = lazy(() => import("./components/HomePage/Home"));
  const LazyTvshow = lazy(() => import("./components/TVshows/TvShow"))
  const LazyMovies = lazy(() => import("./components/Movies/Movies"));
  const LazyLeaderboard = lazy(() => import("./components/Leaderboard/Leaderboard"));
  const LazyHomeDetails = lazy(() => import("./components/HomePage/HomeDetails/HomeDetails"))
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<LazyHome />} />
            <Route path="/movies" element={<LazyMovies />} />
            <Route path="/leaderboard" element={<LazyLeaderboard />} />
            <Route path="/tvshows" element={<LazyTvshow />} />
            <Route path="/dashboard" element={<LazyHome />} />
            <Route path="/home/:id" element={<LazyHomeDetails/>}/>
          </Routes>
        </Suspense>

      </BrowserRouter>
    </>
  );
}

export default App;
