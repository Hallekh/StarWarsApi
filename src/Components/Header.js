import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

function Navbar() {
  return (
    <div>
        <nav className="navbar">
            <div className="container">
                <Link class="navbar-brand" to="#">
                    <img src={require("./img/Tales-of-the-Jedi-Nueva-serie-animada-Star-Wars-925x470.png")} alt="logoStarWars" width="220" height="120"/>
                </Link>
                <a href='https://www.linkedin.com/in/halyna-lekhnovska/'>LinkedIn</a>
                <a href='https://github.com/Hallekh'>GitHub</a>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;