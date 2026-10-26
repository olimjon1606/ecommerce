import React, { useEffect, useRef, useState } from "react";
import { portfolioProjects } from "../data";
import "../style.css";
import "./InterierViz.css";

/**
 * Interior visualization service page.
 * Add image paths below in order: slots 0–2 are the cover slider;
 * slots 3 onward are content and portfolio images.
 * Example: 0: "/images/interier-viz/cover-1.jpg",
 *          3: "/images/interier-viz/workflow.jpg",
 * You can add the images later without editing the JSX markup.
 */
// Every slot has a temporary image until you replace it with your own.
// Replace any index below with a different path when your renders are ready.
const temporaryImages = [
  "/images/render_01.jpg",
  "/images/render_02.jpg",
  "/images/render_03.jpg",
  "/images/render_04.jpg",
  "/images/render_05.jpg",
];
const imagePaths = {
  ...Object.fromEntries(
    Array.from({ length: 131 }, (_, index) => [
      index,
      temporaryImages[index % temporaryImages.length],
    ]),
  ),
  0: "/images/render_03.jpg",
  1: "/images/render_02.jpg",
  2: "/images/render_01.jpg",
  3: "/images/render_04.jpg",
  4: "/images/render_05.jpg",
  5: "/images/render_03.jpg",
  6: "/images/render_03.jpg",
  7: "/images/render_04.jpg",
};

// One carousel card per project, using its first image from data.js.
const projectSlides = portfolioProjects
  .map((project, index) => ({
    id: project.id ?? index,
    title: project.projectName || project.title || `Project ${index + 1}`,
    src: project.images?.[0],
  }))
  .filter((project) => typeof project.src === "string" && project.src.trim());

