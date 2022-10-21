
import { useEffect } from 'react';
import PrintContent from '../../print/PrintContent';

const PrintOut = ({ printActivate, setPrintActivate, orderData }) => {

  let printed = false;

  useEffect(() => {
    if(printActivate === true) {
      window.print();
      printed = true
    }
    if (printed === true) {
      printed = false;
      setTimeout(function () {
        setPrintActivate(false); }, 1000);
      }
    })
  return (
    <div className="print-out">
      <PrintContent showTime={true} orders={orderData ? orderData : []} />
    </div>
  )
}

export default PrintOut;