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
  const [category, setCategory] = useState(Number);

  const [logged, setLogged] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
        setLoaded(true);

      } catch (err) {
          console.error(err);
      }
    }
    getProductData();
  }, [productData.length])

  useEffect(() => {
    setSzn(products.currentDrop)
    console.log(szn);
  }, [loaded])

  // const getCategory = (i) => getAllCategories()[i];

  return (
    <DefaultLayout>
      <div className="products-page-container">
        <div className="row products-page-content box-container animate__animated animate__fadeIn">
        <div><button className="theme-btn">CLIQUE ME</button></div>
        { loaded ? <ProductCard productElement={productData[0]} categoryName={productData[0].category_name} productCategory={products.currentDrop.shirts} loggedIn={logged} /> : <></> }
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ProductCardTest;