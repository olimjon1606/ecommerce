import React, { useEffect } from "react";
import hero1 from "./assets/i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/Lxg61C7a65qjRqNhrj3TPzO6StS4Pp7L/DuDXcN3B1EqW35_QC8VkIgvcy_xI-yQB/J6_yYkuzFC1R36y9S9S02g.jpg";
import hero2 from "./assets/i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/wQ9cNE2wy8_H_odyIa7_Nx1LfTE-97MS/ncUvXB5RkUzsvvooKnMvL1CzRkFtmc57/d1J4ZVrqEwsUJBMwI9SC2w.jpg";
import hero3 from "./assets/i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/7Wzr2Y62BSQzVVe2AHR9nIvt9hESjOh0/cjibr4-qW3e9ei2JgNvac1i77NLvdLQU/tcDIPHRrOA4CeJkAqwJJvg.jpg";
import hero4 from "./assets/i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/IXiuprV_h9CURNScCrLuTImD0_DbIwU2/H9VEkHN1NS4Pxbrj_nydIh4P_1NoH0zG/bGJjC1_qJkK2xSEXtyD9pQ.jpg";
import hero5 from "./assets/001_interier.jpg";
import ".././style.css";

function Hero() {
  useEffect(() => {
    const root = document.querySelector(".js-cover");
    if (!root) return;

    const slides = Array.from(root.querySelectorAll(".js-slide"));
    if (slides.length < 2) return;

    let index = 0;
    const showSlide = (nextIndex) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("-visible", i === nextIndex);
      });
    };

    showSlide(index);
    const timer = window.setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 6000);

    const downButton = root.querySelector(".js-cover-down-arrow");
    const handleScroll = () => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    };
    downButton?.addEventListener("click", handleScroll);

    return () => {
      window.clearInterval(timer);
      downButton?.removeEventListener("click", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="cover -bottom-sides js-cover -fullscreen">
        <div
          className="slider js-slider -overlay"
          data-delay="6000"
          data-mode="fill"
          data-shuffle="false"
        >
          <div className="slider-viewport js-slider-viewport">
            <div className="slides js-slides js-next">
              <div className="slide js-slide -visible">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="3000"
                  data-height="3000"
                  data-aspect="1.0"
                >
                  <canvas
                    className="placeholder"
                    width="3000"
                    height="3000"
                    style={{ backgroundColor: "#ad8061" }}
                  />
                  <img
                    alt="Interior Visualizer in Moscow | Kirill Bragin"
                    className="lazyload lazyunload"
                    src={hero1}
                  />
                </div>
              </div>
              <div className="slide js-slide">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="4000"
                  data-height="3000"
                  data-aspect="1.33333333"
                >
                  <canvas
                    className="placeholder"
                    width="4000"
                    height="3000"
                    style={{ backgroundColor: "#8e8075" }}
                  />
                  <img
                    alt="Interior Visualizer in Moscow | Kirill Bragin"
                    className="lazyload lazyunload"
                    src={hero2}
                  />
                </div>
              </div>
              <div className="slide js-slide">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="4000"
                  data-height="3000"
                  data-aspect="1.33333333"
                >
                  <canvas
                    className="placeholder"
                    width="4000"
                    height="3000"
                    style={{ backgroundColor: "#5b544c" }}
                  />
                  <img
                    alt="Interior Visualizer in Moscow | Kirill Bragin"
                    className="lazyload lazyunload"
                    src={hero3}
                  />
                </div>
              </div>
              <div className="slide js-slide">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="4000"
                  data-height="3000"
                  data-aspect="1.33333333"
                >
                  <canvas
                    className="placeholder"
                    width="4000"
                    height="3000"
                    style={{ backgroundColor: "#676155" }}
                  />
                  <img
                    alt="Interior Visualizer in Moscow | Kirill Bragin"
                    className="lazyload lazyunload"
                    src={hero4}
                  />
                </div>
              </div>
              <div className="slide js-slide">
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="4000"
                  data-height="3000"
                  data-aspect="1.33333333"
                >
                  <canvas
                    className="placeholder"
                    width="4000"
                    height="3000"
                    style={{ backgroundColor: "#9f7f66" }}
                  />
                  <img
                    alt="Interior Visualizer in Moscow | Kirill Bragin"
                    className="lazyload lazyunload"
                    src={hero5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cover-wrapper js-cover-wrapper -has-arrows">
          <div className="cover-bottom">
            <div className="cover-content">
              <h1 className="cover-header -medium">
                3D Visualizer — Kirill Bragin
              </h1>
              <p>Art n' Way</p>
              <button
                className="cover-down-arrow js-cover-down-arrow"
                type="button"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
