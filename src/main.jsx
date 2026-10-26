import React from "react";
import "./style.css";
import "./react-fixes.css";

// createRoot(document.getElementById("root")).render(<App />);

import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import AboutServices from "./components/AboutServices";
import Services from "./components/Services";
import VisualBanner from "./components/VisualBanner";
import Testimonials from "./components/Testimonials";

function Main() {
  return (
    <main className="page-main sections-page js-main">
      <Intro />
      <Portfolio />
      <AboutServices />
      <Services />
      {/* <VisualBanner /> */}
      {/* <Testimonials /> */}
    </main>
  );
}

export default Main;
