import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Asegúrate de crear este archivo CSS para estilos personalizados

const Sidebar = () => {
    return (
        <div className="d-flex flex-column vh-100 sidebar bg-light">
            <h4 className="p-3">Menú</h4>
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
