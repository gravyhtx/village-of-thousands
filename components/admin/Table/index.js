import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionDetails } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import { formatDate, taxAmount } from "../../../utils/siteFunctions";
import { titleCase } from "../../../utils/generator";

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
                <div className="header col s3">COST</div>
                <div className="header col s1">TAX</div>
                <div className="header col s3">TOTAL</div>
                <div className="header col s2 left">DATE</div>
                <div className="header right col s2">STATUS</div>
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
                          <div className="cost col s3">${cost}</div>
                          <div className="tax col s1">${tax}</div>
                          <div className="total col s3">${total}</div>
                          <div className="date col left s2">{formatDate(order.purchaseDate, 'utc')}</div>
                          <div className="status right col s2">
                            <span className="status flagged"></span>&emsp;
                            {order.deliveryStatus}
                          </div>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="purchase-details_header"><b>PURCHASE DETAILS</b></div>
                          <div className="row order-details_headers">
                            <div className="confirmation col s6">
                              <b>CONFIRMATION ID</b>
                            </div>
                            <div className="address col s6">
                              <b>ADDRESS</b>
                            </div>
                          </div>
                          <div className="row order-details_info">
                            <div className="confirmation col s6">
                              <div>{order.paymentConfirmation}</div>
                            </div>
                            <div className="address col s6">
                              <div>{titleCase(order.billingAddress.addressOne)} - {order.billingAddress.zip}</div>
                            </div>
                          </div>
                          <br/>
                          <div className="p-head row">
                            <div className="col s5"><span>PRODUCT</span></div>
                            <div className="col s3 center"><span>COST</span></div>
                            <div className="col s2 center"><span>TAX</span></div>
                            <div className="col s2 right"><span>TOTAL</span></div>
                          </div>
                          <br/>
                          <div className="row">
                          {order.products.map((item, index) => {
                            const num = index+1;
                            const itemNum = num < 10 ? '00'+num : num < 100 ? '0'+num : num;
                            const cost = item.price;
                            const tax = (cost * 0.0825).toFixed(2);
                            const total = cost + tax;
                            console.log(item.product_name)
                            return (
                              <div className={"product" + (expanded === index ? " active":"")} key={index}>
                                <div className="col s5">{itemNum}&emsp;{item.product_name} // {item.product_colors}</div>
                                <div className="col s3 center">${cost}</div>
                                <div className="col s2 center">${tax}</div>
                                <div className="col s2 right">${total}</div>
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
