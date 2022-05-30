import ProductImage from "./ProductImage"
import products from '../config/products.json';

const ProductImageGrid = ({ containerClasses, width, imageClasses, category, randomize, randomSetLength, colsize }) => {

  // console.log(screenWidth(window))
  width = width ? width : '100%'

  const productData = products.currentDrop;
  const colors = randomize === "shirts" ? productData.shirts.colors : randomize === "longsleeves" ? productData.longsleeves.colors
               : randomize === "hoodies" ? productData.hoodies.colors : randomize === "crewnecks" ? productData.crewnecks.colors : []

  imageClasses = imageClasses ? ' '+imageClasses : '';
  containerClasses = containerClasses ? ' '+containerClasses : '';

  const productImage = randomize && !randomSetLength ?    
      <ProductImage width={width} containerClasses={imageClasses} randomize={randomize ? randomize : "all"} />
    : randomSetLength ?
    <ProductImage colSize={colsize} width={width} containerClasses={imageClasses} randomize={randomize ? randomize : "all"} randomSetLength={randomSetLength} />
    : <ProductImage width={width} containerClasses={imageClasses} category={category} color={colors} />
  return (
    <div className={"row product-image-grid"+containerClasses}>
      {productImage}
    </div>
  )
}

export default ProductImageGrid;