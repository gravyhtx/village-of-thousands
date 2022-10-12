import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionDetails } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import { formatDate, taxAmount } from "../../../utils/siteFunctions";

const Table = ({ orders, inOrderPage }) => {

  const [expanded, setExpanded] = useState(undefined);
  const accordElem = useRef(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="projects col s9">
      <div className="card">
        <div className="card-header">
          <h3>Recent Orders</h3>

          {inOrderPage ? (
            <></>
            ) : (
              <button>See all (WIP)<span className="las la-arrow-right"></span></button>
          )}
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <div>
              <div className="thead row">
                <div className="header pc col s1">ORDER</div>
                <div className="header col s2">COST</div>
                <div className="header col s2">TAX</div>
                <div className="header col s2">TOTAL</div>
                <div className="header col s2">DATE</div>
                <div className="header col s3">STATUS</div>
              </div>
              <div>
                {orders ?
                  orders.map((order, index) => {
                    console.log(order)
                    const total = (order.totalPrice).toFixed(2)
                    const tax = (total * 0.0825).toFixed(2);
                    const cost = (total - tax).toFixed(2);
                    return (
                      <div className="order-accordian">
                      <Accordion
                        className={expanded === index ? "collapsible active" : "collapsible"}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                        ref={accordElem}
                        key={index}
                        disableGutters>
                        <AccordionSummary className="order-collapsible row" aria-label={"Order #"+(index+1)}>
                        <div className="order" key={order._id}>
                          <div className="number col s1">#{1000 + (orders.length - index)}</div>
                          {/* <div className="total col s1">${taxAmount(order)}</div> */}
                          <div className="tax col s2">${tax}</div>
                          <div className="cost col s2">${cost}</div>
                          <div className="total col s2">${total}</div>
                          <div className="date col s2">{formatDate(order.purchaseDate, 'utc')}</div>
                          <div className="status col s3">
                            <span className="status flagged"></span>&emsp;
                            {order.deliveryStatus}
                          </div>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="col s12 confirmation">
                            CONFIRMATION ID&emsp;//&emsp;
                            {order.paymentConfirmation}
                          </div>
                          <br/><br/><br/>
                          <div className="p-head row">
                            <div className="col s6">PRODUCT</div>
                            <div className="col s4">COST</div>
                            <div className="col s2">TAX</div>
                          </div>
                          <br/>
                          <div className="row">
                          {order.products.map((item, index) => {
                            console.log(item.product_name)
                            return (
                              <div className="product" key={index}>
                                <div className="col s6">{index+1}.&emsp;{item.product_name} // {item.product_colors}</div>
                                <div className="col s4">${item.price}</div>
                                <div className="col s2">${(item.price * 0.0825).toFixed(2)}</div>
                              </div>
                            )
                          })}
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Table
