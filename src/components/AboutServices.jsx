import React from "react";
import "../style.css";

import backgroundImage from "../images/004_interier.jpg";

export default function AboutServices() {
  return (
    <>
      {/* =========================================
          ABOUT SERVICES - ORIGINAL BACKGROUND
      ========================================= */}

      <div
        id="section-17520599"
        className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">
              <section
                className="section-container divider-section -space -space"
                id="section-17520600"
              >
                <hr />
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        id="section-17284220"
        className="sections-container -medium-width -middle-align -small-pad-before -small-pad-after -reversible -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            {/* LEFT SIDE - TEXT */}
            <div className="col-sm-12 col-md-6">
              <section
                className="section-container text-section -default wysiwyg"
                id="section-17284221"
              >
                <h2>What I Do</h2>

                <p>
                  I create realistic 3D visualizations of interiors and
                  architectural projects, paying close attention to lighting,
                  materials, and the overall atmosphere of each space. My goal
                  is to capture the mood and character of the future project as
                  accurately as possible.
                </p>

                <p>
                  I work on residential and commercial projects: visualizing
                  modern apartments, private houses, offices, showrooms, and
                  small architectural structures. I help clients imagine what
                  their spaces will look like even before construction begins.
                </p>

                <p>
                  I create product visualizations of furniture, lighting, decor,
                  and other products. These images are suitable for catalogs,
                  presentations, and advertising materials, helping highlight
                  the shape, texture, and details of each object.
                </p>
              </section>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="col-sm-12 col-md-6">
              <section
                className="section-container picture-section -default -square -without-column-underlay -rounded"
                id="section-17284222"
              >
                <div
                  className="lazy-image js-lazy-image is-loaded"
                  data-role="lazy-image"
                  data-width="2559"
                  data-height="2559"
                  data-aspect="1.0"
                >
                  <img
                    alt="Interior product visualization"
                    className="lazyload lazyunload"
                    src="https://i.wfolio.ru/x/ZnwKOSxHcnj5vcDU7umyFjqS1UkJ-_XJ/JWs5sOkALiokcvLoZq6VGu6qjct1XElK/wcrvet47zMvjP3l2UhD1NGNJaQ5SGtq2/nW6S7gCByHIQTww1zBuuTRKq7hbype5v/91NUNdTmKRyTOOIe4WBGWkK-tFzg31zc/yjGDLbTuL-eEg7Y1sUKtVUEA4sCFKmR_.jpg"
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          ORDER VISUALIZATION
          BACKGROUND IMAGE ONLY HERE
      ========================================= */}

      <div
        id="section-17284239"
        className="sections-container -full-width -top-align -medium-pad-before -medium-pad-after -background-accent"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0, 0, 0, 0.55),
              rgba(0, 0, 0, 0.55)
            ),
            url("${backgroundImage}")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-lg-offset-3">
              <section
                className="section-container text-section -default wysiwyg"
                id="section-17284240"
              >
                <h2 style={{ textAlign: "center" }}>
                  Order Interior Visualization
                </h2>

                <p style={{ textAlign: "center" }}>
                  Want to see your project come to life with realistic details
                  and atmosphere?
                  <br />
                  Send me a message, tell me about your idea, and I'll help
                  bring it to life through realistic visualizations.
                  <br />I enjoy unique projects and am always open to new
                  concepts.
                </p>
              </section>

              <section
                className="section-container action-section -outline -center"
                id="section-17284241"
              >
                <button
                  name="button"
                  type="button"
                  data-url="/forms/orders/new/77924?locale=ru&page_id=3746606"
                  className="js-order-trigger button -outline"
                  onClick={() => {
                    window.location.href = `mailto:info@artnway.com?subject=${encodeURIComponent("Request a Callback")}`;
                  }}
                >
                  Request a Callback
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
