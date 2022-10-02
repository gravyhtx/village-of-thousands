import React from 'react'

const Table = ({ orders }) => {
  return (
    <div className="projects">
      <div className="card">
        <div className="card-header">
          <h3>Recent Orders</h3>

          <button>See all (WIP)<span className="las la-arrow-right"></span></button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <td>Payment Confirmation</td>
                  <td>Payment Amount</td>
                  <td>Purchase Date</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {orders ?
                  orders.map(order => {
                    return (
                      <tr key={order._id}>
                        <td>{order.paymentConfirmation}</td>
                        <td>{order.totalPrice}</td>
                        <td>{order.purchaseDate}</td>
                        <td>
                          <span className="status flagged"></span>
                          {order.deliveryStatus}
                        </td>
                      </tr>
                    )
                  })  : (
                    <tr>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>
                          <span className="status flagged"></span>
                          Loading...
                        </td>
                      </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Table
