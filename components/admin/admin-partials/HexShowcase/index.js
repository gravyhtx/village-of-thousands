import React from 'react'

const HexShowcase = (props) => {
  return (
    <div className="customers col m12 l3">
      <div className="card aside">
        <div className="card-header">
          <h3>Generated Hex</h3>
        </div>

        <div className="card-body">
          { props.orderHex !== "" ? 
            (
              <h3>{props.orderHex}</h3>
            ) :
            (
              <h3>No Hex To Show</h3>
            )
          }
        </div>
      </div>
    </div>

  )
}

export default HexShowcase
