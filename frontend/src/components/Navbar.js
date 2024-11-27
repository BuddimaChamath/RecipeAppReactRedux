import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-book-half me-2"></i>
          Recipe Tracker
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarActions" 
          aria-controls="navbarActions" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarActions">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item me-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active font-weight-bold' : ''}`
                }
              >
                <i className="bi bi-house-fill me-1"></i>
                Home
              </NavLink>
            </li>
          </ul>
          
          <div className="d-flex">
            <Link 
              to="/add-recipe" 
              className="btn btn-success me-2"
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Recipe
            </Link>
            {/* Avoid direct window reload, consider state management if necessary */}
            <button 
              className="btn btn-outline-light"
              onClick={() => window.location.reload()} 
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
