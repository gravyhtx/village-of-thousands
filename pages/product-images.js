import ImageContainer from '../components/ImageContainer';
import { productImage } from '../modules/productImages'

export const ProductImage = ({ name, filename, color, width, containerClasses }) => {

  filename = "vots-wt";

  const size = width ? width : "400px";
  const description =
          name && color ? `${name} // ${color.toUpperCase()}`
          : name && !color ? `${name} - Product Image`
          : `VoT Product Image`
  containerClasses = containerClasses ? "center center-img "+containerClasses : "center center-img";

  const image = productImage(filename);

  const prodEl =
      <ImageContainer
        src={image}
        width={size}
        description={description}
        id={"product-image_"+filename}
        containerClasses={"product-image "+containerClasses} />

  return prodEl;
}

export default ProductImage;