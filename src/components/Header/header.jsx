import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../style.css";
import logo from "./logo.png";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`page-header js-header ${isScrolled ? "header-scrolled" : ""}`}
    >
      <div className="inner">
        {/* LOGO */}
        <div className="logo js-logo">
          <Link className="logo-link" title="Adil Architects" to="/">
            <span
              className="logo-with-placeholder -light-logo"
              style={{ maxWidth: "72px" }}
            >
              <canvas
                className="logo-placeholder"
                width="2965"
                height="1224"
                style={{
                  maxWidth: "72px",
                  maxHeight: "30px",
                  marginTop: "-100px",
                }}
              />

              <img src={logo} alt="Adil Architects Logo" />
            </span>
          </Link>
        </div>

        {/* NAVIGATION */}
        <div className="menu js-menu">
          <ul className="menu-list js-menu-list -cover">
            {/* HOME */}
            <li className="menu-item js-menu-item" data-item-id="3746606">
              <Link className="link" to="/">
                Home
              </Link>
            </li>

            {/* PORTFOLIO */}
            <li
              className="menu-item js-menu-item -parent -category"
              data-item-id="3724161"
            >
              <span className="link">Portfolio</span>

              <div className="submenu js-submenu">
                <ul className="submenu-list">
                  <li className="menu-item js-menu-item" data-item-id="3701060">
                    <Link className="link" to="/interier">
                      Interiors
                    </Link>
                  </li>

                  <li className="menu-item js-menu-item" data-item-id="3729867">
                    <Link className="link" to="/exterier">
                      Exteriors
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* SERVICES */}
            <li
              className="menu-item js-menu-item -parent -category"
              data-item-id="3729904"
            >
              <span className="link">Services</span>

              <div className="submenu js-submenu">
                <ul className="submenu-list">
                  <li className="menu-item js-menu-item" data-item-id="3701062">
                    <Link className="link" to="/interior_vis">
                      Visualization
                    </Link>
                  </li>

                  {/* <li
                    className="menu-item js-menu-item"
                    data-item-id="3729418"
                  >
                    <Link
                      className="link"
                      to="/services/product"
                    >
                      Product Visualization
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* ABOUT */}
            <li className="menu-item js-menu-item" data-item-id="3717343">
              <Link className="link" to="/about">
                About Us
              </Link>
            </li>

            {/* CONTACTS */}
            <li className="menu-item js-menu-item" data-item-id="3701064">
              <Link className="link" to="/contacts">
                Contact
              </Link>
            </li>

            {/* REVIEWS */}
            {/* <li
              className="menu-item js-menu-item"
              data-item-id="3868925"
            >
              <Link className="link" to="/reviews">
                Reviews
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
