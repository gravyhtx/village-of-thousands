import ImageContainer from "./ImageContainer";

const ProductGridItem = ({ name, image, price, description }) => {
  return (
    <div className="product-grid-item center" id="product-grid-item">
      <div className="product-grid-item_name">{name}</div>
        <div className="product-grid-item_image">
          <ImageContainer imgClasses={"product-grid-image"} description={description} src={image} contain />
        </div>
      <div className="product-grid-item_price">{price}</div>
    </div>
  )
}

export default ProductGridItem;