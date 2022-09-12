import { useEffect, useState } from 'react';
import { idbPromise } from "../utils/helpers";
import { ProductImage } from '../components/dynamic-content/ProductData';

import Link from 'next/link';
import { cdnLink } from '../utils/siteFunctions';

const ProductCard = ({ activate, productElement, productCategory, categoryName, closeButton, pcId, loggedIn }) => {

  const product = productElement.products;
  
  const [colorSet, setColorSet] = useState(1);
  const [sizeSelect, setSizeSelect] = useState();
  const [sizeObj, setSizeObj] = useState({})
  const [itChecksOut, setChecks] = useState(false);
  const category = productCategory;

  const imgSrc = cdnLink(category.filename[colorSet], category.fileId[colorSet]);

  const [productSelection, setProductSelection] = useState({
    id: '',
    path: '',
    category: '',
    product: '',
    image: [],
    color: '',
    price: '',
    quantity: 1
  });
  // console.log(product);

  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = () => {
    if(itChecksOut) {
      idbPromise('cart', 'put', {
        id: productSelection.id,
        category: productSelection.category,
        path: productSelection.path,
        product: productSelection.product,
        color: productSelection.color,
        price: productSelection.price,
        image: imgSrc,
        size: sizeObj.size,
        abbr_size: sizeObj.abbr_size,
        quantity: 1
      })
      setAddedToCart(true);
      setChecks(false)
      setSizeSelect();
      // NEED BETTER SYSTEM FOR ALERTING ITEM IN CART
      // NEED BETTER SYSTEM FOR ALERTING CURRENT ITEM ALREADY IN CART
    }
  }
  useEffect(() => {
    if(!activate) {
      setChecks(false);
      setColorSet(1);
      setSizeSelect();
    }
  }, [activate])

  const setColor = (index) => {
    setSizeSelect(undefined);
    setChecks(false);
    setColorSet(index);
    setAddedToCart(false);
    setProductSelection({
      category: product[index].category_name,
      path: product[index].product_path,
      product: product[index].product_name,
      color: product[index].product_colors,
      price: product[index].price,
      image: imgSrc,
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

  const setSize = (index, abbr_size, size, amt) => {
    if(amt > 0) {
      setChecks(true);
      setSizeSelect(index);
      setAddedToCart(false);
      setSizeObj({
        size: size,
        abbr_size: abbr_size
      })
      setProductSelection({
        image: imgSrc,
        category: product[colorSet].category_name,
        path: product[colorSet].product_path,
        product: product[colorSet].product_name,
        color: product[colorSet].product_colors,
        price: product[colorSet].price,
        id: product[colorSet].product_information[index]._id
      });
      // console.log(productSelection);
    }
  }
  
  // Size Box //
  const sizeBox = (abbr_size, size, amt, index) => {
    return (
    <div onClick={() => { setSize(index, abbr_size, size, amt) }}
      className={"size-box" + ((amt > 0) ? " available" : " unavailable") + ((index === sizeSelect && amt > 0) ? " mines" : "")}
      role="listitem" aria-label={"Size "+size}
      key={index}>
      <div><code className="box-size disable-highlight">{abbr_size}</code></div>
    </div>
    )
  }

  const renderSizeBox = (color) => {
    return (
      product[color].product_information.map((size, index) =>
        sizeBox(size.product_abbreviated_size, size.product_size, size.product_inventory, index)
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
    <div className={"product-card"+( addedToCart ? " added" : "" )} aria-labelledby={"product-category"+pcId} id="product-card">
      {closeButton}
      <div className="card-container" id="product-card_container">
        <div className="card-content">
          <div className="product-card_title">
            <div>{category.name}</div>
          </div>
          <div className="product-card_container">
            {/* Add onChange to div to make product image blink when switched */}
            <div className="product-card_img disable-highlight" id={("img-"+category.category+"-"+product[colorSet].product_colors).toLowerCase()}>
              {/* <ProductImage
                colorId={colorSet}
                category={categoryName}
                imgClasses={"card-image"}
                aria={category.name + " - " + product[colorSet].product_colors} /> */}
              <ProductImage
                colorId={colorSet}
                category={categoryName}
                containerClasses={"image-container"}
                imgClasses={"card-image"}
                // aria={category.name + " - " + product[colorSet].product_colors}
                />
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
            {loggedIn ? 
              <div className={"product-card_submit disable-highlight"
                            + ( itChecksOut ? "" : " blank-checks" )
                            + ( addedToCart ? " added" : "" )}>
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
                  >{addedToCart ? "ADDED TO CART" : "ADD TO CART"}</button>
              </div>
              : 
              <Link href="/register"><a className="product-card_register-link">
                <div className="product-card_submit disable-highlight">
                  <div disabled>REGISTER TO PURCHASE</div>
                </div>
              </a></Link>
            }
        </div>
      </div>
    </div>:<></>}
    </>)
}

export default ProductCard;