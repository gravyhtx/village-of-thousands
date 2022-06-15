import ImageContainer from '../components/ImageContainer';
import { productImage, randomProduct } from '../modules/productImages';
import website from '../config/site-data.json';

export const ProductImage = ({ name, filename, color, width, containerClasses, randomize, randomSetLength, colSize, blur }) => {

  filename = filename ? filename : "vots-bk";
  blur = blur ? blur : false;

  const randomizeProducts = () => {
    if(randomSetLength) {
      return randomProduct(randomize === true ? "all" : randomize, randomSetLength)
    } else {
      return randomProduct(randomize === true ? "all" : randomize)
    }
  }

  const image = randomize ? randomizeProducts() : productImage(filename);
  
  const size = width ? [width, width] : ["100%","100%"];

  const szn = website.szn;
  const drop = website.drop;
  const dropNum = drop < 10 ? '00'+drop : drop < 100 ? '0'+drop : drop;

  const description =
          name && color ? `${name} // ${color.toUpperCase()} // ${szn} // Drop ${dropNum}`
          : name && !color ? `${name} - Product Image // ${szn} // Drop ${dropNum}`
          : randomize ? `VoT // ${szn} // Drop ${dropNum}`
          : `VoT Product Image // ${szn} // Drop ${dropNum}`

  containerClasses = containerClasses ? "center center-img "+containerClasses : "center center-img";

  const prodEl = (image, size, description, filename, containerClasses, blur) => {
    return <ImageContainer
            src={image}
            size={size}
            description={description}
            id={"prod-img_"+filename}
            containerClasses={"product-image-container "+containerClasses}
            imgClasses={"product-image"}
            blur={blur} />
  }

  const randProdEl = (blur) => {
    const arr = randomProduct(randomize === true ? "all" : randomize, randomSetLength, colSize);
    const prodEl = (index, image, size, description, filename, containerClasses, blur) => {
      return (<div className={colSize ? 'center-img col s12 m12 l'+colSize : 'center-img col s12 m12 l6'} key={index}>
                <ImageContainer
                  src={image}
                  size={size}
                  description={description}
                  id={"prod-img_"+filename}
                  containerClasses={"product-image-container "+containerClasses}
                  imgClasses={"product-image"}
                  blur={blur} />
              </div>)
    }
    return arr.map((image, index) => prodEl(index, image, size, description, filename, containerClasses, blur))
  }

  return randomize ? randProdEl(blur) : prodEl(image, size, description, filename, containerClasses, blur);
}

export default ProductImage;