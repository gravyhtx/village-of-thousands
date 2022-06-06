import ImageContainer from '../components/ImageContainer';
import { productImage } from '../modules/productImages';

import products from '../config/products.json'
import Link from 'next/link';
import { useState } from 'react';

export const ProductCard = ({ name, fileName, width, loggedIn }) => {

  console.log(products.currentDrop)
  // const id = id ? id : '';
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: [],
    sizes: [],
    colors: [],
    price: undefined,
    id: ''
  }) ;
  const [productSelection, setProductSelection] = useState({
    size: '',
    color: '',
    quantity: 1
  })

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

  // Sizes Box //
  const sizeBox = () => {
    return (
    <div onclick="selectSize('${s[i]}')" className="sizes-box col s1 size-${s[i]}" id="size-${s[i]}">
    <code className="box-size disable-highlight">${s[i].toUpperCase()}</code>
    </div>
    )
  }
  const renderSizeBox = (s) => {
    let sizebox = "";
    for(let i = 0; i < s.length; i++) {
        sizebox += `<a href="#${s[i]}"><div onclick="selectSize('${s[i]}')" className="sizes-box col s1 size-${s[i]}" id="size-${s[i]}"><code className="box-size disable-highlight">${s[i].toUpperCase()}</code></div></a>`;
        document.getElementById("display-sizes").innerHTML=sizebox;
    }  
  }

  // const image = productImage(filename);

  const closeArticleModal = () => {
    console.log('click')
  }

  return (
    <div className="product-card_modal" id={"product-card_"}>
      <div className="card-container" id="product-card_container">
        <div className="card-content">
          <div className="product-card_container">

            <span className="product-card_title">
            </span>
          </div>
          <span onClick={closeArticleModal} className="product-card_close" id="product-card_close{{ forloop.index0 }}" aria-label="Close">&times;</span>
          
          <div id="product-card_img"></div>
          <div className='product-select_container'>
            {/* PRODUCT COLORS */}
            {/* PRODUCT SIZES */}
          </div>
          <div className='product-card_data row' id="card_data">
            <div className='col s6' id="card_description"></div>
            <div className='col s6' id="card_price"></div>
          </div>
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
          : <button disabled>You Must Be A Part Of The Village</button>}
          
        </div>
        
      </div>
    </div>
  );
}

export default ProductCard;