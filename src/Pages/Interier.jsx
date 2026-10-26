
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { portfolioProjects } from "../data";
import { getProjectUrl } from "../utils/projectUrl";

import "../style.css";

export default function Interier() {
  // FILTER INTERIOR PROJECTS ONLY
  const interiorProjects = portfolioProjects.filter((project) => {
    const type = String(project.type || "")
      .trim()
      .toLowerCase();

    return ["interior", "interier", "интерьер"].includes(type);
  });

  // ONLY INTERIOR PROJECT IMAGES CAN BE BANNERS
  const bannerImages = interiorProjects
    .map((project) => project.images?.[0])
    .filter((image) => typeof image === "string" && image.trim().length > 0);

  // CHOOSE A RANDOM INTERIOR IMAGE ON PAGE LOAD
  const [bannerImage] = useState(() => {
    if (bannerImages.length === 0) return "";

    const randomIndex = Math.floor(Math.random() * bannerImages.length);

    return bannerImages[randomIndex];
  });

  return (
    <main className="page-main sections-page js-main">
      {/* =====================================
          LARGE INTERIOR BANNER
      ===================================== */}

      <div
        className="sections-container -full-width -top-align -no-pad-before -no-pad-after -background-image"
        style={{
          position: "relative",
          width: "100%",
          height: "75vh",
          minHeight: "480px",

          backgroundImage: bannerImage
            ? `linear-gradient(
                to bottom,
                rgba(0,0,0,0.08) 30%,
                rgba(0,0,0,0.55) 100%
              ), url("${bannerImage}")`
            : "none",

          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#252525",
        }}
      >
        <div
          className="sections-container-inner"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maxWidth: "none",
            padding: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "75px",
              left: "max(35px, 4vw)",
              zIndex: 2,
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(38px, 4vw, 64px)",
                fontWeight: 400,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Interiors
            </h1>
          </div>
        </div>
      </div>

      {/* =====================================
          INTRODUCTION SECTION
      ===================================== */}

      <div className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default">
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">
              <section className="section-container text-section -default wysiwyg">
                <h2>Ideas Brought to Life</h2>

                <p>
                  Each of these projects is more than just a collection of{" "}
                  <b>3D visualizations</b>. It tells the story of a genuine
                  collaboration — how architectural drawings and design
                  concepts are transformed into interiors that feel real,
                  inviting you to explore every detail.
                </p>

                <p>
                  This portfolio brings together projects where we worked
                  alongside designers throughout the entire process:
                  from the initial sketches to the final renderings
                  that helped bring the designs to approval and move
                  them toward construction.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          INTERIOR PORTFOLIO GRID
      ===================================== */}

      <div className="sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-default">
        <div className="sections-container-inner timmy">
          <div className="row">
            <div className="col-sm-12">
              <section className="section-container">
                <div
                  className="listing js-listing"
                  data-format="four_fifths"
                  data-hover="underline"
                >
                  {interiorProjects.map((project) => (
                    <div
                      className="listing-item js-listing-item"
                      key={project.id}
                    >
                      {/* PROJECT LINK — NAME + ID */}
                      <Link
                        className="listing-link"
                        to={getProjectUrl(project)}
                      >
                        {/* FIRST PROJECT IMAGE */}
                        <div className="lazy-image js-lazy-image is-loaded">
                          <img
                            src={project.images?.[0]}
                            alt={project.title || project.projectName}
                            loading="lazy"
                            style={{
                              opacity: 1,
                              visibility: "visible",
                              width: "100%",
                            }}
                          />
                        </div>

                        {/* PROJECT TITLE */}
                        <div className="listing-caption">
                          <div className="listing-title">
                            <span>{project.projectName}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* EMPTY STATE */}
                {interiorProjects.length === 0 && (
                  <p style={{ textAlign: "center" }}>
                    No interior projects found.
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
