import React from 'react';
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

    return (( grossTotal - stripePercent - shippingPercent - taxPercent)).toFixed(2);
  }
  return (
        <div className="cards row">

          <div className="card-single_container col s12 m3">
            <div className="card-single">
              <div>
                { totalOrders > 0 ?
                <h1>{totalOrders}</h1> : <></>}
                <div>Total Orders</div>
              </div>
              <div>
                <span className="las la-users"></span>
              </div>
            </div>
          </div>

          <div className="card-single_container col s12 m3">
            <div className="card-single">
              <div>
                { grossEarning > 0 ?
                <h1>${grossEarning}</h1> : <></>}
                <div>Gross Income</div>
              </div>
              <div>
                <span className="las la-clipboard"></span>
              </div>
            </div>
          </div>

          <div className="card-single_container col s12 m3">
            <div className="card-single">
              <div>
                { taxAmount(grossEarning, totalOrders) > 0 ?
                <h1>${taxAmount(grossEarning, totalOrders)}</h1> : <></>}
                <div>Taxes Collected</div>
              </div>
              <div>
                <span className="las la-shopping-bag"></span>
              </div>
            </div>
          </div>

          <div className="card-single_container col s12 m3">
            <div className="card-single">
              <div>
                { netAmount(grossEarning, totalOrders) > 0 ?
                <h1>${netAmount(grossEarning, totalOrders)}</h1> : <></>}
                <div>Net Income</div>
              </div>
              <div>
                <span className="las la-google-wallet"></span>
              </div>
            </div>
          </div>

        </div>
  )
}

export default Cards
