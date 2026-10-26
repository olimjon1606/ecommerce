
import React from "react";
import ".././style.css"
import ".././react-fixes.css"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <div className="inner">

        {/* SOCIAL LINKS */}
        <ul className="social-links js-social-links">

          {/* INSTAGRAM */}
          <li className="item">
            <a
              title="Instagram - Adil Architects"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/adil_architects/"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>

          {/* BEHANCE */}
          <li className="item">
            <a
              title="Behance - Adil Architects"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.behance.net/Adilbey"
              aria-label="Behance"
            >
              <i className="fab fa-behance"></i>
            </a>
          </li>

        </ul>

        {/* FOOTER CONTENT */}
        <div className="footer-content text-section wysiwyg">
          <p>Architecture &amp; Interior Design Studio</p>

          <p>
            <b>© </b>
            Adil Architects {currentYear}
          </p>

          <p>
            All rights reserved. Unauthorized use or reproduction
            of website materials is prohibited.
          </p>

          <p>
            <a href="/portfolio">Portfolio</a>
          </p>
        </div>

        {/* LEGAL LINKS */}
        <div className="legal-links wysiwyg">
          <a href="/terms">Terms &amp; Conditions</a>
          {", "}
          <a href="/privacy">Privacy Policy</a>
        </div>

      </div>
    </footer>
  );
}
