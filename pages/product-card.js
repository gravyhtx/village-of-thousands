import { useEffect, useState } from 'react';
import Link from 'next/link';

import DefaultLayout from '../templates/DefaultLayout';

import ProductCard from '../components/ProductCard';

import { productImage } from '../modules/productImages';
import products from '../config/products.json'

import Auth from '../utils/auth';
import { getAllCategories } from '../utils/API';

export const ProductCardTest = () => {

  // const id = id ? id : '';

  const [productData, setProductData] = useState([
    // { category_name: "", product_information: [], products: [], tags: [], _id: "" },
    // { category_name: "", products: [], tags: [], _id: "" },
    // { category_name: "", products: [], tags: [], _id: "" },
    // { category_name: "", products: [], tags: [], _id: "" }
  ]);

  const [szn, setSzn] = useState({});

  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [activatePCness, setActivatePC] = useState(true);
  const [setPC, setSetPC] = useState(2);

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
        console.log(productData[0]);
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
    console.log(szn);
  }, [loaded]);

  const closeButton = () => {
    return (
      <div role="button" aria-label="Close" className="product-card_close-container disable-highlight">
        <div onClick={() => setActivatePC(false)} className="product-card_close" id="product-card_close" aria-label="Close">&times;</div>
      </div>
    )
  }

  // const getCategory = (i) => getAllCategories()[i];

  return (<>
    <DefaultLayout classes={activatePCness ? " disable-highlight" : ""}>
      <div className={"products-page-container" + (activatePCness ? " disable-highlight" : "")}>
        <div className="row products-page-content box-container animate__animated animate__fadeIn">
        <div><button onClick={() => setActivatePC(true)} className="theme-btn">CLIQUE ME</button></div>
        </div>
      </div>
    </DefaultLayout>
    { loaded ?
      <ProductCard
        activate={activatePCness}
        productElement={productData[setPC]}
        categoryName={productData[setPC].category_name}
        productCategory={productKeys[setPC][1]}
        closeButton={closeButton()}
        loggedIn={logged} /> : <></> }
  </>);
}

export default ProductCardTest;