import { idbPromise } from "../utils/helpers"

const ProductCard = ( productElement, loggedIn ) => {

  const addToCart = (event) => {
    idbPromise('cart', 'put', {
      id: event.target.dataset.id,
      path: event.target.dataset.path,
      product: event.target.dataset.name,
      image: event.target.dataset.image,
      color: event.target.dataset.color,
      price: event.target.dataset.price,
      quantity: 1
    })
  }

  const product = productElement.productElement
  return (<>
    <h2>{product.product_name}</h2>
      <img src={product.product_image[0]} height="200px" width="200px"></img>
      {loggedIn ? 
          <button className="theme-btn" onClick={addToCart} 
            data-id={product._id}
            data-path={product.product_path}
            data-name={product.product_name}
            data-image={product.product_image[0]}
            data-color={product.product_colors} //needs state for color
            // data-fit=state for fit
            // data-size= state for size
            data-price={product.price}

            >Add to Cart</button>
        : <button disabled>You Must Be A Part Of The Village</button>
      }
    </>)
}

export default ProductCard;