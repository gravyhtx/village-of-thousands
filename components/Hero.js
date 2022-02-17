function Hero({ image, drag, description, id }) {

  drag=drag?true:false;
  description=description?description:"VoT Hero";
  id=id?id:'hero';
  
  return (
    <div id="content" className="main-content animate__animated animate__fadeIn">
      <div className="index-hero">
          {/* <img src={banner} draggable="false" alt="VoT Pipe Hero" /> */}
          <img
            src={image.src}
            draggable={drag}
            alt={description}
            id={id} />
      </div>
    </div>
  );
}

export default Hero;