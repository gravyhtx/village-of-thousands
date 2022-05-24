import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { accountActivation, getPendingUser } from "../../utils/API";
import Auth from '../../utils/auth';

import { getDemoProducts } from '../../utils/API';
import { idbPromise } from '../../utils/helpers';

import DefaultLayout from "../../templates/DefaultLayout";

import LoginContainer from "../../components/LoginActivateContainer";

const Products = () => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);
  const [activateStatus, setActivateStatus] = useState(false);

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (token) {
          setIsLogged(true);
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkLogged();

    if(activateStatus) {
      setTimeout(function(){
        router.push('/')
      }, 15000);
    }
  }, []);

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


  return (
    <DefaultLayout>{/* <DefaultLayout headerImages={headerImages}> */}
      <div className="activate-page center container animate__animated animate__fadeIn">
        {!isLogged ? (
          <>
            <LoginContainer />
          </>
        ) : 
        <div className="row">
          { products.length ?
            products.map(productElement => {
              return (
                <div className="col s6" key={productElement._id}>
                  <h2>{productElement.product_name}</h2>
                  <img src={productElement.product_image[0]} height="200px" width="200px"></img>
                  {loggedIn ? 
                    (<button onClick={addToCart} 
                        data-id={productElement._id}
                        data-path={productElement.product_path}
                        data-name={productElement.product_name}
                        data-image={productElement.product_image[0]}
                        data-color={productElement.product_colors} //needs state for color
                        // data-fit=state for fit
                        // data-size= state for size
                        data-price={productElement.price}

                      >Add to Cart</button>
                    ) :
                    (
                      <button disabled>You Must Be A Part Of The Village</button>
                    )}
              </div>)
            }) :
            (
              <h1>Loading</h1>
            )
          }
        </div> }
      </div>
    </DefaultLayout>
  );
}

export default Products;