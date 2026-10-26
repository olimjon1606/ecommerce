import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { portfolioProjects } from "../data";
import { getProjectUrl } from "../utils/projectUrl";

import "../style.css";

export default function Project() {
  const { projectSlug } = useParams();
  const [activeImage, setActiveImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const lightboxRef = useRef(null);

  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
    dragRef.current = null;
  };

  const closeGallery = () => {
    setActiveImage(null);
    resetZoom();
  };

  const navigateGallery = (direction) => {
    setActiveImage((current) =>
      current === null || images.length === 0
        ? current
        : (current + direction + images.length) % images.length,
    );
    resetZoom();
  };

  // FIND CURRENT PROJECT
  const project = portfolioProjects.find(
    (item) => getProjectUrl(item) === `/${projectSlug}`,
  );

  // RESET PAGE ON PROJECT CHANGE
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(null);
    resetZoom();
  }, [projectSlug]);

  // PROJECT IMAGES
  const images = Array.isArray(project?.images)
    ? project.images.filter(
        (image) => typeof image === "string" && image.trim().length > 0,
      )
    : [];

  // LIGHTBOX KEYBOARD AND SCROLL LOCK
  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateGallery(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateGallery(-1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeImage, images.length]);

  // PREVENT PAGE SCROLL AND ZOOM THE PHOTO WITH THE MOUSE WHEEL
  useEffect(() => {
    if (activeImage === null) return;
    const node = lightboxRef.current;
    if (!node) return;

    const handleWheel = (event) => {
      event.preventDefault();
      setZoom((current) => {
        const next = Math.min(
          5,
          Math.max(1, current * (event.deltaY < 0 ? 1.15 : 1 / 1.15)),
        );
        if (next === 1) setOffset({ x: 0, y: 0 });
        return next;
      });
    };

    node.addEventListener("wheel", handleWheel, { passive: false });
    return () => node.removeEventListener("wheel", handleWheel);
  }, [activeImage]);

  const handlePointerDown = (event) => {
    if (zoom <= 1 || event.button !== 0) return;
    event.preventDefault();
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.offsetX + event.clientX - dragRef.current.x,
      y: dragRef.current.offsetY + event.clientY - dragRef.current.y,
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  if (!project) {
    return (
      <main className="page-main sections-page js-main">
        <div className="sections-container -medium-width -top-align -theme-pad-before -theme-pad-after -background-default">
          <div className="sections-container-inner">
            <section className="section-container text-section -default wysiwyg">
              <h1>Project not found</h1>
              <Link to="/">Back to home</Link>
            </section>
          </div>
        </div>
      </main>
    );
  }

  // PROJECT CATEGORY
  const isExterior = ["exterior", "exterier", "экстерьер"].includes(
    String(project.type || "")
      .trim()
      .toLowerCase(),
  );

  const categoryUrl = isExterior ? "/exterier" : "/interier";

  const categoryTitle = isExterior ? "Exteriors" : "Interiors";

  // RELATED PROJECTS
  const relatedProjects = portfolioProjects
    .filter((item) => {
      const itemIsExterior = ["exterior", "exterier", "экстерьер"].includes(
        String(item.type || "")
          .trim()
          .toLowerCase(),
      );

      return item.id !== project.id && itemIsExterior === isExterior;
    })
    .slice(0, 6);

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 20px",
    background: "#333333",
    color: "#ffffff",
    borderRadius: "30px",
    fontSize: "15px",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  };

  return (
    <>
      {/* =====================================
          PROJECT COVER
      ===================================== */}

      <div
        className="cover -bottom-sides js-cover"
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          minHeight: "480px",
          overflow: "hidden",
        }}
      >
        <div
          className="slider js-slider -overlay"
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <div className="slider-viewport js-slider-viewport">
            <div className="slides js-slides js-next">
              <div className="slide js-slide -visible">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {images[0] && (
                    <img
                      src={images[0]}
                      alt={project.title || project.projectName}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        opacity: 1,
                        visibility: "visible",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COVER GRADIENT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* COVER TITLE — DIRECTLY POSITIONED ABOVE THE IMAGE */}
        <div
          className="project-cover-title"
          style={{
            position: "absolute",
            left: "max(35px, 3.2vw)",
            bottom: "30px",
            zIndex: 999,
            width: "calc(100% - 70px)",
            maxWidth: "1100px",
            pointerEvents: "none",
            transform: "none",
            opacity: 1,
            visibility: "visible",
          }}
        >
          <h1
            className="cover-header -small"
            style={{
              display: "block",
              position: "relative",
              color: "#ffffff",
              fontSize: "clamp(38px, 4vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
              padding: 0,
              opacity: 1,
              visibility: "visible",
              transform: "none",
              textAlign: "left",
            }}
          >
            {project.projectName}
          </h1>
        </div>
      </div>

      {/* =====================================
          MAIN PROJECT CONTENT
      ===================================== */}

      <main className="page-main sections-page js-main">
        {/* INTRODUCTION + PROJECT INFO */}
        <div className="sections-container -full-width -top-align -medium-pad-before -small-pad-after -background-default">
          <div className="sections-container-inner">
            <div className="row">
              <div className="col-sm-12">
                <section className="section-container text-section -default wysiwyg">
                  <div
                    style={{
                      maxWidth: "490px",
                      marginTop: "-50px",
                    }}
                  >
                    <h2
                      style={{
                        marginBottom: "18px",
                      }}
                    >
                      {project.title || project.projectName}
                    </h2>

                    {project.description && (
                      <p
                        style={{
                          marginBottom: "25px",
                        }}
                      >
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* PROJECT BADGES */}
                  {(project.clientName ||
                    project.area != null ||
                    project.year) && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "28px",
                      }}
                    >
                      {project.clientName && (
                        <span style={badgeStyle}>
                          Client {project.clientName}
                        </span>
                      )}

                      {project.area != null && (
                        <span style={badgeStyle}>
                          Area {project.area}
                          {typeof project.area === "number" ? " m²" : ""}
                        </span>
                      )}

                      {project.year && (
                        <span style={badgeStyle}>{project.year}</span>
                      )}
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            PROJECT STORYBOARD GALLERY
        ===================================== */}

        <div className="sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-default">
          <div className="sections-container-inner">
            <div className="row">
              <div className="col-sm-12">
                <section
                  className="section-container picture-set-section -storyboard js-picture-set-section-storyboard js-gallery"
                  data-columns="3-4"
                  data-pad="20"
                  data-gallery-initial-zoom="true"
                >
                  <div
                    className="project-gallery-storyboard"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                      gap: "20px",
                      width: "100%",
                    }}
                  >
                    {images.map((image, index) => {
                      const position = index % 5;

                      // FIRST TWO = LARGE
                      // NEXT THREE = SMALLER
                      const isLarge = position < 2;

                      return (
                        <div
                          className="piece"
                          data-type="photo"
                          key={`${project.id}-${index}`}
                          style={{
                            gridColumn: isLarge ? "span 3" : "span 2",
                            aspectRatio: isLarge ? "4 / 3" : "3 / 4",
                            position: "relative",
                            width: "100%",
                            minWidth: 0,
                            overflow: "hidden",
                            borderRadius: "16px",
                          }}
                        >
                          <div
                            className="inner"
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <a
                              className="link js-gallery-link"
                              href={image}
                              onClick={(event) => {
                                event.preventDefault();
                                setActiveImage(index);
                              }}
                              style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <div
                                className="lazy-image js-lazy-image is-loaded"
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  height: "100%",
                                  overflow: "hidden",
                                  borderRadius: "16px",
                                }}
                              >
                                <img
                                  src={image}
                                  alt={`${project.projectName} - ${index + 1}`}
                                  loading="lazy"
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    opacity: 1,
                                    visibility: "visible",
                                    cursor: "zoom-in",
                                  }}
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            DETAILED PROJECT DESCRIPTION
        ===================================== */}

        {project.detailedInfo && (
          <div className="sections-container -medium-width -top-align -medium-pad-before -medium-pad-after -background-accent">
            {" "}
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12">
                  <section className="section-container text-section -default wysiwyg">
                    <h2>About the Project</h2>

                    {String(project.detailedInfo)
                      .split(/\n\s*\n/)
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================
            CONTACT SECTION
        ===================================== */}

        <div className="sections-container -full-width -middle-align -medium-pad-before -medium-pad-after -reversible -background-default project-contact-section">
          <div
            className="sections-container-inner"
            style={{
              width: "100%",
              maxWidth: "1350px",
              margin: "0 auto",
              padding: "0 35px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="row"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                alignItems: "center",
                gap: "60px",
                width: "100%",
                margin: 0,
              }}
            >
              {/* LEFT SIDE - CONTACT DETAILS */}
              <div
                className="col-sm-12 col-md-6"
                style={{
                  width: "100%",
                  maxWidth: "none",
                  minWidth: 0,
                  padding: 0,
                  float: "none",
                }}
              >
                <section className="section-container text-section -default wysiwyg">
                  <h2
                    style={{
                      fontSize: "clamp(32px, 3vw, 44px)",
                      fontWeight: 400,
                      lineHeight: 1.05,
                      margin: "0 0 18px",
                      maxWidth: "570px",
                    }}
                  >
                    Order{" "}
                    {isExterior
                      ? "Exterior Visualization"
                      : "Interior Visualization"}
                  </h2>
                  <p style={{ margin: "0 0 6px" }}>
                    <a
                      href="tel:+79031246911"
                      style={{
                        fontSize: "28px",
                        lineHeight: 1.3,
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      +7 (903) 124-6911
                    </a>
                  </p>
                  <p style={{ margin: 0 }}>
                    <a
                      href="mailto:info@artnway.com"
                      style={{
                        fontSize: "28px",
                        lineHeight: 1.3,
                        color: "inherit",
                        textDecoration: "underline",
                      }}
                    >
                      info@artnway.com
                    </a>
                  </p>
                </section>
                <section
                  className="section-container action-section -outline -left"
                  style={{ marginTop: "28px" }}
                >
                  <a
                    className="button -outline"
                    href="https://t.me/Orifjonov_Olimjon"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      minWidth: "225px",
                      height: "58px",
                      padding: "0 24px",
                      border: "1px solid #ffffff",
                      borderRadius: "40px",
                      background: "transparent",
                      color: "#ffffff",
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    <span>➤</span> Contact Us
                  </a>
                </section>
              </div>

              {/* RIGHT SIDE - PROJECT IMAGE */}
              <div
                className="col-sm-12 col-md-6"
                style={{
                  width: "100%",
                  maxWidth: "none",
                  minWidth: 0,
                  padding: 0,
                  float: "none",
                }}
              >
                {images[0] && (
                  <section
                    className="section-container picture-section -default -panorama -without-column-underlay -rounded"
                    style={{ margin: 0, width: "100%" }}
                  >
                    <div
                      className="lazy-image js-lazy-image is-loaded"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "320px",
                        overflow: "hidden",
                        borderRadius: "16px",
                      }}
                    >
                      <img
                        src={images[0]}
                        alt={project.projectName}
                        loading="lazy"
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          opacity: 1,
                          visibility: "visible",
                        }}
                      />
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            CENTERED CATEGORY DIVIDER
        ===================================== */}

        <div className="sections-container -full-width -top-align -small-pad-before -small-pad-after -background-default">
          <div className="sections-container-inner">
            <section
              className="section-container labeled-divider-section"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                width: "100%",
              }}
            >
              <div style={{ height: "1px", background: "#555", flex: 1 }} />
              <Link
                to={categoryUrl}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  fontSize: "18px",
                }}
              >
                {categoryTitle}
              </Link>
              <div style={{ height: "1px", background: "#555", flex: 1 }} />
            </section>
          </div>
        </div>

        {/* =====================================
            RELATED PROJECTS GRID
        ===================================== */}

        {relatedProjects.length > 0 && (
          <div className="sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-default">
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12">
                  <section className="section-container">
                    <div
                      className="listing js-listing"
                      data-format="four_fifths"
                      data-hover="underline"
                    >
                      {relatedProjects.map((item) => (
                        <div
                          className="listing-item js-listing-item"
                          key={item.id}
                        >
                          <Link
                            className="listing-link"
                            to={getProjectUrl(item)}
                          >
                            <div className="lazy-image js-lazy-image is-loaded">
                              <img
                                src={item.images?.[0]}
                                alt={item.title || item.projectName}
                                loading="lazy"
                                style={{
                                  opacity: 1,
                                  visibility: "visible",
                                }}
                              />
                            </div>

                            <div className="listing-caption">
                              <div className="listing-title">
                                <span>{item.title || item.projectName}</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      {activeImage !== null && images.length > 0 && (
        <div
          ref={lightboxRef}
          className="aa-photo-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Project gallery"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <style>{`
            .aa-photo-viewer {
              position: fixed !important;
              inset: 0 !important;
              z-index: 2147483647 !important;
              background: #1e1e1e !important;
              color: #ddd !important;
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
              overflow: hidden !important;
              touch-action: none;
            }
            .aa-photo-viewer .aa-photo-counter {
              position: absolute;
              top: 15px;
              left: 16px;
              z-index: 5;
              font: 14px Arial, sans-serif;
              color: #ccc;
            }
            .aa-photo-viewer .aa-photo-toolbar {
              position: absolute;
              right: 12px;
              top: 6px;
              z-index: 6;
              display: flex;
              gap: 4px;
            }
            .aa-photo-viewer button {
              appearance: none;
              border: 0;
              background: transparent;
              color: #ddd;
              cursor: pointer;
              font: 28px Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
            }
            .aa-photo-viewer button:hover {
              color: white;
              background: rgba(255,255,255,.09);
            }
            .aa-photo-viewer .aa-photo-tool {
              width: 44px;
              height: 40px;
              font-size: 23px;
            }
            .aa-photo-viewer .aa-photo-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: 48px;
              height: 70px;
              z-index: 5;
              font-size: 32px;
            }
            .aa-photo-viewer .aa-photo-prev { left: 0; }
            .aa-photo-viewer .aa-photo-next { right: 0; }
            .aa-photo-viewer .aa-photo-image {
              display: block;
              max-width: calc(100vw - 110px);
              max-height: calc(100vh - 80px);
              width: auto;
              height: auto;
              object-fit: contain;
              user-select: none;
              -webkit-user-drag: none;
              touch-action: none;
            }
            @media (max-width: 600px) {
              .aa-photo-viewer .aa-photo-image {
                max-width: calc(100vw - 52px);
                max-height: calc(100vh - 80px);
              }
              .aa-photo-viewer .aa-photo-arrow { width: 26px; }
            }
          `}</style>

          <div className="aa-photo-counter">
            {activeImage + 1} / {images.length}
          </div>

          <div className="aa-photo-toolbar">
            <button
              type="button"
              className="aa-photo-tool"
              aria-label="Zoom in"
              title="Zoom in"
              onClick={() => setZoom((current) => Math.min(5, current * 1.25))}
            >
              ⊕
            </button>
            <button
              type="button"
              className="aa-photo-tool"
              aria-label="Reset zoom"
              title="Reset zoom"
              onClick={resetZoom}
            >
              ⛶
            </button>
            <button
              type="button"
              className="aa-photo-tool"
              aria-label="Close gallery"
              title="Close (Esc)"
              onClick={closeGallery}
            >
              ×
            </button>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className="aa-photo-arrow aa-photo-prev"
              aria-label="Previous image"
              onClick={() => navigateGallery(-1)}
            >
              ‹
            </button>
          )}

          <img
            className="aa-photo-image"
            src={images[activeImage]}
            alt={`${project.projectName} - ${activeImage + 1}`}
            draggable={false}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={() => {
              if (zoom > 1) resetZoom();
              else setZoom(2);
            }}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
          />

          {images.length > 1 && (
            <button
              type="button"
              className="aa-photo-arrow aa-photo-next"
              aria-label="Next image"
              onClick={() => navigateGallery(1)}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
