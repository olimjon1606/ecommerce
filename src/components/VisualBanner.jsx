import React from "react";
import ".././style.css";
import image from "../images/004_interier.jpg";
export default function VisualBanner() {
  return (
    <>
      <div
        id="section-17284344"
        className="sections-container -max-width -top-align -no-pad-before -no-pad-after lazyload -background-image -fixed-background"
        style={{
          backgroundColor: "#9e8976",
          backgroundSize: "cover",
          minHeight: "50vh",
          backgroundPosition: "50% 50%",
        }}
        data-bgset={image}
      >
        <div className="sections-container-inner">
          <div className="row">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </div>
    </>
  );
}
