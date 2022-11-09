import { useState, useEffect } from 'react';

import EventFormInput from '../../admin-partials/EventFormInput'
import Calculator from '../../admin-partials/Calculator';
import EventCartDisplay from '../../admin-partials/EventCartDisplay';
import { createEventOrder, getAllCategories } from "../../../../utils/API";
import { simpleHash } from '../../../../modules/hashSystem';
import HexShowcase from '../../admin-partials/HexShowcase';

import styles from './EventsView.module.css';

const Events = () => {
  const [productList, setProductList] = useState([]);

  const [selectedSize, setSelectedSize] = useState({});
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [productSKUToBuy, setProductSKUToBuy] = useState([]);

  const [paymentType, setPaymentType] = useState("")
  const [orderHex, setOrderHex] = useState("");

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await getAllCategories();
        const products = await response.json();
        
        // console.log(products)
        
        setProductList(products)
      } catch (err) {
        console.error(err)
      }
    }
    getProductData();
  }, []);
  
  // Object hash map, start with an object with no params. The only solution is a hash map
  const handleSizeSelect = (event) => {
    setSelectedSize({...selectedSize, [event.target.name]: event.target.value})
  }

  const handleProductAddition = (idToAdd) => {
    productList.forEach(category => {
      category.products.forEach(product => {
        if(product._id === idToAdd) {
          product.product_information.forEach((singleProduct)=> {
            if(singleProduct.product_size === selectedSize[idToAdd]) {
              setProductsToBuy([...productsToBuy, product])
              setProductSKUToBuy([...productSKUToBuy, singleProduct.SKU])
            }
          })
        }
      })
    })
  }

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value)
  }

  const handleOrderSetup = () => {
    const parsedProductList = productsToBuy.map(product => product.id)
    const totalPrice = productsToBuy.reduce((a,b) => a + parseInt(b.price), 0)
    const newHex = simpleHash("" + Math.random().toFixed(6))

    const newOrderObj = {
      products: parsedProductList,
      productSKU: productSKUToBuy,
      paymentType: paymentType,
      deliveryStatus: "Complete",
      totalPrice: (totalPrice + (totalPrice *0.0825)).toFixed(2),
      simpleHash: newHex,
      isPhysicalSale: "true"
    }

    setOrderHex(newHex);
    createEventOrder(newOrderObj)

  }

  return (
    <>
      <div className="recent-grid row">
        <EventFormInput
          productList={productList}
          selectedSize={selectedSize}
          handleSizeSelect={handleSizeSelect}
          handleProductAddition={handleProductAddition}/>
        <Calculator />

        <div className={styles.cartSection + ' row'}>
          <div className={styles.section}>
            <EventCartDisplay
              productList={productsToBuy}
              SKU={productSKUToBuy}
              paymentType={paymentType}
              handlePaymentTypeChange={handlePaymentTypeChange}
              handleOrderSetup={handleOrderSetup}/>
          </div>
          <div className={styles.section}>
            <HexShowcase orderHex={orderHex}/>
          </div>
        </div>
        {paymentType === "Stripe" ?
        (
          <div className="projects col m12 l9">
            <div className="card">
              <div className="card-header">
                <h3 className="col m8 l8">Email Form </h3>
              </div>
            </div>
            <h1>You selected Stripe</h1>
          </div >
        ) :
        (
          <></>
        )
        }
      </div>
    </>
  )
}

export default Events