import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { accountActivation, getPendingUser } from "../../utils/API";
import Auth from '../../utils/auth';

import { getAllCategories } from '../../utils/API';
import { idbPromise } from '../../utils/helpers';

import DefaultLayout from "../../templates/DefaultLayout";

import LoginContainer from "../../components/LoginActivateContainer";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const router = useRouter();

  // const [isLogged, setIsLogged] = useState(false);
  // const [activateStatus, setActivateStatus] = useState(false);

  // useEffect(() => {
  //   const checkLogged = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (token) {
  //         setIsLogged(true);
  //       }
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   checkLogged();

  //   if(activateStatus) {
  //     setTimeout(function(){
  //       router.push('/')
  //     }, 15000);
  //   }
  // }, []);

  const [products, setProducts] = useState([]);
  const [loggedIn, setLogged] = useState(false);

  useEffect(() => {
    const getProductData = async () => {
    try {
      const profile = Auth.loggedIn() ? Auth.getProfile() : null;
        if(profile) {
          setLogged(true)
        }

        const response = await getAllCategories();
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
    <DefaultLayout>{/* <DefaultLayout headerImages={headerImages}> */}
      <div className="activate-page center container animate__animated animate__fadeIn">
        {!loggedIn ? (
          <>
            <LoginContainer />
          </>
        ) : 
        <div className="row">
          {/* { products.length ?
            products.map(productElement => {
              return (
                <div className="col s6" key={productElement._id}>
                  <ProductCard productElement={productElement} loggedIn={loggedIn} />
              </div>)
            }) :
            (
              <h1>Loading</h1>
            )
          } */}
        </div> }
      </div>
    </DefaultLayout>
  );
}

export default Products;