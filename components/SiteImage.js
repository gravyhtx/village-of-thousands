// ART //
// import Bro from "../public/images/art/bro.png";
// import Cartas from "../public/images/art/cartas.png";
// import ChooseYourVoT from "../public/images/art/choose_your_vot.png";
// import CopError from "../public/images/art/cop_error.png";
// import FallError from "../public/images/art/fall_error.png";
// import Hope from "../public/images/art/hope.png";
// import Riko from "../public/images/art/riko.png";
// import SpecialOrder from "../public/images/art/special_order.png";


const SiteImage = ({ images, width, containerClasses, imgClasses, description, drag }) => {

  let cClass="";
  if(containerClasses){cClass=" "+containerClasses};
  let iClass="";
  if(imgClasses){iClass=" "+imgClasses};
  let imgSize = {};
  if(width){imgSize = {maxWidth: width}};
  drag = drag ? drag : false;

  const n = images ? Math.floor(Math.random()*images.length) : 0;
  const image = Array.isArray(images) ? images[n] : images;

  return (
    <>
    {images?
    <div className={"image-container"+cClass}>
      <img style={imgSize} className={"image-class"+iClass} alt={description} src={image.src} draggable={drag} />
    </div>:<></>
    }
    </>
  )
}

export default SiteImage;