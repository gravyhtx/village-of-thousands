import { useEffect } from "react";
// import banner from "../../images/vot_banner-pipe.png"
import Image from "next/image";

function Hero({ image, priority, optimized, drag, blur, id }) {

  priority=priority?true:false;
  optimized=optimized?true:false;
  drag=drag?true:false;
  blur=blur?true:false;
  id=id?id:'hero';
  console.log(blur)
  
  return (
    <div id="content" className="main-content animate__animated animate__fadeIn">
      <div className="index-hero">
          {/* <img src={banner} draggable="false" alt="VoT Pipe Hero" /> */}
          <Image
            src={image}
            priority={priority}
            layout={"responsive"}
            unoptimized="true"
            draggable="false"
            placeholder="blur"
            id={id} />
      </div>
    </div>
  );
}

export default Hero;