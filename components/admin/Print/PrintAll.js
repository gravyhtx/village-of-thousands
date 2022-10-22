import { useState, useEffect } from 'react';

import Modal from '../../dynamic-content/Modal';

import PrintableLayout from "../../../templates/PrintableLayout";
import PrintContent from '../../print/PrintContent';
import { getAllOrders } from '../../../utils/API';
import { reverseArr } from '../../../utils/generator';

import Auth from '../../../utils/auth';
import LoginContainer from '../../LoginContainer';
import PrintOut from './PrintOut';
import PrintHeader from '../../print/PrintHeader';
import { useRouter } from 'next/router';

const PrintAll = ({ login }) => {
  

  const [orderObject, setorderObject] = useState({});
  const [userIndex, setUserIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [printActivate, setPrintActivate] = useState(false);
  const [firstToLast, setDirection] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const whiteListEmails = [
    "andreslong95@gmail.com",
    "godisgravy@gmail.com",
    "villageofthousands@gmail.com",
    "houstontaxconsultants@gmail.com"
  ];
  const whiteListNames = ["Andres", "Andrew", "JC", "Sylvia"]

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

  const adminLogin =
    <div className="row container signup-container animate__animated animate__fadeIn login-container">
      <LoginContainer admin={true}/>
    </div>

  const [settingsObj, setSettingsObj] = useState({
    detailedText: 'Detailed Order Report // ',
    detailed: true,
  });

  const handleSettings = (e) => {
    const { value, name } = e.target;
    setSettingsObj({ ...settingsObj, [name]: !value })
  }

  const checkbox = (name, value) => {
    return (
      <input name={ name } type='checkbox' checked={value?'checked':null} onChange={ (e) => handleSettings(e) } />
    )
  }

  const settings = () => {
    return (<>
      <span>{ settingsObj.detailedText }</span>
      <label>
        <span>{ checkbox('detailed', settingsObj.detailed) }</span>
      </label>
    </>)
  }

  const orderData = firstToLast ? orderObject.orderHistory : reverseArr(orderObject.orderHistory);


  return <>{printActivate === false ?
    <PrintableLayout
      header={
        <PrintHeader
          openModal={openModal}
          setOpenModal={setOpenModal}
          printActivate={printActivate}
          setPrintActivate={setPrintActivate} />} printActivate={printActivate}>
      {login  ? adminLogin :
        <PrintContent
          printActivate={printActivate}
          setPrintActivate={setPrintActivate}
          showTime={true}
          settingsObj={settingsObj}
          orders={orderData ? orderData : []} />}
    </PrintableLayout> :
    <PrintOut settingsObj={settingsObj} orderData={orderData} printActivate={printActivate} setPrintActivate={setPrintActivate} />}
    {openModal === true && printActivate === false ?
      <Modal modalClasses='print-settings' title={"Print Settings"} activate={openModal} setActivate={setOpenModal} id="settings">
        {settings()}
      </Modal> : <></>}
    </>
}

export default PrintAll;