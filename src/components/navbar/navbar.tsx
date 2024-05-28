import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHospitalSymbol,
  faSignOut,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="/icons8-caduceus-80.png" alt="health icon" />
      </div>
      <nav className="nav-container">
        <ul className="nav-items">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} color="#213cd9" />
              <p>Home</p>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to="/consultations" className="nav-link">
              <FontAwesomeIcon icon={faHospitalSymbol} color="#213cd9" />
              <p>Consultations</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/patients" className="nav-link">
              <FontAwesomeIcon icon={faUser} color="#213cd9" />
              <p>Patients</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link">
              <FontAwesomeIcon icon={faCog} color="#213cd9" />
              <p>Settings</p>
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-footer">
          <li className="nav-item">
            <NavLink to="/log-out" className="nav-link">
              <FontAwesomeIcon icon={faSignOut} color="#213cd9" />
              <p>Log Out</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
