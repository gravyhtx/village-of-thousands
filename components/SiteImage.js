// ART //
import TheMovement from "../public/images/szn/001/the_movement.png";
import Bro from "../public/images/art/bro.png";
import Cartas from "../public/images/art/cartas.png";
import ChooseYourVoT from "../public/images/art/choose_your_vot.png";
import CopError from "../public/images/art/cop_error.png";
import FallError from "../public/images/art/fall_error.png";
import Hope from "../public/images/art/hope.png";
import Riko from "../public/images/art/riko.png";
import SpecialOrder from "../public/images/art/special_order.png";
import HeaderSvg from "../public/images/header.svg";
import HeaderPng from "../public/images/header.png";

const SiteImage = ({ images, width, containerClasses, imgClasses, description, drag, siteImage }) => {

  if(siteImage) {
    switch (siteImage.toLowerCase().replace(/\s/g, '')) {
      case "themovement":
        siteImage = TheMovement;
        break;
      case "bro":
        siteImage = Bro;
        break;
      case "cartas":
        siteImage = Cartas;
        break;
      case "chooseyourvot":
        siteImage = ChooseYourVoT;
        break;
      case "coperror":
        siteImage = CopError;
        break;
      case "fallerror":
        siteImage = FallError;
        break;
      case "hope":
        siteImage = Hope;
        break;
      case "riko":
        siteImage = Riko;
        break;
      case "specialorder":
        siteImage = SpecialOrder;
        break;
      case "headersvg":
        siteImage = HeaderSvg;
        break;
      case "headerpng":
        siteImage = HeaderPng;
    }
  };

  containerClasses=containerClasses?" "+containerClasses:"";
  imgClasses=imgClasses?" "+imgClasses:" ";

  width=width?{maxWidth: width}:{};

  drag = drag ? drag : false;

  const n = images ? Math.floor(Math.random()*images.length) : 0;
  const image = Array.isArray(images) ? images[n] : images;

  const output = siteImage ? { src: siteImage.src } : image;

  // const imgEl =  <img style={width} className={"image-class"+imgClasses} alt={description} src={output.src} draggable={drag} />

  return (
    <>
      {output?
        <div className={"image-container"+containerClasses}>
          <img style={width} className={"image-class"+imgClasses} alt={description} src={output.src} draggable={drag} />
        </div>:<></>
      }
    </>
  )
}

export default SiteImage;