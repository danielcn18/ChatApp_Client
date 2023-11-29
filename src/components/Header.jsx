import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ username, logout, link, icon }) => {
    return (
        <div className="header">
            <h1><Link to="/">Chat App</Link></h1>
            <div className="aside">
                <p>Welcome {username}!</p>
                <Link to={link} className="btn"><i className={`bi ${icon}`}></i></Link>
                <button onClick={logout} className="btn"><i className="bi bi-box-arrow-right"></i></button>
            </div>
        </div>
    );
}

export default Header;