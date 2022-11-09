import { useState, useEffect } from 'react';

import Table from '../../admin-partials/Table'

import { getAllOrders } from '../../../../utils/API';
import { reverseArr } from '../../../../utils/generator';

const Orders = ({ fullPage }) => {
  const [orderObject, setorderObject] = useState({});

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await getAllOrders();
        const orders = await response.json();

        setorderObject(orders)
      } catch (err) {
        console.error(err)
      }
    }
    getOrderData();
  },[]);

  return (
    <>
      <div className={fullPage ? "recent-grid-full" : "recent-grid"}>
        <Table orders={orderObject.orderHistory ? reverseArr(orderObject.orderHistory) : []} inOrderPage={true} />
      </div>
    </>
  )
}

export default Orders