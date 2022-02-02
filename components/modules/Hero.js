import React from "react";
import banner from "../../images/vot_banner-pipe.png"

function Hero() {
  return (
    <div id="content" className="main-content animate__animated animate__fadeIn">
      <div className="index-hero">
            <img src={banner} draggable="false" alt="VoT Pipe Hero" />
        </div>
    </div>
  );
}

export default Hero;