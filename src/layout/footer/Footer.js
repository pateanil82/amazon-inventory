import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logo_inventory.svg";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div>
            <img src={Logo} alt="Logo" className="m-0 p-0 w-60 not_draggable" />
            <div className="nk-footer-copyright" style={{ fontSize: "0.7rem" }}>
              {" "}
              &copy; 2024 Inventory.
            </div>
          </div>
          <div className="nk-footer-links">
            <ul className="nav nav-sm">
              <li className="nav-item">
                <Link className="nav-link">Terms</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Privacy</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Help</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
