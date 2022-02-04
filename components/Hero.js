import React from "react";
// import banner from "../../images/vot_banner-pipe.png"
import Image from "next/image";

function Hero() {
  return (
    <div id="content" className="main-content animate__animated animate__fadeIn">
      <div className="index-hero">
            {/* <img src={banner} draggable="false" alt="VoT Pipe Hero" /> */}
            <Image src="/vot_banner-pipe.png" width="100vw" height="50vh"/>
        </div>
    </div>
  );
}

export default Hero;