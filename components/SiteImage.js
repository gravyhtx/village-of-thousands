// ART //
import Bro from "../images/art/bro.png";
import Cartas from "../images/art/cartas.png";
import ChooseYourVoT from "../images/art/choose_your_vot.png";
import CopError from "../images/art/cop_error.png";
import FallError from "../images/art/fall_error.png";
import Hope from "../images/art/hope.png";
import Riko from "../images/art/riko.png";
import SpecialOrder from "../images/art/special_order.png";

// "files" must be an array
const SiteImage = ({ files, width, containerClasses, imgClasses, description }) => {
    const bro = Bro;
    const cartas = Cartas;
    const choose_your_vot = ChooseYourVoT;
    const cop_error = CopError;
    const fall_error = FallError;
    const hope = Hope;
    const riko = Riko;
    const special_order = SpecialOrder;

    let cClass="";
    if(containerClasses){cClass=" "+containerClasses};
    let iClass="";
    if(imgClasses){iClass=" "+imgClasses};
    let imgSize = {};
    if(width){imgSize = {maxWidth: width}};

    const arr = files;
    const n = Math.floor(Math.random()*arr.length);
    var image;
    eval(`image = ${arr[n].toLowerCase()}`)
    
    return (
        <>
        {files?
        <div className={"image-container"+cClass}>
            <img style={imgSize} className={"image-class"+iClass} alt={description} src={image} />
        </div>:<></>
        }
        </>
    )
}

export default SiteImage;