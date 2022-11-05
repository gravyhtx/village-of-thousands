import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const EventCartDisplay = ({ productList, SKU, paymentType, handlePaymentTypeChange, handleOrderSetup }) => {
  return (
    <>
      <div className="projects col m12 l9">
        <div className="card">
          <div className="card-header">
            <h3 className="col m10 l10">Event Cart</h3>
            <div className="col m2 l2">
              <FormControl>
                <InputLabel id="cash-option-label">Model</InputLabel>
                <Select
                  labelId="cash-option-label"
                  id="cash-option-select"
                  value={paymentType}
                  label="Model"
                  onChange={handlePaymentTypeChange}
                  sx={{ minWidth: 80 }}
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
          productList.map((product, index) => {
            return (
              <div key={index}>
                <p>Product: {product._id}</p>
                <p>SKU: {SKU[index]}</p>
              </div>
            )
          }) :
          (
            <p>No Items In Cart</p>
          )
        }
        <h3>Total Money: {productList.reduce((prev, curr) => prev + curr.price, 0)}</h3>
        {
          paymentType !== "" ?
          (
            <button onClick={handleOrderSetup}>Set Up Order</button>
          ) :
          (
            <></>
          )
        }
      </div>
    </>
  )
}

export default EventCartDisplay;