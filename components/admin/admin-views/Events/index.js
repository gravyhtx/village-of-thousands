import { useState, useEffect } from 'react';

import EventFormInput from '../../admin-partials/EventFormInput'
import Calculator from '../../admin-partials/Calculator';
import EventCartDisplay from '../../admin-partials/EventCartDisplay';
import { getAllCategories } from "../../../../utils/API";

const Events = () => {
  const [productList, setProductList] = useState([]);

  const [selectedSize, setSelectedSize] = useState({});
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [productSKUToBuy, setProductSKUToBuy] = useState([]);

  const [paymentType, setPaymentType] = useState("")

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await getAllCategories();
        const products = await response.json();
        
        console.log(products)
        
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

  return (
    <>
      <div className="recent-grid row">
        <EventFormInput
          productList={productList}
          selectedSize={selectedSize}
          handleSizeSelect={handleSizeSelect}
          handleProductAddition={handleProductAddition}/>
        <Calculator />
        <EventCartDisplay 
          productList={productsToBuy}
          SKU={productSKUToBuy}
          paymentType={paymentType}
          handlePaymentTypeChange={handlePaymentTypeChange}/>
        <Calculator />
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