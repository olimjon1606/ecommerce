
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// COMPONENTS
import Header from "./components/Header/header";
import Hero from "./components/Hero";
import Main from "./main";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

// PAGES
import Interier from "./Pages/Interier";
import Exterier from "./Pages/Exterier";

// STYLES
import "./style.css";
import "./react-fixes.css";
import Project from "./Pages/Project";
import InterierVis from "./Pages/InterierVis";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
// import InterierViz from "./Pages/InterierViz";

// HOME PAGE
function Home() {
  return (
    <>
      <Hero />
      <Main />
    </>
  );
}

// WEBSITE CONTENT
function AppContent() {
  return (
    <>
      {/* HEADER ON ALL PAGES */}
      <Header />

      {/* PAGE ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* OLD HOME URL REDIRECT */}
        <Route
          path="/index.html"
          element={<Navigate to="/" replace />}
        />

        {/* INTERIOR PORTFOLIO */}
        <Route
          path="/interier"
          element={<Interier />}
        />

        {/* ALTERNATIVE INTERIOR URL */}
        <Route
          path="/interior"
          element={<Navigate to="/interier" replace />}
        />

        {/* EXTERIOR PORTFOLIO */}
        <Route
          path="/exterier"
          element={<Exterier />}
        />

        {/* ALTERNATIVE EXTERIOR URL */}
        <Route
          path="/exterior"
          element={<Navigate to="/exterier" replace />}
        />

        {/* UNKNOWN URLS */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

        <Route path="/:projectSlug" element={<Project />} />


        // Inside
        <Route path="/interior_vis" element={<InterierVis/>}/>

        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contact />} />

      </Routes>

      {/* FOOTER ON ALL PAGES */}
      <Footer />

      {/* FLOATING ACTION BUTTONS */}
      <FloatingActions />
    </>
  );
}

// APP
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
