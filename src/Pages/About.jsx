import React, { useEffect, useState } from "react";
import "../style.css";

// Converted from the supplied About HTML. Original classNames and section styles are retained.
export default function About() {
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSlideIndex((i) => (i + 1) % 3),
      6000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Connect this form to your own API or email service before enabling submissions.
    window.alert(
      "This form is not connected yet. Please contact us through the Contact page.",
    );
  };

  return (
    <div className="page-wrapper js-page">
      <style>{`.about-page .cover .slide { display: none !important; }
        .about-page .cover .slide.about-active-slide { display: block !important; opacity: 1 !important; visibility: visible !important; }
        .about-page .cover .lazy-image img { opacity: 1; }
        /* Add breathing room between full-width images and adjacent text sections. */
        .about-page #section-17156119,
        .about-page #section-17153869 { padding-top: 90px !important; padding-bottom: 70px !important; }
        /* Visually center content a little higher within the existing sections. */
        .about-page #section-17156119 > .sections-container-inner,
        .about-page #section-17153869 > .sections-container-inner,
        .about-page #section-17153497 > .sections-container-inner {
          position: relative;
          top: -32px;
        }
        @media (max-width: 767px) {
          .about-page #section-17156119,
          .about-page #section-17153869 { padding-top: 48px !important; padding-bottom: 40px !important; }
        }
      `}</style>
      <div className="about-page">
        <div className="cover -bottom-sides js-cover">
          <div
            className="slider js-slider -overlay"
            data-delay="6000"
            data-mode="fill"
            data-shuffle="false"
          >
            <div className="slider-viewport js-slider-viewport">
              <div className="slides js-slides js-next">
                <div
                  className={
                    "slide js-slide" +
                    (slideIndex === 0 ? " -visible about-active-slide" : "")
                  }
                >
                  <div
                    className="lazy-image js-lazy-image"
                    data-role="lazy-image"
                    data-width="4000"
                    data-height="3000"
                    data-aspect="1.33333333"
                  >
                    <img
                      alt="Adil Architects — Architecture and Interior Design Studio"
                      className="lazyload lazyunload"
                      data-src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/662HIJZ7eGh-qREsS7LWhX0w56VqFYCR/tou6SQ5mPjtVwVq3twjEw0oKSkjPr5Sr/SICPAYPYl8bwQ_GefBCmBA.jpg"
                      src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/662HIJZ7eGh-qREsS7LWhX0w56VqFYCR/tou6SQ5mPjtVwVq3twjEw0oKSkjPr5Sr/SICPAYPYl8bwQ_GefBCmBA.jpg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  className={
                    "slide js-slide" +
                    (slideIndex === 1 ? " -visible about-active-slide" : "")
                  }
                >
                  <div
                    className="lazy-image js-lazy-image"
                    data-role="lazy-image"
                    data-width="3000"
                    data-height="3000"
                    data-aspect="1.0"
                  >
                    <img
                      alt="Adil Architects — Architecture and Interior Design Studio"
                      className="lazyload lazyunload"
                      data-src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/gzdAxWKd5t4VL6zdQ9rE6lxQg2wGRcf2/t6devYZb-HeH9QZd6wRRrajakA62w7pA/JyGuAcD1OqNF2a4JSbgrQg.jpg"
                      src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/gzdAxWKd5t4VL6zdQ9rE6lxQg2wGRcf2/t6devYZb-HeH9QZd6wRRrajakA62w7pA/JyGuAcD1OqNF2a4JSbgrQg.jpg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div
                  className={
                    "slide js-slide" +
                    (slideIndex === 2 ? " -visible about-active-slide" : "")
                  }
                >
                  <div
                    className="lazy-image js-lazy-image"
                    data-role="lazy-image"
                    data-width="4000"
                    data-height="3000"
                    data-aspect="1.33333333"
                  >
                    <img
                      alt="Adil Architects — Architecture and Interior Design Studio"
                      className="lazyload lazyunload"
                      data-src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/SoSeqmLSiq96kWzSjGoZyKrvX0iSvp8U/BGywJ8-AHfYEaO4h9kXh3L-Vpm2nVp8s/QrlLDmw-BxxtSD3X2wrEwQ.jpg"
                      src="https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/SoSeqmLSiq96kWzSjGoZyKrvX0iSvp8U/BGywJ8-AHfYEaO4h9kXh3L-Vpm2nVp8s/QrlLDmw-BxxtSD3X2wrEwQ.jpg"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cover-wrapper js-cover-wrapper">
            <div className="cover-bottom">
              <div className="cover-content">
                <h1 className="cover-header -medium">
                  {
                    "\n                Adil Architects — Architecture & Interior Design Studio\n              "
                  }
                </h1>
              </div>
            </div>
          </div>
        </div>
        <main className="page-main sections-page js-main">
          <div
            id="section-17153474"
            className="sections-container -medium-width -middle-align -theme-pad-before -small-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <section
                    className="section-container picture-section -default -square -without-column-underlay -rounded"
                    id="section-17153475"
                  >
                    <div
                      className="lazy-image js-lazy-image"
                      data-role="lazy-image"
                      data-width="1733"
                      data-height="1733"
                      data-aspect="1.0"
                    >
                      <img
                        alt="Adil Architects — Architecture and Interior Design Studio"
                        className="lazyload lazyunload"
                        data-src="https://i.wfolio.ru/x/o9zSmQERYSg9tu4NPVQmCnuSy7EvqCgU/wkIcgyvnKWEo9Gr134MTz1cokgr6jffi/yZLH-h-huZbkJWk2MJZeu4wBvpYiaTAn/XGxhlKzO0-4ygiTkqaRHq5F78KgizCWX/7Zdhy8x01fuzZydD8kPgvtAl8HnewlxV/no5Vzl8QWdQUPovunrHZ5vIIpzzTSnPA.jpg"
                        src="https://i.wfolio.ru/x/o9zSmQERYSg9tu4NPVQmCnuSy7EvqCgU/wkIcgyvnKWEo9Gr134MTz1cokgr6jffi/yZLH-h-huZbkJWk2MJZeu4wBvpYiaTAn/XGxhlKzO0-4ygiTkqaRHq5F78KgizCWX/7Zdhy8x01fuzZydD8kPgvtAl8HnewlxV/no5Vzl8QWdQUPovunrHZ5vIIpzzTSnPA.jpg"
                        loading="lazy"
                      />
                    </div>
                  </section>
                </div>
                <div className="col-sm-12 col-md-6">
                  <section
                    className="section-container text-section -default wysiwyg"
                    id="section-17153476"
                  >
                    <h2>Hello!</h2>
                    <p>
                      Welcome to <b>Adil Architects</b>, an architecture and
                      interior design studio specializing in thoughtful spaces
                      and high-quality architectural visualization.
                    </p>
                    <p>
                      We bring ideas to life through carefully considered
                      architecture, materials, lighting, and atmosphere. Every
                      image is an opportunity to communicate the character of a
                      project.
                    </p>
                    <p>
                      We collaborate with homeowners, architects, designers, and
                      brands to transform concepts into compelling visual
                      experiences.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17153477"
            className="sections-container -medium-width -top-align -small-pad-before -medium-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12">
                  <section
                    className="section-container divider-section -space -space"
                    id="section-17153478"
                  >
                    <hr />
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17153479"
            className="sections-container -max-width -top-align -no-pad-before -no-pad-after lazyload -background-image"
            style={{
              backgroundColor: "#b6a996",
              backgroundSize: "cover",
              minHeight: "50vh",
              backgroundPosition: "50% 50%",
              backgroundImage:
                "url(https://i.wfolio.ru/x/iu--7fTj3NWHsCKxCZdnscvlJhtVSwtm/UNW_e4lmiBd6jOdHJq5CkR9en2HZX0Oq/3GR8BT-XNf7vwDaxybZ1FNYJ3rzLKHjU/6l33MyDVzdrMG_dvC5Vu1xG_mkcd3D9b/uiZnlWd5LzcX3RuXMBOZig.jpg)",
            }}
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12"></div>
              </div>
            </div>
          </div>
          <div
            id="section-17156119"
            className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-lg-8 col-lg-offset-2">
                  <section
                    className="section-container text-section -default wysiwyg"
                    id="section-17156120"
                  >
                    <h3>Our Creative Journey</h3>
                    <p>
                      Adil Architects builds on professional experience in
                      architectural visualization dating back to <b>2019</b>,
                      combining architectural understanding with a passion for
                      realistic imagery.
                    </p>
                    <p>
                      Over the years, our work has expanded across residential
                      interiors, contemporary villas, hospitality spaces, and
                      exterior environments.
                    </p>
                    <p>
                      Each project has helped us refine our approach to
                      composition, materials, and lighting while building a
                      portfolio of distinctive spaces.
                    </p>
                    <p>
                      Today, we continue developing Adil Architects as an{" "}
                      <b>Architecture &amp; Interior Design Studio</b>,
                      collaborating with clients on projects of different
                      scales.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17214048"
            className="sections-container -medium-width -top-align -no-pad-before -medium-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-lg-6 col-lg-offset-3">
                  <section
                    className="section-container action-section -outline -center"
                    id="section-17214049"
                  >
                    <a className="button -outline" href="/interier">
                      {"View Our Projects"}
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17153854"
            className="sections-container -max-width -top-align -no-pad-before -no-pad-after lazyload -background-image"
            style={{
              backgroundColor: "#756359",
              backgroundSize: "cover",
              minHeight: "40vh",
              backgroundPosition: "50% 50%",
              backgroundImage:
                "url(https://i.wfolio.ru/x/dOf5ECvmfSiZ-95akib5IibYi-O31i6d/gEvq59H7D6S0S35BE1DzIyQJZR3ppOMV/y2Vrth1tK-LaoBcBnONqeIqdmfaq_jC6/GDGwLeIYR6RUUMfAmXMU596-XkxvnsjN/DQLPe5f2-4V06S-br7qqNQ.jpg)",
            }}
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12"></div>
              </div>
            </div>
          </div>
          <div
            id="section-17153869"
            className="sections-container -medium-width -top-align -medium-pad-before -medium-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-lg-8 col-lg-offset-2">
                  <section
                    className="section-container text-section -default wysiwyg"
                    id="section-17153870"
                  >
                    <h3>How We Work</h3>
                    <p>
                      For us, <b>3D visualization</b> is more than a technical
                      process. It is a creative dialogue between design, light,
                      materials, and atmosphere. We aim to communicate how a
                      space will feel, not just how it will look.
                    </p>
                    <p>
                      Our workflow is organized around clear project
                      requirements, accurate modeling, carefully developed
                      materials, and consistent communication throughout each
                      stage.
                    </p>
                    <p>
                      We pay close attention to every detail: balanced lighting,
                      harmonious colors, realistic textures, and a strong
                      architectural composition.
                    </p>
                    <p>
                      With an eye for framing and storytelling, we create
                      visualizations that present the design clearly and leave a
                      lasting impression.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17154193"
            className="sections-container -medium-width -top-align -medium-pad-before -medium-pad-after lazyload -background-image -overlay"
            style={{
              backgroundColor: "#c1b6b4",
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              backgroundImage:
                "url(https://i.wfolio.ru/x/D48ScH1DA6jxU_uSH-Or-C0cJClpP-QP/lEAL128xEMPGM2o_rKw_kMPHKR9vAJ80/yAsUvavlXFpSdx3ZdpWL8jWA5eMr03CH/T9DTV6pUz7tWKVvnMQLRtQybVvK_MMQv/rTxKdygPxd77flCU5ZlZ1Q.jpg)",
            }}
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-lg-6 col-lg-offset-3">
                  <section
                    className="section-container text-section -default wysiwyg"
                    id="section-17154194"
                  >
                    <h2 align="center">Start a Project</h2>
                    <p style={{ textAlign: "center" }}>
                      Have an idea in mind? Get in touch and let's discuss your
                      project.
                    </p>
                  </section>
                  <section
                    className="section-container action-section -fill -center"
                    id="section-17154195"
                  >
                    <a
                      name="button"
                      data-url="/forms/orders/new/77922?locale=ru&page_id=3717343"
                      className="js-order-trigger button -fill"
                      href="/contact"
                    >
                      {"\n                    Contact Us\n                  "}
                    </a>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17310527"
            className="sections-container -medium-width -top-align -medium-pad-before -small-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12">
                  <section
                    className="section-container divider-section -space -space"
                    id="section-17310528"
                  >
                    <hr />
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section-17153497"
            className="sections-container -medium-width -top-align -small-pad-before -theme-pad-after -background-default"
          >
            <div className="sections-container-inner">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <section
                    className="section-container picture-section -default -four_fifths -without-column-underlay -rounded"
                    id="section-17153498"
                  >
                    <div
                      className="lazy-image js-lazy-image"
                      data-role="lazy-image"
                      data-width="1872"
                      data-height="2339"
                      data-aspect="0.8003420265070543"
                    >
                      <img
                        alt="Adil Architects — Architecture and Interior Design Studio"
                        className="lazyload lazyunload"
                        data-src="https://i.wfolio.ru/x/xmvKHUThMOLChDrUHtBuFJJGg41tlQOU/pEianWx2Nho8ueWWZQ1fqeYd42H3Y0h1/I-Y9TRdVCRrF_6dBKeABZ78fxk7f_h6f/0xDBTAfhp-vRNtvLTZpMbvrNxu-Rm6ZM/k9OkqDds9mt1F_3b3EX-Uy2zT3kr02rm/6D6G0e7hyL9KD9OjbfybLxjSnYv81Iq_.png"
                        src="https://i.wfolio.ru/x/xmvKHUThMOLChDrUHtBuFJJGg41tlQOU/pEianWx2Nho8ueWWZQ1fqeYd42H3Y0h1/I-Y9TRdVCRrF_6dBKeABZ78fxk7f_h6f/0xDBTAfhp-vRNtvLTZpMbvrNxu-Rm6ZM/k9OkqDds9mt1F_3b3EX-Uy2zT3kr02rm/6D6G0e7hyL9KD9OjbfybLxjSnYv81Iq_.png"
                        loading="lazy"
                      />
                    </div>
                  </section>
                </div>
                <div className="col-sm-12 col-md-6">
                  <section
                    className="section-container text-section -default wysiwyg"
                    id="section-17153499"
                  >
                    <h2>Have a Project?</h2>
                    <p>Fill out the form below and we will get back to you.</p>
                  </section>
                  <section
                    className="section-container message-form-section -default"
                    id="section-17153500"
                  >
                    <form
                      className="form js-form"
                      id="message-form-17153500"
                      noValidate="novalidate"
                      data-preflight-url="/forms/preflight?form_id=17153500&form_type=message_form"
                      acceptCharset="UTF-8"
                      onSubmit={handleFormSubmit}
                    >
                      <div
                        className="message-box -success js-message js-success-message"
                        style={{ display: "none" }}
                      >
                        <i className="fal fa-times close js-close"></i>
                        <div className="header">
                          {
                            "\n                        Your message has been sent successfully!\n                      "
                          }
                        </div>
                      </div>
                      <div
                        className="message-box -error js-message js-error-message"
                        style={{ display: "none" }}
                      >
                        <i className="fal fa-times close js-close"></i>
                        <div className="header js-error-header"></div>
                        <ul className="list js-errors-list"></ul>
                      </div>
                      <div
                        style={{ position: "absolute", left: "-9999px" }}
                        aria-hidden="true"
                      ></div>
                      <div
                        style={{ position: "absolute", left: "-9999px" }}
                        aria-hidden="true"
                      ></div>
                      <fieldset>
                        <input
                          required="required"
                          placeholder="Your Name"
                          className="field"
                          type="text"
                          name="folio_message_form[name]"
                          id="folio_message_form_name"
                        />
                        <input
                          required="required"
                          placeholder="Phone Number or Email"
                          className="field"
                          type="text"
                          name="folio_message_form[credentials]"
                          id="folio_message_form_credentials"
                        />
                        <textarea
                          rows="7"
                          placeholder="Your Message"
                          className="field-textarea"
                          name="folio_message_form[content]"
                          id="folio_message_form_content"
                        ></textarea>
                      </fieldset>
                      <fieldset>
                        <div className="input">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              value="1"
                              name="folio_message_form[forms_legal_privacy_warning]"
                              id="folio_message_form_forms_legal_privacy_warning"
                            />
                            <span className="checkbox-notice form-legal-links wysiwyg">
                              <label htmlFor="folio_message_form_forms_legal_privacy_warning">
                                {
                                  "I agree to the processing of my personal data in accordance with the "
                                }
                                <a
                                  href="https://artnway.com/legal-privacy"
                                  target="_blank"
                                >
                                  {"Privacy Policy"}
                                </a>
                                {"."}
                              </label>
                            </span>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="-left">
                        <button
                          name="button"
                          type="submit"
                          className="button -fill"
                          data-disable="Sending…"
                        >
                          {
                            "\n                        Send Message\n                      "
                          }
                        </button>
                      </fieldset>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
