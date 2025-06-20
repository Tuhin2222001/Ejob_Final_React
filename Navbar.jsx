import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2">
        <NavLink className="navbar-brand mb-0 h1 py-2" to="/" style={{color:"#f9c74f"}}>
          <i className="bi bi-camera-reels"></i> Movie app
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto nav-content d-flex align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-house-door"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                <i className="bi bi-film"></i> Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tvshows">
                <i className="bi bi-tv"></i> TV shows
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/leaderboard">
                <i className="bi bi-trophy"></i> Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <i className="bi bi-people-fill"></i> Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search bar below navbar */}
      <div className=" pt-4 ">
        <div className="search-bar-container position-relative  d-flex justify-content-center">
          <input
          type="text"
          className=" search-control"
          placeholder="Search for movies..."
          style={{ width: "90%", maxWidth: "1500px" }}
        />
        <i className="bi bi-search search-icon"></i>
        </div>
        
      </div>
    </>
  );
};

export default Navbar;
