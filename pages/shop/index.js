import { useEffect, useState } from 'react';
import Link from 'next/link';

import DefaultLayout from '../../templates/DefaultLayout';

import ProductCard from '../../components/ProductCard';
import LoadingScreen from '../../components/LoadingScreen';
// import ProductImage from '../../components/ProductImage';
import { ProductImage } from '../../components/dynamic-content/ProductData';

import Auth from '../../utils/auth';
import { getAllCategories } from '../../utils/API';

import products from '../../config/products.json'
import website from '../../config/site-data.json';

import scrollToEl from "../../modules/scrollToEl";
import { randomize } from '../../utils/generator';

export const ProductCardTest = () => {

  const [productData, setProductData] = useState([]);

  const [szn, setSzn] = useState({});

  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [activatePCness, setActivatePC] = useState(false);
  const [setPC, setSetPC] = useState();

  const productKeys = Object.entries(products.currentDrop);

  useEffect(() => {
    const getProductData = async () => {

      try {

        const profile = Auth.loggedIn() ? Auth.getProfile() : null;

        if(profile) {
          setLogged(true)
        }

        const response = await getAllCategories();
        const productInfo = await response.json();
        
        setProductData(productInfo);
        // console.log(productData[0]);
        if(productData.length !== 0 && !loaded) {
          setLoaded(true);
        }

      } catch (err) {
          console.error(err);
      }
    }
    getProductData();
  }, [productData.length])

  useEffect(() => {
    setSzn(products.currentDrop)
    // console.log(szn);
  }, [loaded]);

  const closePC = () => {
    setActivatePC(false);
    setSetPC(null);
  }

  const closeButton = () => {
    return (
      <div className="product-card_close-container disable-highlight">
        <div onClick={() => closePC()} className="product-card_close" id="product-card_close" role="button" aria-label="Close">
          &times;
        </div>
      </div>
    )
  }

  const setProductCard = (index) => {
    if(!activatePCness) {
      setSetPC(index);
      setActivatePC(true);
    }
  }

  const scrollToContainer = () => {
    if(activatePCness) {
      scrollToEl(setPC ? "product_view-category"+setPC : "content", 100)
    } else {
      scrollToEl(null)
    }
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
  }

  const renderCategories = () => {
    const categories = [{
      name: "Crewnecks",
      id: randomize(2) },
    { name: "Hoodies",
      id: randomize(2) },
    { name: "Longsleeves",
      id: randomize(2) },
    { name: "Tees",
      id: randomize(2)}];
      
    return categories.map((category, index) =>
      <div role="button" aria-label={"View VoT "+category.name}
        onClick={scrollToContainer()}
        onContextMenu={handleContextMenu}
        className={"col s12 m6 l6 product_view-category"+(index === setPC ? " active" : "")}
        id={"product_view-category"+index}
        key={index}>
        <ProductImage colorId={category.id}
          category={category.name.toLowerCase()}
          containerClasses={"col s12 m6 l6" + (loaded ? "" : " loading")} />
        <div className="card-trigger_container disable-highlight">
          <button role="button" aria-controls={activatePCness ? "product-card" : ""}
            aria-haspopup="grid"
            tabIndex={index}
            onClick={() => setProductCard(index)}
            className={"card-trigger" + (loaded ? "" : " loading")}
            id={"product-category"+index}>{category.name}</button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    document.getElementById('content').addEventListener('click', () => {
      closePC();
    });
  })

  return (<>
    <DefaultLayout title={"Shop"} classes={activatePCness ? " disable-highlight" : ""}>
      <div className={"products-page-container center-img" + (activatePCness ? " disable-highlight" : "")} id="products-page-container">
        <div className="row all-products products-page-content box-container animate__animated animate__fadeIn">
          <h1 className='products-header center gravy-font'>Welcome to our {website.szn} collection.</h1>
          <div className="product_category-container row">
            {renderCategories()}
          </div>
        </div>
        <div className="shop_learn-more glow-hover center">
          <Link href="/products"><a className="link underline">Click here to learn more about our products.</a></Link>
        </div>
      </div>
    </DefaultLayout>
    { loaded ?
      <ProductCard
        activate={activatePCness}
        productElement={productData[setPC ? setPC : 0]}
        categoryName={productData[setPC ? setPC : 0].category_name}
        productCategory={productKeys[setPC ? setPC : 0][1]}
        closeButton={closeButton()}
        pcId={setPC}
        loggedIn={logged} /> : <LoadingScreen onClick={() => closePC()} isOpen={activatePCness} /> }
  </>);
}

export default ProductCardTest;