import { useEffect, useState } from 'react';
import { idbPromise } from "../utils/helpers";
import { productImage } from '../modules/productImages';
import products from '../config/products.json';
import ProductImage from './ProductImage';
import Link from 'next/link';

const ProductCard = ({ activate, productElement, productCategory, categoryName, closeButton, loggedIn }) => {

  const product = productElement.products;
  
  const [colorSet, setColorSet] = useState(1);
  const [sizeSelect, setSizeSelect] = useState();
  const [itChecksOut, setChecks] = useState(false);
  const category = productCategory;
  console.log(category)

  const [productSelection, setProductSelection] = useState({
    id: '',
    path: '',
    product: '',
    image: [],
    color: '',
    price: '',
    quantity: 1
  });
  console.log(product)

  const addToCart = () => {
    if(itChecksOut) {
      idbPromise('cart', 'put', {
        id: product[colorSet].product_information[sizeSelect].id,
        path: product[colorSet].product_path,
        product: product[colorSet].product_name,
        image: product[colorSet].product_image[0],
        color: product[colorSet].product_colors,
        price: product[colorSet].price,
        quantity: 1
      })
    }
  }

  const setColor = (index) => {
    setSizeSelect(undefined);
    setChecks(false);
    setColorSet(index);
    setProductSelection({
      path: product[index].product_path,
      product: product[index].product_name,
      image: product[index].product_image[0],
      color: product[index].product_colors,
      price: product[index].price,
      id: ''
    });
  }

  // Color Box //
  const colorBox = (name, hex, index) => {
    return (
      <div onClick={() => { setColor(index) }}
        className={'color-box'+(index === colorSet ? ' mines' : '')}
        role="listitem" aria-label={"Color: "+name}
        key={index}>
      <div style={{ backgroundColor: hex }}></div>
      </div>
    )
  }

  const renderColors = () => {
    return (
      category.colors.map((color, index) => colorBox(color, category.hexBase[index], index))
    )
  }

  const setSize = (index, amt) => {
    if(amt > 0) {
      setChecks(true);
      setSizeSelect(index);
      setProductSelection({
        path: product[colorSet].product_path,
        product: product[colorSet].product_name,
        image: product[colorSet].product_image[0],
        color: product[colorSet].product_colors,
        price: product[colorSet].price,
        id: product[colorSet].product_information[index]._id
      });
      console.log(productSelection);
    }
  }
  console.log(productSelection);
  // Size Box //
  const sizeBox = (size, amt, index) => {
    return (
    <div onClick={() => { setSize(index, amt) }}
      className={"size-box" + ((amt > 0) ? " available" : " unavailable") + ((index === sizeSelect && amt > 0) ? " mines" : "")}
      role="listitem" aria-label={"Size "+size}
      key={index}>
      <div><code className="box-size disable-highlight">{size}</code></div>
    </div>
    )
  }

  const renderSizeBox = (color) => {
    return (
      product[color].product_information.map((size, index) =>
        sizeBox(size.product_abbreviated_size, size.product_inventory, index)
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

  // Price //
  const renderPrice = (color) => {
    return (
      <div role="text" aria-label={"Price: $"+product[color].price}>
        ${product[color].price}
      </div>
    )
  }
  
  return (
    <>{activate ?
    <div className="product-card" id="product-card">
      {closeButton}
      <div className="card-container" id="product-card_container">
        <div className="card-content">
          <div className="product-card_title">
            <div>{category.name}</div>
          </div>
          <div className="product-card_container">
            <div className="product-card_img disable-highlight">
              <ProductImage
                colorId={colorSet}
                category={categoryName}
                imgClasses={"card-image"}
                aria={category.name + " - " + product[colorSet].product_colors} />
            </div>
            <div className="product-select_container">
              {/* PRODUCT COLORS */}
              <div role="list" aria-label="Select Color" className="product-card_colors">
                {renderColors()}
              </div>
              {/* PRODUCT SIZES */}
              <div role="list" aria-label="Select Size" className="product-card_sizes">
                {renderSizeBox(colorSet)}
              </div>
            </div>
            <div className="product-card_data row" id="card_data">
              <div role="text" aria-label="Description" className="product-card_description col s8" id="card_description">
                {renderDescription(colorSet)}
              </div>
              <div className="product-card_price col s4" id="card_price">
                {renderPrice(colorSet)}
              </div>
            </div>

          </div>
          <div className={"product-card_submit disable-highlight" + (itChecksOut ? "" : " blank-checks")}>
            {loggedIn ? 
              <button className={"not-a-button" + (itChecksOut ? "" : " blank-checks")} onClick={addToCart}
                aria-label={itChecksOut ? "Add To Cart" : "Please select your size."}
                data-id={product._id}
                data-path={product.product_path}
                data-name={product.product_name}
                // data-image={product.product_image[0]}
                data-color={product.product_colors} //needs state for color
                // data-fit=state for fit
                // data-size= state for size
                data-price={product.price}

                >ADD TO CART</button>
              : <Link href="/register"><a className="product-card_register-link">
                  <div disabled>REGISTER TO PURCHASE</div>
                </a></Link>
            }
          </div>
        </div>
      </div>
    </div>:<></>}
    </>)
}

export default ProductCard;