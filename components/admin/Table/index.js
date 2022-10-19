import { useEffect, useState, useRef } from "react";
import { Accordion, AccordionDetails, capitalize } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import { formatDate, taxAmount } from "../../../utils/siteFunctions";
import { titleCase } from "../../../utils/generator";
import { simpleHash } from "../../../modules/hashSystem";
import { MiCon } from "../../icons/MatIco";

const Table = ({ orders, inOrderPage }) => {

  const [expanded, setExpanded] = useState(undefined);
  const accordElem = useRef(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="projects col m12 l9">
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
          <div className="order-table table-responsive">
            <div className="thead row">
              <div className="header o-num col s2">ORDER</div>
              <div className="header o-cost col s2">COST</div>
              <div className="header o-tax col s2">TAX</div>
              <div className="header o-totes col s2">TOTAL</div>
              <div className="header o-date col s2 left">DATE</div>
              <div className="header o-stat right col s2">STATUS</div>
            </div>
            <div className="order-accordian_map">
            {orders ?
              orders.map((order, index) => {
              {/* console.log(order) */}
              const total = (order.totalPrice).toFixed(2)
              const tax = (total * 0.0825).toFixed(2);
              const cost = (total - tax).toFixed(2);
                return (
                  <div className="order-accordian" key={index}>
                    <Accordion
                      className={expanded === index ? "order-collapsible collapsible active" : "collapsible"}
                      expanded={expanded === index}
                      onChange={handleChange(index)}
                      ref={accordElem}
                      key={index}
                      disableGutters>
                      <AccordionSummary
                        className="order-collapsible row"
                        aria-label={"Order #"+(index+1)}
                        style={{ marginBottom: '0' }}>
                      <div className="order-summary" key={order._id}>
                        <div className="number col s2">#{1000 + (orders.length - index)}</div>
                        {/* <div className="total col s1">${taxAmount(order)}</div> */}
                        <div className="cost col s2">${cost}</div>
                        <div className="tax col s2">${tax}</div>
                        <div className="total col s2">${total}</div>
                        <div className="date col left s2 center">{formatDate(order.purchaseDate, 'utc')}</div>
                        <div className="status right col s2 center">
                          <span className="status flagged"></span>
                          {/* &emsp;{order.deliveryStatus} */}
                        </div>
                      </div>
                      </AccordionSummary>
                      <AccordionDetails className="order-collapsible_details">
                        <div className="purchase-details_header row">
                          <b className="col s12">PURCHASE DETAILS</b>
                        </div>
                        <div className="row order-details_info">
                          <div className="confirmation col s12">
                            <div><b>CONFIRMATION:</b> {simpleHash(order.paymentConfirmation)}</div>
                            <div>
                              <b>STATUS:</b>&emsp;
                              <span className="status flagged"></span>
                              {order.deliveryStatus}
                            </div>
                          </div>
                        </div>
                        <div className="row order-details_headers">
                          {/* <div className="confirmation col s6">
                            <b>CONFIRMATION ID</b>
                          </div> */}
                          <div className="address col s12">
                            <b>ADDRESS</b>
                          </div>
                        </div>
                        <div className="row order-details_info">
                          {/* <div className="confirmation col s6">
                            <div>{order.paymentConfirmation}</div>
                          </div> */}
                          <div className="address col s12">
                            <div>{titleCase(order.billingAddress.addressOne)}
                              <br/>{capitalize(order.billingAddress.city).trim()},&nbsp;
                              {order.billingAddress.state}&nbsp;{order.billingAddress.zip}</div>
                          </div>
                        </div>
                        <br/>
                        <div className="order-deets">
                          <div className="details-headers row">
                            <div className="col s5"><span>PRODUCT</span></div>
                            <div className="col s3 center"><span>COST</span></div>
                            <div className="col s2 center"><span>TAX</span></div>
                            <div className="col s2 center"><span>TOTAL</span></div>
                          </div>
                          <br/>
                          <div className="p-deets row">
                          {order.products.map((item, index) => {
                            const num = index+1;
                            const itemNum = num < 10 ? '00'+num : num < 100 ? '0'+num : num;
                            const cost = item.price;
                            const tax = (cost * 0.0825).toFixed(2);
                            const total = Number(cost) + Number(tax);
                            return (
                              <div className={"product-map" + (expanded === index ? " active":"")} key={index}>
                                <div className="col s5">
                                  <span className="number">{itemNum}//</span>
                                  &emsp;{item.product_name} - {item.product_colors}</div>
                                <div className="col s3 center">${cost}</div>
                                <div className="col s2 center">${tax}</div>
                                <div className="col s2 center">${total}</div>
                              </div>
                            )
                          })}
                          </div>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </div>)
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

  )
}

export default Table
