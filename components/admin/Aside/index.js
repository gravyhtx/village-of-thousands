import React from 'react'

const Aside = () => {
  return (
    <div className="customers col m12 l3">
      <div className="card aside">
        <div className="card-header">
          <h3>New Customers</h3>

          <button>See all <span className="las la-arrow-right"></span></button>
        </div>

        <div className="card-body">
          <div className="customer row">
            <div className="info">
              <img className="" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div className="col s9">
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact row">
              <span className="las la-user-circle col s4"></span>
              <span className="las la-comment col s4"></span>
              <span className="las la-phone col s4"></span>
            </div>
          </div>
          <div className="customer row">
            <div className="info">
              <img className="" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div className="col s9">
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact row">
              <span className="las la-user-circle col s4"></span>
              <span className="las la-comment col s4"></span>
              <span className="las la-phone col s4"></span>
            </div>
          </div>
          <div className="customer row">
            <div className="info">
              <img className="" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png" width="40px" height="40px" alt=""></img>
              <div className="col s9">
                <h4>Collin Designer</h4>
                <small>Mr. Design Business</small>
              </div>
            </div>
            <div className="contact row">
              <span className="las la-user-circle col s4"></span>
              <span className="las la-comment col s4"></span>
              <span className="las la-phone col s4"></span>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Aside
