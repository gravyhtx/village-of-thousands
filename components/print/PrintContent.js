import { useEffect } from "react";
import { capitalize } from "@mui/material";
import { currentTime, formatDate } from "../../utils/siteFunctions";
import { titleCase } from "../../utils/generator";
import { simpleHash } from "../../modules/hashSystem";

import style from './PrintContent.module.css'


const PrintContent = ({ printActivate, setPrintActivate, settingsObj, orders, showTime, printing }) => {
  printing = printing ? printing : false;

  useEffect(() => {
    if(printActivate === true) {
      setTimeout(function () {
        setPrintActivate(false); }, 1000);
    }
  }, [])

  const title = <h2><b>Village of Thousands</b> [ All Orders ]</h2>;
  const date = <><b>{formatDate(true)}</b>{(showTime ? ' | ' + currentTime() : '')}</>;

  return (
    <div className={printing===false?style.printContent:style.printingContent}>
      <div className="pagebreak">&nbsp;</div>
      <div className={settingsObj.detailed?style.printHeader:style.printHeaderSimple}>
        { title }
        <div className={style.printDate}>
        { date }
      
        {settingsObj.detailed === false ?
        <div className={style.headerRow}>
          <div className="thead row center">
            <div className="header o-num col s2">ORDER</div>
            <div className="header o-cost col s3">COST</div>
            <div className="header o-tax col s2">TAX</div>
            <div className="header o-totes col s3">TOTAL</div>
            <div className="header o-date col s2">DATE</div>
          </div>
        </div> : <></>}
    </div>
    </div>
    {orders ?
      orders.map((order, index) => {
      const total = (order.totalPrice).toFixed(2)
      const tax = (total * 0.0825).toFixed(2);
      const cost = (total - tax).toFixed(2);
      const delStat = order.deliveryStatus;
      const orderStatus = 'status ' + 
        (!delStat
          ? 'error'
        : delStat.toLowerCase() === 'complete'
          ? 'active'
        : delStat.toLowerCase() === 'processing'
          ? 'flagged'
          : '')
        return (<>
          <div className={settingsObj.detailed?style.orderContainer:style.orderContainerSimple} key={index}>
          <div className="pagebreak">&nbsp;</div>
            <div
              className={style.orderPrintArea}
              key={index}>
              {settingsObj.detailed ?
              <div className={style.headerRow}>
              <div className="pagebreak">&nbsp;</div>
                <div className="thead row center">
                  <div className="header o-num left col s2">ORDER</div>
                  <div className="header o-cost col s3">COST</div>
                  <div className="header o-tax col s2">TAX</div>
                  <div className="header o-totes col s3">TOTAL</div>
                  <div className="header o-date col s2">DATE</div>
                </div>
              </div> : <></>}
              <div className="pagebreak">&nbsp;</div>
              <div
                className="print_row center row"
                aria-label={"Order #"+(index+1)}
                style={{ marginBottom: '10px' }}>
                <div className={style.orderSummary} key={order._id}>
                  <div className="number col s2 left">
                  <span className={settingsObj.detailed?style.oNum:style.oNumSimple}>#{1000 + (orders.length - index)}</span></div>
                  {/* <div className="total col s1">${taxAmount(order)}</div> */}
                  <div className="cost col s3">${cost}</div>
                  <div className="tax col s2">${tax}</div>
                  <div className="total col s3">${total}</div>
                  <div className="date col s2">{formatDate(order.purchaseDate, 'locale')}</div>
                </div>
              </div>
              <br/>
              { settingsObj.detailed ? <>
                <div className="order-collapsible_details">
                  <div className={style.deets}>
                    <div className="details-headers row">
                      <div className={style.deetsHeaders}>
                        <div className="col s5"><span>PRODUCT</span></div>
                        <div className="col s3 center"><span>COST</span></div>
                        <div className="col s2 center"><span>TAX</span></div>
                        <div className="col s2 center"><span>TOTAL</span></div>
                      </div>
                    </div>
                  
                    <div className="print-deets row">
                      {order.products.map((item, index) => {
                        const num = index+1;
                        const itemNum = num < 10 ? '00'+num : num < 100 ? '0'+num : num;
                        const cost = item.price;
                        const tax = (cost * 0.0825).toFixed(2);
                        const total = Number(cost) + Number(tax);
                        return (
                          <div className={style.printMap} key={index}>
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
                    {order.billingAddress ?
                      <div className="order-details_headers">
                        <div className={style.addressHeader}>
                          <b>ADDRESS:</b>&emsp;
                          <span className={style.orderAddress}>
                            <span>{titleCase(order.billingAddress.addressOne)},
                              &nbsp;{capitalize(order.billingAddress.city).trim()},&nbsp;
                              {order.billingAddress.state}&nbsp;{order.billingAddress.zip}</span>
                          </span>
                        </div>
                      </div>
                    : <></>}
                    <div className={style.confirmation}>
                      <div className="col s12">
                        <br/>
                        <span><b>PAYMENT TYPE:</b>&emsp;
                          { order.isPhysicalSale === true && !order.paymentType
                            ? "Physical"
                          : order.isPhysicalSale === true && order.paymentType
                            ? order.paymentType
                            : "Online"}
                        </span>
                        &emsp;{'//'}&emsp;
                        <span><b>CONFIRMATION:</b>&emsp;{
                          order.paymentConfirmation
                            ? simpleHash(order.paymentConfirmation)
                          : order.simpleHash
                            ? order.simpleHash
                            : ''}</span>
                        &emsp;{'//'}&emsp;
                        <span>
                          <b>STATUS:</b>&emsp;
                          <span className={orderStatus}></span>
                          &nbsp;{order.deliveryStatus}
                        </span>
                      </div>
                    </div>
                </div>
              </div></> : <></>}
            </div>
          </div>
          </>)
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
  )
}
export default PrintContent;