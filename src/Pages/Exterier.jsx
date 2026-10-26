
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { portfolioProjects } from "../data";
import { getProjectUrl } from "../utils/projectUrl";

import "../style.css";

export default function Exterier() {

  // FILTER EXTERIOR PROJECTS ONLY
  const exteriorProjects = portfolioProjects.filter((project) => {
    const type = String(project.type || "")
      .trim()
      .toLowerCase();

    return ["exterior", "exterier", "экстерьер"].includes(type);
  });

  // GET IMAGES FROM EXTERIOR PROJECTS ONLY
  const bannerImages = exteriorProjects
    .flatMap((project) => project.images || [])
    .filter(
      (image) =>
        typeof image === "string" &&
        image.trim().length > 0
    );

  // RANDOM EXTERIOR BANNER IMAGE ON PAGE LOAD
  const [bannerImage] = useState(() => {
    if (bannerImages.length === 0) return "";

    const randomIndex = Math.floor(
      Math.random() * bannerImages.length
    );

    return bannerImages[randomIndex];
  });

  return (
    <main className="page-main sections-page js-main">

      {/* =====================================
          LARGE EXTERIOR BANNER
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
              Exteriors
            </h1>
          </div>
        </div>
      </div>

      {/* =====================================
          INTRODUCTION SECTION
      ===================================== */}

      <div
        className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">

              <section className="section-container text-section -default wysiwyg">

                <h2>Architecture in Detail</h2>

                <p>
                  Every architectural project is a combination of
                  form, materials, light, and the surrounding environment.
                  We create realistic exterior visualizations
                  that help you see the future appearance of a building
                  even before construction begins.
                </p>

                <p>
                  Our portfolio features modern private houses,
                  villas, and architectural projects.
                  We pay special attention to facade details,
                  natural lighting, landscaping, and atmosphere,
                  ensuring that every project looks convincing
                  and as realistic as possible.
                </p>

              </section>

            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          EXTERIOR PORTFOLIO GRID
      ===================================== */}

      <div
        className="sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">

              <section className="section-container">

                <div
                  className="listing js-listing"
                  data-format="four_fifths"
                  data-hover="underline"
                >

                  {exteriorProjects.map((project) => (

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
                            alt={
                              project.title ||
                              project.projectName
                            }
                            loading="lazy"
                            style={{
                              opacity: 1,
                              visibility: "visible",
                            }}
                          />

                        </div>

                        {/* PROJECT TITLE */}
                        <div className="listing-caption">

                          <div className="listing-title">
                            <span>
                              {project.title ||
                                project.projectName}
                            </span>
                          </div>

                        </div>

                      </Link>

                    </div>

                  ))}

                </div>

                {/* EMPTY STATE */}
                {exteriorProjects.length === 0 && (
                  <p style={{ textAlign: "center" }}>
                    No exterior projects found.
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
