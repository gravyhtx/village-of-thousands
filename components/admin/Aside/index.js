import React from 'react'

const Aside = () => {
  return (
    <div className="customers">
      <div className="card">
        <div className="card-header">
          <h3>New Customers</h3>

          <button>See all <span className="las la-arrow-right"></span></button>
        </div>

        <div className="card-body">
          <div className="customer">
            <div className="info">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div>
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact">
              <span className="las la-user-circle"></span>
              <span className="las la-comment"></span>
              <span className="las la-phone"></span>
            </div>
          </div>
          <div className="customer">
            <div className="info">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div>
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact">
              <span className="las la-user-circle"></span>
              <span className="las la-comment"></span>
              <span className="las la-phone"></span>
            </div>
          </div>
          <div className="customer">
            <div className="info">
              <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div>
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact">
              <span className="las la-user-circle"></span>
              <span className="las la-comment"></span>
              <span className="las la-phone"></span>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Aside
