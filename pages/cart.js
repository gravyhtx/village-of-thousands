import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../templates/DefaultLayout";
import { idbPromise } from "../utils/helpers";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getCart() {
      //check for staleness here
      const { cart } = await idbPromise('cart', 'get');
      console.log(cart)
      setCart(cart)
    }

    if(!cart.length) {
      getCart()
    }
  }, [cart.length]);

  function totalAmount(arr) {
    const sum = arr.reduce((prev, curr) => prev + parseInt(curr.price), 0);

    return sum
  }

  async function deleteFromCart(event) {
    event.preventDefault();
    const itemId = event.target.dataset.id
    console.log(itemId)
    await idbPromise('cart', 'deleteone', {
      id: itemId
    })

    location.reload()
  }

  return (
    <DefaultLayout>

      <div className="main-content animate__animated animate__fadeIn" id="content">
        <div className="index-section animate__animated animate__fadeIn cart-page">
          <h1 className="center cart-header">Cart</h1>
          <div className="cart center">
            <div className="empty-cart center">
              {cart.length ? (
                <div>
                  {cart.map((item, index) => 
                    (
                      <div key={item.id}>
                        <img src={item.image} height="200px" width="200px"></img>
                        <h1>{item.product}</h1>
                        <div className="cart_close-container disable-highlight">
                          <button className='cart_close' data-id={item.id} onClick={deleteFromCart} id="cart_close" aria-label="Close">&times;</button>
                        </div>
                      </div>
                    )
                  )}
                  <h2>Price: $ {totalAmount(cart)} </h2>
                  <h2>Tax (8.25%): $ {Math.round((totalAmount(cart) * 0.0825) * 100) / 100} </h2>
                  <h2>Shipping: $ 10</h2>
                  <h2>Total: $ {10 + totalAmount(cart) + (Math.round((totalAmount(cart) * 0.0825) * 100) / 100)} </h2>
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