import { useEffect, useState } from 'react';
import { idbPromise } from "../utils/helpers";
import { productImage } from '../modules/productImages';
import products from '../config/products.json';
import ProductImage from './ProductImage';

const ProductCard = ({ productElement, productCategory, categoryName, loggedIn }) => {

  const category = productCategory;
  let colorSet = 1

  const [productSelection, setProductSelection] = useState({
    size: '',
    color: '',
    quantity: 1
  });

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

  const product = productElement.products;
  console.log(categoryName)
  const setColor = (index) => {
    colorSet = index
    console.log(colorSet)
  }

  // Color Box //
  const colorBox = (name, hex, index) => {
    return (
      <div onClick={setColor(index)} className={'color-box'+(index === colorSet ? ' highlight' : '')} data-color-select={name} key={index}>
      <div style={{ backgroundColor: hex }}></div>
      </div>
    )
  }

  const renderColors = () => {
    return (
      category.colors.map((color, index) => colorBox(color, category.hexBase[index], index))
    )
  }
  
  // Size Box //
  const sizeBox = (size, index) => {
    return (
    <div className="size-box" data-color-size={size} key={index}>
      <div><code className="box-size disable-highlight">{size}</code></div>
    </div>
    )
  }

  const renderSizeBox = (color) => {
    return (
      product[color].product_information.map((size, index) =>
        sizeBox(size.product_abbreviated_size, index)
      )
    ) 
  }

  // Description //
  const renderDescription = (color) => {
    return (
      product[color].product_description.map((item, index) =>
        <div key={index}>{item}</div>
      )
    )
  }

  const closeArticleModal = () => {
    console.log('click')
  }
  
  return (

    <div className="product-card" id={"product-card_"}>
      <div className="card-container" id="product-card_container">
        <div className="card-content">
          <div className="product-card_title">
            <div>{category.name}</div>
          </div>
          <div className="product-card_container">
            {/* <div className='product-card_close-container'>
              <div onClick={closeArticleModal} className="product-card_close" id="product-card_close" aria-label="Close">&times;</div>
            </div> */}

            
            <div className="product-card_img">
              <ProductImage colorId={colorSet} category={categoryName} imgClasses={"card-image"} />
            </div>
            <div className='product-select_container'>
              {/* PRODUCT COLORS */}
              <div className='product-card_colors'>
                {renderColors()}
              </div>
              {/* PRODUCT SIZES */}
              <div className='product-card_sizes'>
                {renderSizeBox(colorSet)}
              </div>
            </div>
            <div className='product-card_data row' id="card_data">
              <div className='product-card_description col s8' id="card_description">
                {renderDescription(colorSet)}
              </div>
              <div className='product-card_price col s4' id="card_price">
                <div>${product[colorSet].price}</div>
              </div>
            </div>

          </div>
          <div className='product-card_submit'>
            {loggedIn ? 
              <button className="not-a-button" onClick={addToCart} 
                data-id={product._id}
                data-path={product.product_path}
                data-name={product.product_name}
                // data-image={product.product_image[0]}
                data-color={product.product_colors} //needs state for color
                // data-fit=state for fit
                // data-size= state for size
                data-price={product.price}

                >ADD TO CART</button>
              : <div disabled>You Must Be A Part Of The Village</div>
            }
          </div>
        </div>
      </div>
    </div>)
}

export default ProductCard;