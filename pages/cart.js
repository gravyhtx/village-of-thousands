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

  async function deleteFromCart(id) {
    // event.preventDefault();
    const itemId = id
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
            <div className={(cart.length ? "got-stuff " : "empty-cart ")+"center"}>
              {cart.length ? (
                <div>
                  {cart.map((item, index) => 
                    (
                      <div className="cart-item" key={item.id}>
                        <img src={item.image} height="200px" width="200px"></img>
                        <h1>{item.product}</h1>
                        <div className="cart_close-container disable-highlight">
                          <button className='cart_delete not-a-button' data-id={item.id} onClick={() => {deleteFromCart(item.id)}} id="cart_delete" aria-label="Delete"><u>REMOVE</u></button>
                        </div>
                      </div>
                    )
                  )}
                  <h2>Price: $ {totalAmount(cart).toFixed(2)} </h2>
                  <h2>Tax (8.25%): $ {(Math.round((totalAmount(cart) * 0.0825) * 100) / 100).toFixed(2)} </h2>
                  <h2>Shipping: $ 10.00</h2>
                  <h2>Total: $ {(10 + totalAmount(cart) + (Math.round((totalAmount(cart) * 0.0825) * 100) / 100)).toFixed(2)} </h2>
                  <div className="cart_submit-container"><Link href="/checkout/details"><a>
                    <h2 className="link cart-view-products"><u>CHECKOUT</u></h2>
                  </a></Link></div>
                </div>
              ): (
                <><p>Your cart is currently empty.</p>
                <div className="cart_submit-container"><Link href="/shop"><a>
                  <p className="link cart-view-products">VIEW PRODUCTS</p>
                </a></Link></div></>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Cart;