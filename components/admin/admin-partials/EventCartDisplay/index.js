import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import styles from '../styles/Events.module.css';

const EventCartDisplay = ({ productList, SKU, paymentType, handlePaymentTypeChange, handleOrderSetup }) => {

  const showCost = Number(productList.reduce((prev, curr) => prev + curr.price, 0)).toFixed(2);
  const showTax = Number(showCost * 0.0825).toFixed(2);
  const showTotal = (Number(showCost) + Number(showTax)).toFixed(2);

  return (
    <>
      <div className={styles.cartDisplay + " col m12 l9"}>
        <div className="card">
          <div className={styles.header + " card-header"}>
            <h3 className="col m8 l8">Event Cart</h3>
            <div className="col m4 l4">
              <FormControl sx={{ width: '100%', float: 'right !important', }}>
                <InputLabel id="cash-option-label">Type</InputLabel>
                <Select
                  className={styles.paymentSelect}
                  labelId="cash-option-label"
                  id="cash-option-select"
                  value={paymentType}
                  label="Model"
                  onChange={handlePaymentTypeChange}
                  sx={{ width: '100%', minWidth: 150 }}
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Apple Pay">Apple Pay</MenuItem>
                  <MenuItem value="Zelle">Zelle</MenuItem>
                  <MenuItem value="Stripe">Stripe</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        {productList.length > 0 ?
        <div className={styles.cartContainer}>
          <div className={styles.cartList}>
            <div className={styles.header + ' row'}>
              <div className="col s4"><b>PRODUCT</b></div>
              <div className="col s4"><b>SKU</b></div>
              <div className="col s4"><b>PRODUCT ID</b></div>
            </div>
            {productList.length > 0 ?
              productList.map((product, index) => {
                console.log(product)
                return (
                  <div className={styles.products} key={index}>
                    <div className='row'>
                      <div className="col s4">{product.product_name}</div>
                      <div className="col s4 monospace">{SKU[index].toUpperCase()}</div>
                      <div className="col s4">{product._id}</div>
                    </div>
                  </div>
                )
              }) :
              (
                <p>No Items In Cart</p>
              )
              }
          </div>

          <div className={styles.cartTotals}>
            <div className="row">
              <h3 className="col s2"><b>COST:</b></h3>
              <h3 className="col s2">${showCost}</h3>
            </div>
            <div className="row">
              <h3 className="col s2"><b>TAX:</b></h3>
              <h3 className="col s2">${showTax}</h3>
            </div>
            <div className={styles.showTotal + " row"}>
              <h3 className="col s2"><b>TOTAL:</b></h3>
              <h3 className="col s2">${showTotal}</h3>
            </div>
          </div>
        </div>
        : <></>}
        <div className={styles.processBtnContainer}>
          {
            paymentType !== "" && productList.length > 0 ?
            (
              <button className={styles.setUpOrder} onClick={handleOrderSetup}>PROCESS ORDER</button>
            ) :
            (
              <></>
            )
          }
        </div>
      </div>
    </>
  )
}

export default EventCartDisplay;