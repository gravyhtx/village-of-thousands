import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Cards from '../Cards'
import Table from '../Table'
import Aside from '../Aside'

import { getAllOrders } from '../../../utils/API';
import Auth from '../../../utils/auth';

const Main = () => {
  const router = useRouter();
  const whiteList = ["andreslong95@gmail.com", "godisgravy@gmail.com"]

  const [orderObject, setorderObject] = useState({});

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if(!token) {
          router.push('/login')
        }

        const profile = token ? Auth.getProfile() : null;
        
        if(!whiteList.includes(profile.data.email)) {
          router.push('/')
        }

        const response = await getAllOrders();
        const orders = await response.json();
        console.log(orders)
        setorderObject(orders)
      } catch (err) {
        console.error(err)
      }
    }
    getOrderData();
  },[])

  return (
    <>
      <Cards 
        totalOrders={orderObject.orderHistory ? orderObject.orderHistory.length : 0} 
        grossEarning={orderObject.totalGrossEarnings} 
      />
      <div className="recent-grid">
        <Table orders={orderObject.orderHistory} />
        <Aside />
      </div>
    </>
  )
}

export default Main
