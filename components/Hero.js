import React from "react";
// import banner from "../../images/vot_banner-pipe.png"
import Image from "next/image";

function Hero({ image, priority }) {

  priority=priority?priority:false;
  return (
    <div id="content" className="main-content animate__animated animate__fadeIn">
      <div className="index-hero">
          {/* <img src={banner} draggable="false" alt="VoT Pipe Hero" /> */}
          <Image src={image} layout={"responsive"} priority={priority} />
      </div>
    </div>
  );
}

export default Hero;