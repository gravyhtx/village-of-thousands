import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Cards from '../Cards'
import Table from '../Table'
import Aside from '../Aside'

import { getAllOrders } from '../../../utils/API';
import Auth from '../../../utils/auth';
import { reverseArr } from '../../../utils/generator';

const Main = ({ user, setUser }) => {
  const router = useRouter();
  const whiteListEmails = [
    "andreslong95@gmail.com",
    "godisgravy@gmail.com",
    "villageofthousands@gmail.com",
    "houstontaxconsultants@gmail.com"
  ];
  const whiteListNames = ["Andres", "Andrew", "JC", "Sylvia"]

  const [orderObject, setorderObject] = useState({});
  const [userIndex, setUserIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if(!token) {
          router.push('/login')
        }

        const profile = token ? Auth.getProfile() : null;
        
        if(!whiteListEmails.includes(profile.data.email)) {
          router.push('/')
        } else {
          setUserIndex(whiteListEmails.indexOf(profile.data.email))
        }

        const response = await getAllOrders();
        const orders = await response.json();
        setorderObject(orders)
      } catch (err) {
        console.error(err)
      }
    }
    getOrderData();
  },[]);


  useEffect(()  => {
    setUser({name: whiteListNames[userIndex], email: whiteListEmails[userIndex]});
    setLoaded(true);
  },  [!loaded])

  console.log(reverseArr(orderObject.orderHistory))

  return (
    <>
      <Cards
        totalOrders={orderObject.orderHistory ? orderObject.orderHistory.length : 0} 
        grossEarning={orderObject.orderHistory ? orderObject.totalGrossEarnings.toFixed(2) : 0} 
      />
      <div className="recent-grid row">
        <Table orders={orderObject.orderHistory ? reverseArr(orderObject.orderHistory) : []} />
        <Aside />
      </div>
    </>
  )
}

export default Main
