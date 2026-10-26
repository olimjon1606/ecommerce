import React, { useEffect, useRef, useState } from "react";
import { portfolioProjects } from "../data";

const AUTO_PLAY_DELAY = 4000;
const TRANSITION_DURATION = 650;

export default function Portfolio() {
  const projects = portfolioProjects.filter(
    (project) => project.images?.length > 0,
  );

  const count = projects.length;
  const canSlide = count > 1;

  // Duplicate projects on both ends for seamless looping.
  const slides = canSlide ? [...projects, ...projects, ...projects] : projects;

  // Start in the middle copy.
  const [activeIndex, setActiveIndex] = useState(canSlide ? count : 0);

  const [animated, setAnimated] = useState(true);

  const trackRef = useRef(null);
  const indexRef = useRef(canSlide ? count : 0);
  const movingRef = useRef(false);
  const pendingRef = useRef(0);
  const autoplayRef = useRef(null);
  const unlockRef = useRef(null);
  const resumeRef = useRef(null);

  const finishTransition = () => {
    movingRef.current = false;

    // Reposition invisibly to the middle copy.
    if (indexRef.current >= count * 2) {
      indexRef.current -= count;
      setAnimated(false);
      setActiveIndex(indexRef.current);
    } else if (indexRef.current < count) {
      indexRef.current += count;
      setAnimated(false);
      setActiveIndex(indexRef.current);
    }

    // Handle clicks received during an animation.
    if (pendingRef.current > 0) {
      pendingRef.current -= 1;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          advance();
        });
      });
    }
  };

  const advance = () => {
    if (!canSlide) return;

    if (movingRef.current) {
      pendingRef.current += 1;
      return;
    }

    movingRef.current = true;

    clearTimeout(unlockRef.current);

    // Restore animation after an invisible loop reset.
    setAnimated(true);

    indexRef.current += 1;
    setActiveIndex(indexRef.current);

    // Safety fallback if transitionend doesn't fire.
    unlockRef.current = setTimeout(() => {
      if (movingRef.current) {
        finishTransition();
      }
    }, TRANSITION_DURATION + 100);
  };

  const scheduleAutoplay = () => {
    clearTimeout(autoplayRef.current);

    if (!canSlide) return;

    autoplayRef.current = setTimeout(() => {
      advance();
      scheduleAutoplay();
    }, AUTO_PLAY_DELAY);
  };

  const handleCardClick = () => {
    if (!canSlide) return;

    // Move immediately instead of waiting 4 seconds.
    advance();

    // Restart the autoplay countdown.
    scheduleAutoplay();
  };

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current) return;
    if (event.propertyName !== "transform") return;

    clearTimeout(unlockRef.current);
    finishTransition();
  };

  useEffect(() => {
    scheduleAutoplay();

    return () => {
      clearTimeout(autoplayRef.current);
      clearTimeout(unlockRef.current);
      clearTimeout(resumeRef.current);
    };
  }, [count]);

  useEffect(() => {
    if (!animated) {
      // Ensure the browser applies the invisible reposition
      // before enabling transitions again.
      resumeRef.current = setTimeout(() => {
        setAnimated(true);
      }, 40);
    }

    return () => clearTimeout(resumeRef.current);
  }, [animated]);

  return (
    <>
      {/* PORTFOLIO HEADING */}
      <div
        id="section-17284230"
        className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-accent"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">
              <section
                className="section-container text-section -default wysiwyg"
                id="section-17284231"
              >
                <h2 align="center">Examples of My Work</h2>

                <p style={{ textAlign: "center" }}>
                  Below is a selection of my projects. You can explore more work
                  and details in my portfolio.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* INFINITE CENTERED PORTFOLIO CAROUSEL */}
      <div
        id="section-17520213"
        className="sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-accent"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">
              <section
                className="section-container strip-section -default strip js-strip"
                data-shuffle="false"
                data-delay="4000"
                data-animation="pause"
                data-speed="100"
                id="section-17520214"
              >
                <div className="portfolio-carousel-viewport">
                  <div
                    ref={trackRef}
                    className="slides js-slides js-next portfolio-carousel-track"
                    onTransitionEnd={handleTransitionEnd}
                    style={{
                      transform: `translate3d(
                        calc(
                          50vw - var(--portfolio-slide-width) / 2 -
                          ${activeIndex} * (var(--portfolio-slide-width) + var(--portfolio-gap))
                        ),
                        0,
                        0
                      )`,
                      transition: animated
                        ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                        : "none",
                    }}
                  >
                    {slides.map((project, index) => (
                      <div
                        key={`${project.id}-${index}`}
                        className="slide js-slide"
                        role="button"
                        tabIndex={0}
                        aria-label={`Show next project after ${project.projectName}`}
                        onClick={handleCardClick}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            handleCardClick();
                          }
                        }}
                      >
                        <div className="lazy-image js-lazy-image is-loaded">
                          <img
                            className="lazyload lazyunload"
                            src={project.images[0]}
                            alt={project.title}
                            loading={
                              index >= count - 1 && index <= count + 2
                                ? "eager"
                                : "lazy"
                            }
                            draggable="false"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW ALL PROJECTS BUTTON */}
      <div
        id="section-17284234"
        className="sections-container -full-width -top-align -small-pad-before -medium-pad-after -background-accent"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-lg-offset-3">
              <section
                className="section-container action-section -outline -center"
                id="section-17284235"
              >
                <a className="button -outline" href="/interier">
                  View All Projects
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
