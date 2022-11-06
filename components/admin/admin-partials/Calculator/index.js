import React, { useState } from 'react';

import styles from '../styles/Events.module.css';

const Calculator = () => {
  const [quickCalculation, setQuickCalculation] = useState(0)

  const handleInput = (e) => {
    setQuickCalculation(parseInt(e.target.value))
  }

  const calculatedTax = () => (quickCalculation * 0.0825).toFixed(2);

  const calculatedTotal = () => ((quickCalculation * 0.0825) + quickCalculation).toFixed(2)

  return (
    <div className={styles.calculator + " customers col m12 l3"}>
      <div className={styles.calcAside + " card aside"}>
        <div className="card-header">
          <h3 className={styles.calcTax}>Calculate Tax Total</h3>
        </div>

        <div className="card-body">
          <div className={styles.calcContainer}>

            <input className={styles.calcInput} onChange={handleInput} placeholder={'Enter Number Value'} type="number"></input>

            <h3>Input Amount: {quickCalculation ? quickCalculation : 0}</h3>
            <h3>Total Tax: {quickCalculation ? calculatedTax() : 0}</h3>
            <h3>Total with Tax: {quickCalculation ? calculatedTotal() : 0}</h3>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Calculator
