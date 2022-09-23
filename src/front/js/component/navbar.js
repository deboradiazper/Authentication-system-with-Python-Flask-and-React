import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Refresh</span>
        </Link>
      </div>
    </nav>
  );
};
