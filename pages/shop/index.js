import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { accountActivation, getPendingUser } from "../../utils/API";
import Auth from '../../utils/auth';

import { getDemoProducts } from '../../utils/API';
import { idbPromise } from '../../utils/helpers';

import DefaultLayout from "../../templates/DefaultLayout";

import LoginContainer from "../../components/LoginActivateContainer";
import ProductCard from "../../components/ProductCard";

import website from '../../config/site-data.json';

const Products = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loggedIn, setLogged] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
    try {
      const profile = Auth.loggedIn() ? Auth.getProfile() : null;
        if(profile) {
          setLogged(true)
        }

        const response = await getDemoProducts();
        const productInfo = await response.json();

        console.log(productInfo)
        setProducts(productInfo)
      } catch (err) {
          console.error(err);
      }
    }
    getProductData();
  }, [])

  return (
    <DefaultLayout>
      <div className="products-page-container">
        <div className="row all-products products-page-content box-container animate__animated animate__fadeIn">
          <h1 className='products-header center gravy-font'>Welcome to our {website.szn} collection.</h1>
          <div className="activate-page center container animate__animated animate__fadeIn">
            <div className="row">
              { products.length ?
                products.map(productElement => {
                  return (
                    <div className="col s6" key={productElement._id}>
                      <ProductCard productElement={productElement} loggedIn={loggedIn} />
                    </div>)
                }) :
                (
                  <h1>Loading</h1>
                )
              }
            </div>
          </div>
        </div>
        <div className="shop_learn-more glow-hover center"><Link href="/products"><a className="link underline">Click here to learn more about our products.</a></Link></div>
      </div>
    </DefaultLayout>
  );
}

export default Products;