// Reuses the original Wfolio image wrapper and its class names.
function InteriorImage({ index, width, height, aspect }) {
  return (
    <div
      className="lazy-image is-loaded"
      data-role="lazy-image"
      data-width={width}
      data-height={height}
      data-aspect={aspect}
    >
      {imagePaths[index] ? (
        <img
          alt="Interior 3D visualization: photorealistic renders for designers and architects | Adil Architects"
          className=""
          style={{
            display: "block",
            opacity: 1,
            visibility: "visible",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={imagePaths[index]}
        />
      ) : null}
    </div>
  );
}

export default function InterierVis() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const portfolioTrackRef = useRef(null);

  // Three copies let the strip wrap seamlessly without jumping at the ends.
  const carouselItems =
    projectSlides.length > 1
      ? Array.from({ length: 3 }, (_, copy) =>
          projectSlides.map((project) => ({ ...project, copy })),
        ).flat()
      : projectSlides.map((project) => ({ ...project, copy: 0 }));

  const normalizePortfolio = () => {
    const track = portfolioTrackRef.current;
    if (!track || projectSlides.length < 2) return;
    const items = track.querySelectorAll(":scope > .slide");
    if (items.length < projectSlides.length * 3) return;
    const groupWidth =
      items[projectSlides.length].offsetLeft - items[0].offsetLeft;
    if (!groupWidth) return;
    if (track.scrollLeft >= groupWidth * 2 - 2) track.scrollLeft -= groupWidth;
    else if (track.scrollLeft < groupWidth - 2) track.scrollLeft += groupWidth;
  };

  const movePortfolio = (direction = 1) => {
    const track = portfolioTrackRef.current;
    if (!track || projectSlides.length < 2) return;
    const slides = Array.from(track.querySelectorAll(":scope > .slide"));
    if (!slides.length) return;

    // Use actual on-screen positions (not offsetLeft, which may have a
    // different offsetParent under Wfolio styles).
    const trackLeft = track.getBoundingClientRect().left;
    const current = track.scrollLeft;
    const positions = slides.map(
      (slide) => current + slide.getBoundingClientRect().left - trackLeft,
    );
    const next =
      direction > 0
        ? positions.find((left) => left > current + 3)
        : positions
            .slice()
            .reverse()
            .find((left) => left < current - 3);

    if (next !== undefined) {
      track.scrollTo({ left: next, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const track = portfolioTrackRef.current;
    if (!track || projectSlides.length < 2) return;
    const alignMiddle = () => {
      const slides = track.querySelectorAll(":scope > .slide");
      if (slides[projectSlides.length]) {
        track.scrollLeft = slides[projectSlides.length].offsetLeft;
      }
    };
    alignMiddle();
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(alignMiddle)
        : null;
    if (resizeObserver) resizeObserver.observe(track);
    const interval = window.setInterval(() => movePortfolio(1), 4000);
    let settleTimer;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(normalizePortfolio, 550);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(settleTimer);
      track.removeEventListener("scroll", onScroll);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % 3);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div
        className={"cover -bottom-sides js-cover"}
        style={{ position: "relative" }}
      >
        <div
          className="interior-react-cover-slider"
          style={{ position: "absolute", inset: 0, overflow: "hidden" }}
        >
          {[0, 1, 2].map((index) =>
            imagePaths[index] ? (
              <div
                key={index}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: activeSlide === index ? 1 : 0,
                  visibility: activeSlide === index ? "visible" : "hidden",
                  transition: "opacity 900ms ease",
                  zIndex: activeSlide === index ? 2 : 1,
                }}
              >
                <img
                  src={imagePaths[index]}
                  alt={`Interior visualization cover ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ) : null,
          )}
        </div>
        <div className={"cover-wrapper js-cover-wrapper"}>
          <div className={"cover-bottom"}>
            <div className={"cover-content"}>
              <h1 className={"cover-header -small"}>
                {"Interior Visualization"}
              </h1>
              <a
                className={"js-order-trigger button cover-button"}
                href="/contacts"
              >
                {"Get in Touch"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <main className={"page-main sections-page js-main interior-viz-page"}>
        <div
          id={"section-17202114"}
          className={
            "sections-container -full-width -top-align -theme-pad-before -no-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17202115"}
                >
                  <h2 align={"center"} style={{ textAlign: "center" }}>
                    {
                      "3D Visualization for Those Who Value Their Reputation and Time"
                    }
                  </h2>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17197931"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-lg-8 col-lg-offset-2"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17197932"}
                >
                  <p style={{ textAlign: "center" }}>
                    {
                      "We create more than images. We create a communication tool for your clients. Our visualizations clearly show the intended result, helping clients understand the design before construction begins and reducing the risk of costly mistakes."
                    }
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17521913"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -reversible -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17521914"}
                >
                  <h3>{"What's Included:"}</h3>
                  <p>
                    <strong>{"Detailed Modeling:"}</strong>
                    {
                      " Creating a detailed 3D interior model based on your brief, including all key elements."
                    }
                  </p>
                  <p>
                    <strong>{"Materials and Lighting:"}</strong>
                    {
                      " Selecting and configuring realistic textures, materials, and lighting to achieve the desired atmosphere."
                    }
                  </p>
                  <p>
                    <strong>{"Thoughtful Composition:"}</strong>
                    {
                      " Choosing camera angles that showcase the design and highlight the project's strengths."
                    }
                  </p>
                  <p>
                    <strong>{"Final Rendering:"}</strong>
                    {" Delivering high-resolution "}
                    <b>{"3D visualizations "}</b>
                    {"ready for client presentations or your portfolio."}
                  </p>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -square -without-column-underlay -rounded"
                  }
                  id={"section-17521915"}
                >
                  <InteriorImage
                    index={3}
                    width={1920}
                    height={1920}
                    aspect={1.0}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310201"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310202"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17198237"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -four_fifths -without-column-underlay -rounded"
                  }
                  id={"section-17198238"}
                >
                  <InteriorImage
                    index={4}
                    width={2254}
                    height={2818}
                    aspect={0.7998580553584103}
                  />
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17198239"}
                >
                  <h3>{"A Clear Process for Predictable Results"}</h3>
                  <p>
                    <strong>{"Inquiry and Brief:"}</strong>
                    {
                      " You submit an inquiry, and we agree on a detailed project brief."
                    }
                  </p>
                  <p>
                    <strong>{"Agreement and Deposit:"}</strong>
                    {
                      " We agree on the terms, you make the initial payment, and work begins."
                    }
                  </p>
                  <p>
                    <strong>{"First Draft:"}</strong>
                    {" You receive the initial draft "}
                    <b>{"3D visualizations"}</b>
                    {" to review the composition and overall concept."}
                  </p>
                  <p>
                    <strong>{"Review and Approval:"}</strong>
                    {
                      " We make adjustments at the draft stage to minimize changes during final rendering."
                    }
                  </p>
                  <p>
                    <strong>{"Final Rendering:"}</strong>
                    {
                      " Once approved, we deliver the final high-quality renders."
                    }
                  </p>
                  <p>
                    <strong>{"Revisions:"}</strong>
                    {" Final adjustments can be made upon request when needed."}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310203"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310204"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17200604"}
          className={
            "sections-container -medium-width -top-align -medium-pad-before -medium-pad-after -background-accent"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={
                    "section-container text-section -default wysiwyg margin-toppp"
                  }
                  id={"section-17200605"}
                >
                  <h2 align={"center"}>{"3D Visualization Pricing"}</h2>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17749785"}
          className={
            "sections-container -medium-width -middle-align -medium-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container html-section -default"}
                  id={"section-17749786"}
                >
                  <article className={"interior-card"}>
                    <header className={"interior-card__head"}>
                      <span className={"interior-card__badge"}>
                        {"Interior"}
                      </span>
                      <h2 className={"service-card__title"}>{"$18.75/m²"}</h2>
                      <p className={"interior-card__terms"}>
                        {"Turnaround from 1 day"}
                      </p>
                    </header>
                    <div className={"interior-card__body"}>
                      <ul className={"interior-card__list"}>
                        <li>{"Minimum room price — $150"}</li>
                        <li>{"3DDD models — $2.81 per model"}</li>
                        <li>
                          {"Second round of revisions — 25% of room price"}
                        </li>
                        <li>{"Draft renders — free"}</li>
                      </ul>
                    </div>
                    <footer className={"interior-card__footer"}>
                      <a
                        className={"interior-card__button js-order-trigger"}
                        href="/contacts"
                      >
                        {"Order Interior Visualization"}
                      </a>
                    </footer>
                  </article>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -square -without-column-underlay -rounded"
                  }
                  id={"section-17749787"}
                >
                  <InteriorImage
                    index={5}
                    width={2559}
                    height={2559}
                    aspect={1.0}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17768237"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -square -without-column-underlay -rounded"
                  }
                  id={"section-17768238"}
                >
                  <InteriorImage
                    index={6}
                    width={1919}
                    height={1919}
                    aspect={1.0}
                  />
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container html-section -default"}
                  id={"section-17768239"}
                >
                  <article className={"interior-card"}>
                    <header className={"interior-card__head"}>
                      <span className={"interior-card__badge"}>
                        {"Exterior"}
                      </span>
                      <h2 className={"service-card__title"}>
                        {"$187.50/render"}
                      </h2>
                      <p className={"interior-card__terms"}>
                        {"Turnaround from 3 days"}
                      </p>
                    </header>
                    <div className={"interior-card__body"}>
                      <ul className={"interior-card__list"}>
                        <li>{"Minimum order — 3 renders"}</li>
                        <li>{"3DDD models — $2.81 per model"}</li>
                        <li>
                          {"Second round of revisions — 25% of room price"}
                        </li>
                        <li>{"Draft renders — free"}</li>
                      </ul>
                    </div>
                    <footer className={"interior-card__footer"}>
                      <a
                        className={"interior-card__button js-order-trigger"}
                        href="/contacts"
                      >
                        {"Order Exterior Visualization"}
                      </a>
                    </footer>
                  </article>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310207"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310208"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17523765"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -no-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17523766"}
                >
                  <h3 style={{ textAlign: "center" }}>
                    {"Additional Services"}
                  </h3>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17523644"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -reversible -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17523645"}
                >
                  <p>{"Additional artistic camera angle — $25"}</p>
                  <p>{"Additional room design option — 50% of room price"}</p>
                  <p>
                    {
                      "Walkthrough video / animation — $62.50 per second (30 frames)"
                    }
                  </p>
                  <p>{"360° panorama — $62.50"}</p>
                  <p>{"Furniture selection — 25% of room price"}</p>
                  <p>
                    {"Delivery of the completed 3D scene — 25% of room price"}
                  </p>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -square -without-column-underlay -rounded"
                  }
                  id={"section-17523646"}
                >
                  <InteriorImage
                    index={7}
                    width={1920}
                    height={1920}
                    aspect={1.0}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310237"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default "
          }
        >
          <div className={"sections-container-inner "}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310238"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17523909"}
          className={
            "sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-accent padding-top"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={
                    "section-container text-section -default wysiwyg  margin-topp"
                  }
                  id={"section-17523910"}
                >
                  <h2 align={"center"}>{"Selected Projects"}</h2>
                  <p style={{ textAlign: "center" }}>
                    {
                      "Below is a selection of our projects. Explore our portfolio for more work and project details."
                    }
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17523905"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-accent"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className="section-container strip-section -default strip js-strip"
                  id="section-17523906"
                >
                  <div className="controls js-controls">
                    <button
                      type="button"
                      className="prev js-prev"
                      aria-label="Previous projects"
                      onClick={(event) => {
                        event.stopPropagation();
                        movePortfolio(-1);
                      }}
                    >
                      <svg
                        className="carousel-arrow-icon"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M15 5l-7 7 7 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="next js-next"
                      aria-label="Next projects"
                      onClick={(event) => {
                        event.stopPropagation();
                        movePortfolio(1);
                      }}
                    >
                      <svg
                        className="carousel-arrow-icon"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="slides js-slides js-next height-size"
                    ref={portfolioTrackRef}
                  >
                    {carouselItems.map((project) => (
                      <div
                        className="slide js-slide"
                        key={`${project.copy}-${project.id}`}
                        role="button"
                        tabIndex={0}
                        aria-label={`Next project after ${project.title}`}
                        onClick={() => movePortfolio(1)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            movePortfolio(1);
                          }
                        }}
                      >
                        <div
                          className="lazy-image is-loaded height-img"
                          data-role="lazy-image"
                        >
                          <img
                            src={project.src}
                            alt={project.title}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17523848"}
          className={
            "sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-accent margin-bottom"
          }
        >
          <div
            className={"sections-container-inner margin-top-bt margin-bottom"}
          >
            <div className={"row"}>
              <div className={"col-sm-12 col-lg-6 col-lg-offset-3"}>
                <section
                  className={
                    "section-container action-section -outline -center"
                  }
                  id={"section-17523849"}
                >
                  <a className={"button -outline"} href={"/interier"}>
                    {"View All Projects"}
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310249"}
          className={
            "sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310250"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17200812"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -reversible -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17200813"}
                >
                  <h3 style={{ textAlign: "left" }}>
                    {"Visualization That Saves You Time and Money"}
                  </h3>
                  <p>
                    <b>{"Cheap 3D visualization can be costly"}</b>
                    {
                      ". Weak visuals create uncertainty for clients. Uncertainty leads to revisions, and revisions mean more work for the "
                    }
                    <b>{"3D artist"}</b>
                    {
                      " and more of your time lost. In the end, the cost can exceed the initial savings."
                    }
                  </p>
                  <p>
                    <b>{"Our work saves you time."}</b>
                    {
                      " We deliver quality work efficiently. With a clear brief, you can approve realistic images within the first few review rounds and focus on your next projects."
                    }
                  </p>
                  <p>
                    <b>{"An artistic eye is essential, not optional."}</b>
                    {
                      " Our understanding of photography and composition helps us select strong angles, expressive lighting, and engaging visual stories. This is more than "
                    }
                    <b>{"3D visualization"}</b>
                    {"; it is imagery that presents your design at its best."}
                  </p>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -square -without-column-underlay -rounded"
                  }
                  id={"section-17200814"}
                >
                  <InteriorImage
                    index={127}
                    width={2559}
                    height={2559}
                    aspect={1.0}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310239"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310240"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17088067"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -four_fifths -without-column-underlay -rounded"
                  }
                  id={"section-17088068"}
                >
                  <InteriorImage
                    index={128}
                    width={1536}
                    height={1920}
                    aspect={0.8}
                  />
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17088069"}
                >
                  <h3 style={{ textAlign: "left" }}>
                    {"What You Get When Working With Us:"}
                  </h3>
                  <p>
                    <b>{"Deep Understanding of Your Project:"}</b>
                    {
                      " We ask detailed questions to understand your vision and requirements."
                    }
                  </p>
                  <p>
                    <b>{"Efficient Delivery:"}</b>
                    {
                      " An established workflow allows us to work efficiently without sacrificing detail, helping you meet your deadlines."
                    }
                  </p>
                  <p>
                    <b>{"Attention to Every Detail:"}</b>
                    {
                      " We carefully consider forms, textures, decor, and lighting — everything that makes an "
                    }
                    <b>{"interior visualization"}</b>
                    {".\n                  "}
                  </p>
                  <p>
                    <b>{"Clear Communication:"}</b>
                    {
                      " We keep you informed at every stage and review drafts together to achieve the best final result."
                    }
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310241"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310242"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17768436"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container html-section -default"}
                  id={"section-17768437"}
                >
                  <article className={"service-card"}>
                    <header className={"service-card__head"}>
                      <h2 className={"service-card__title"}>
                        {"Project Brief"}
                      </h2>
                      <p className={"service-card__terms"}>
                        {
                          " A detailed project brief is one of the most important parts of 3D visualization and design. The clearer the brief, the more accurate and predictable the result."
                        }
                      </p>
                    </header>
                    <div className={"service-card__body"}>
                      <p>
                        <strong>{"Recommended Brief Contents:"}</strong>
                      </p>
                      <ul className={"service-card__list"}>
                        <li>
                          {"Document with links to materials and furniture"}
                        </li>
                        <li>{"Plans and elevations in DWG format"}</li>
                        <li>{"Mood board with reference images"}</li>
                      </ul>
                    </div>
                    <footer className={"service-card__footer"}>
                      <a
                        name={"button"}
                        href={"https://disk.yandex.ru/d/2qeev-IN6t0feQ"}
                        className={"service-card__button"}
                        target={"_blank"}
                        rel={"noopener"}
                      >
                        {"Download a Sample Project Brief"}
                      </a>
                    </footer>
                  </article>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -landscape -without-column-underlay -rounded"
                  }
                  id={"section-17768438"}
                >
                  <InteriorImage
                    index={129}
                    width={1865}
                    height={1244}
                    aspect={1.4991961414790997}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310255"}
          className={
            "sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310256"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17088070"}
          className={
            "sections-container -medium-width -top-align -medium-pad-before -medium-pad-after -background-accent"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row margin-top"}>
              <div className={"col-sm-12 col-md-5"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17088071"}
                >
                  <h2>{"Frequently Asked Questions"}</h2>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6 col-md-offset-1"}>
                <section
                  className={
                    "section-container questions-list-section -default js-questions-list-section"
                  }
                  id={"section-17088072"}
                >
                  <div className={"question js-question"}>
                    <h4
                      className={"title js-question-title"}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === 0}
                      onClick={() => setOpenFaq(openFaq === 0 ? -1 : 0)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenFaq(openFaq === 0 ? -1 : 0);
                        }
                      }}
                    >
                      {"Why are your prices above the market average?"}
                      <span className={"close"} aria-hidden="true">
                        <span className="interior-faq-symbol">
                          {openFaq === 0 ? "×" : "+"}
                        </span>
                      </span>
                    </h4>
                    <div
                      className={"answer wysiwyg js-answer"}
                      style={{ display: openFaq === 0 ? "block" : "none" }}
                    >
                      <p>
                        {
                          " You are paying for more than an image. You are investing in a smooth design approval process and clear communication with your client. Our experience, artistic direction, and efficient workflow help "
                        }
                        <i>{"you "}</i>
                        {"save your most valuable resource — "}
                        <b>{"time"}</b>
                        {
                          ". A cheaper provider can end up costing more through delays, repeated revisions, and dissatisfied clients."
                        }
                      </p>
                    </div>
                  </div>
                  <div className={"question js-question"}>
                    <h4
                      className={"title js-question-title"}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === 1}
                      onClick={() => setOpenFaq(openFaq === 1 ? -1 : 1)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenFaq(openFaq === 1 ? -1 : 1);
                        }
                      }}
                    >
                      {"Can I find a cheaper option?"}
                      <span className={"close"} aria-hidden="true">
                        <span className="interior-faq-symbol">
                          {openFaq === 1 ? "×" : "+"}
                        </span>
                      </span>
                    </h4>
                    <div
                      className={"answer wysiwyg js-answer"}
                      style={{ display: openFaq === 1 ? "block" : "none" }}
                    >
                      <p>
                        {
                          " Absolutely. There are options for every budget, but the real question is the total cost. If inexpensive "
                        }
                        <b>{"3D visualization "}</b>
                        {
                          "leads to extra client meetings and project delays, is it really cheaper? We focus on the best balance of "
                        }
                        <strong>{"quality, speed, and final results"}</strong>
                        {".\xa0\xa0\n                      "}
                      </p>
                    </div>
                  </div>
                  <div className={"question js-question"}>
                    <h4
                      className={"title js-question-title"}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === 2}
                      onClick={() => setOpenFaq(openFaq === 2 ? -1 : 2)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenFaq(openFaq === 2 ? -1 : 2);
                        }
                      }}
                    >
                      {"How long does it take to visualize one room?"}
                      <span className={"close"} aria-hidden="true">
                        <span className="interior-faq-symbol">
                          {openFaq === 2 ? "×" : "+"}
                        </span>
                      </span>
                    </h4>
                    <div
                      className={"answer wysiwyg js-answer"}
                      style={{ display: openFaq === 2 ? "block" : "none" }}
                    >
                      <p>
                        {
                          " Timing depends on complexity. Typically, the process from brief to final renders takes 2–7 days. We confirm the schedule after reviewing your project brief."
                        }
                      </p>
                    </div>
                  </div>
                  <div className={"question js-question"}>
                    <h4
                      className={"title js-question-title"}
                      role="button"
                      tabIndex={0}
                      aria-expanded={openFaq === 3}
                      onClick={() => setOpenFaq(openFaq === 3 ? -1 : 3)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenFaq(openFaq === 3 ? -1 : 3);
                        }
                      }}
                    >
                      {"How is the final price calculated?"}
                      <span className={"close"} aria-hidden="true">
                        <span className="interior-faq-symbol">
                          {openFaq === 3 ? "×" : "+"}
                        </span>
                      </span>
                    </h4>
                    <div
                      className={"answer wysiwyg js-answer"}
                      style={{ display: openFaq === 3 ? "block" : "none" }}
                    >
                      <p>
                        {
                          " We provide a clear, fixed quote after reviewing your brief. Pricing depends on geometry, materials, the number of unique views, and deadlines. There are no hidden fees."
                        }
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17310289"}
          className={
            "sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12"}>
                <section
                  className={"section-container divider-section -space -space"}
                  id={"section-17310290"}
                >
                  <hr />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div
          id={"section-17088073"}
          className={
            "sections-container -medium-width -middle-align -small-pad-before -theme-pad-after -reversible -background-default"
          }
        >
          <div className={"sections-container-inner"}>
            <div className={"row"}>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={"section-container text-section -default wysiwyg"}
                  id={"section-17088074"}
                >
                  <h3>
                    {
                      "Ready to Work With a 3D Visualization Studio That Understands Your Goals?"
                    }
                  </h3>
                  <p>
                    {
                      " Contact us using whichever method is most convenient to discuss your project and receive a detailed quote."
                    }
                  </p>
                  <h3>{"+7 (903) 124-6911"}</h3>
                  <h3>
                    <a href={"mailto:info@artnway.ru"}>{"info@artnway.ru"}</a>
                  </h3>
                </section>
                <section
                  className={"section-container action-section -outline -left"}
                  id={"section-17088075"}
                >
                  <a
                    className={"button -outline"}
                    href={"https://t.me/+79031246911"}
                  >
                    <i className={"fab fa-telegram-plane"}></i>
                    {"Contact Us"}
                  </a>
                </section>
              </div>
              <div className={"col-sm-12 col-md-6"}>
                <section
                  className={
                    "section-container picture-section -default -panorama -without-column-underlay -rounded"
                  }
                  id={"section-17088076"}
                >
                  <InteriorImage
                    index={130}
                    width={2559}
                    height={1440}
                    aspect={1.7770833333333333}
                  />
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
