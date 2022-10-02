import React from 'react'
// import API from "../../utils/API";

const Cards = ({totalOrders, grossEarning}) => {
  // const [imgUrl, setImg] = useState("")

  // const information = event => {
  //   API.searchPoke()
  //     .then(res => {
  //       setImg(res.data.sprites.front_default)
  //       console.log(res.data.sprites.front_default)
  //     })
  // }

  const taxAmount = (grossTotal, orderTotal) => {
    const stripePercent = ((grossTotal * 0.029) + 0.3).toFixed(2);
    const shippingPercent = orderTotal * 12;

    return ((grossTotal- stripePercent - shippingPercent) * 0.0825).toFixed(2)
  }

  const netAmount = (grossTotal, orderTotal) => {
    const stripePercent = ((grossTotal * 0.029) + 0.3).toFixed(2);
    const shippingPercent = orderTotal * 12;
    const taxPercent = taxAmount(grossTotal, orderTotal)

    return (( grossTotal - stripePercent - shippingPercent - taxPercent)).toFixed(2)
  }
  return (
        <div className="cards">
          <div className="card-single">
            <div>
              <h1>{totalOrders}</h1>
              <span>Total Orders</span>
            </div>
            <div>
              <span className="las la-users"></span>
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>${grossEarning}</h1>
              <span>Gross Income</span>
            </div>
            <div>
              <span className="las la-clipboard"></span>
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>${taxAmount(grossEarning, totalOrders)}</h1>
              <span>Taxes Collected</span>
            </div>
            <div>
              <span className="las la-shopping-bag"></span>
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>${netAmount(grossEarning, totalOrders)}</h1>
              <span>Net Income</span>
            </div>
            <div>
              <span className="las la-google-wallet"></span>
            </div>
          </div>

        </div>
  )
}

export default Cards
