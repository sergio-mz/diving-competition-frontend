import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column bg-light" style={{ width: '250px', height: '100vh' }}>
            <h2 className="p-3">Menú</h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Competencias</Link>
                </li>
                <li className="nav-item">
                    <Link to="/judges" className="nav-link">Jueces</Link>
                </li>
                <li className="nav-item">
                    <Link to="/divers" className="nav-link">Clavadistas</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dives" className="nav-link">Clavados</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
