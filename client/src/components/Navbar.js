import React from "react";
// import { useNavigate } from 'react-router-dom'

function Navbar() {
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentuser"));
  function logout() {
    localStorage.removeItem('currentuser');
    window.location.href="/login";
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">
            PR BOOKINGS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-5">
              {user ? (
                <>
                  {/* <h1 style={{color:'white'}}>{user.name}</h1> */}
                  <a className="navbar-brand" href="/home">
                  <button
                      className="btn btn-primary"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >
                      Back
                    </button>
                      </a>


                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.name}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                      <a className="dropdown-item" href="#" onClick={logout}>
                        Logout
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/register"
                    >
                      REGISTER
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      LOGIN
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
      </nav>
    </div>
  );
}

export default Navbar;
