import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../templates/DefaultLayout";
import { idbPromise } from "../utils/helpers";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      setCart(cart)
    }

    if(!cart.length) {
      getCart()
    }
  }, [cart.length]);

  const addToCart = (event) => {
    const val = event.target.name
    idbPromise('cart', 'put', {
      product: val
    })
  }

  return (
    <DefaultLayout>

      {/* <div>
        yo this is a test
        <button onClick={addToCart} name="vot-test-tee">Add To Cart</button>
      </div> */}
      <div className="main-content animate__animated animate__fadeIn" id="content">
        <div className="index-section animate__animated animate__fadeIn cart-page">
          <h1 className="center cart-header">Cart</h1>
          <div className="cart center">
            <div className="empty-cart center">
              {cart.length ? (
                <div>
                  {cart.map((item, index) => 
                    (
                      <h1 key={index}>{item.product}</h1>
                    )
                  )}
                </div>
              ): (
                <p>Your cart is currently empty.</p>
              )}
              <Link href="/shop"><a>
              <p className="link cart-view-products">VIEW PRODUCTS</p>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Cart;