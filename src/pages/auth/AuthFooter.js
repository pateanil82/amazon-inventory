import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg={6} className="order-lg-last">
            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <Link className="nav-link">
                  Terms &amp; Condition
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  Privacy Policy
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  Help
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-start">
              <p className="text-soft">&copy; 2024 Inventory.</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
