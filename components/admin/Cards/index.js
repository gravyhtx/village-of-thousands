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
              <h1>123</h1>
              <span>Post Stripe</span>
            </div>
            <div>
              <span className="las la-shopping-bag"></span>
            </div>
          </div>

          <div className="card-single">
            <div>
              <h1>$6k</h1>
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
