import React from "react";
import "../style.css";

// The global Header and Footer are rendered by the app layout.
// Original Wfolio section IDs and class names are preserved.
export default function Contact() {
  return (
    <main className="page-main sections-page js-main">
      <div
        id="section-17088135"
        className="sections-container -medium-width -bottom-align -theme-pad-before -small-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-md-4"></div>
            <div className="col-sm-12 col-md-4">
              <section
                className="section-container picture-section -default -square -without-column-underlay -rounded"
                id="section-17088137"
              >
                <div className="lazy-image js-lazy-image">
                  <canvas
                    className="placeholder"
                    width="2560"
                    height="2562"
                    style={{ backgroundColor: "#141414" }}
                  ></canvas>
                  <img
                    alt="Contact an architectural visualization studio to discuss a project and request a quote"
                    className="lazyload lazyunload lazyloaded"
                    src="https://i.wfolio.ru/x/BoOk1BeR0FHc6lYirBdwiGljkVNCWyT3/01C7Z98q8Wk118pjw3DhyS0QkFh7gwpt/Wd65Z1BLObxWQV-NKB7OFysBNl6UUkuv/rWVgvrpV05Stix0g5CJuWGQ5iw9ZZ75G/1yA2_wXWoNPBouOksMCwVu-OWfe7-eU-/OHwackqExAjO5WNGDMhFfElmv-A10AZq.jpg"
                  />
                </div>
              </section>
            </div>
            <div className="col-sm-12 col-md-4"></div>
          </div>
        </div>
      </div>

      <div
        id="section-17214007"
        className="sections-container -medium-width -top-align -small-pad-before -small-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-lg-6 col-lg-offset-3">
              <section
                className="section-container text-section -default wysiwyg"
                id="section-17214008"
              >
                <h1 style={{ textAlign: "center" }}>
                  Interior Visualization Studio
                </h1>
                <p style={{ textAlign: "center" }}>
                  To discuss your project, please email or call us.
                </p>
                <p style={{ textAlign: "center" }}>
                  Office hours: Monday–Friday, 10:00 AM–8:00 PM.
                </p>
                <h3 style={{ textAlign: "center" }}>
                  <a href="mailto:info@artnway.com">info@artnway.com</a>
                </h3>
                <h3 style={{ textAlign: "center" }}>+7 (903) 124-6911</h3>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        id="section-17170523"
        className="sections-container -medium-width -middle-align -no-pad-before -xsmall-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-lg-offset-2">
              <section
                className="section-container action-section -outline -center -full"
                id="section-17170524"
              >
                <a className="button -outline" href="tel:+79031246911">
                  <i className="fal fa-phone"></i>Call Us
                </a>
              </section>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <section
                className="section-container action-section -outline -center -full"
                id="section-17170525"
              >
                <button
                  name="button"
                  type="button"
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

      <div
        id="section-17213998"
        className="sections-container -medium-width -middle-align -xsmall-pad-before -small-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4 col-lg-offset-2">
              <section
                className="section-container action-section -outline -center -full"
                id="section-17213999"
              >
                <a className="button -outline" href="https://wa.me/79031246911">
                  <i className="fab fa-whatsapp"></i>Message on WhatsApp
                </a>
              </section>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <section
                className="section-container action-section -outline -center -full"
                id="section-17214000"
              >
                <a className="button -outline" href="https://t.me/+79031246911">
                  <i className="fab fa-telegram-plane"></i>Message on Telegram
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        id="section-17186463"
        className="sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default"
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12">
              <section
                className="section-container divider-section -space -space"
                id="section-17186464"
              >
                <hr />
              </section>
            </div>
          </div>
        </div>
      </div>

      <div
        id="section-17186465"
        className="sections-container -full-width -top-align -medium-pad-before -xsmall-pad-after -background-accent"
      >
        {/* <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12 col-lg-8 col-lg-offset-2">
              <section
                className="section-container text-section -default wysiwyg"
                id="section-17186466"
              >
                <h3>Sole Proprietor</h3>
                <h3>Kirill Igorevich Bragin</h3>
                <p>
                  Taxpayer Identification Number (INN): 500 314 038 760
                  <br />
                  Primary State Registration Number (OGRN): 321 508 100 537 846
                  <br />
                  Registered Address: Apt. 21, Building 36, Razvilka, Vidnoye,
                  Moscow Region, 142717, Russia
                  <br />
                  Bank Account: 40 802 810 800 002 717 756
                  <br />
                  Bank: T-Bank JSC
                  <br />
                  Bank Identification Code (BIC): 044 525 974
                  <br />
                  Correspondent Account: 30 101 810 145 250 000 974
                </p>
                <ul>
                  <br />
                </ul>
              </section>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
