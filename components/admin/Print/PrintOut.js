
import { useEffect } from 'react';
import PrintContent from '../../print/PrintContent';

const PrintOut = ({ settingsObj, printActivate, setPrintActivate, orderData }) => {

  let printed = false;

  useEffect(() => {
    if(orderData  && printActivate === true) {
      setTimeout(function () {
        window.print();
        printed = true; }, 500);
    }
      setTimeout(function () {
        setPrintActivate(false); }, 1000);
  }, [])
    
  return (
    <div className="print-out">
      <PrintContent settingsObj={settingsObj} printing={true} showTime={true} orders={orderData ? orderData : []} />
    </div>
  )
}

export default PrintOut;