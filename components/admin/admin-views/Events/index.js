import { useState, useEffect } from 'react';

import EventFormInput from '../../admin-partials/EventFormInput'
import Calculator from '../../admin-partials/Calculator';

const Events = () => {
  const [calculatorInput, setCalculatorInput] = useState(0);



  return (
    <>
      <div className="recent-grid row">
        <EventFormInput />
        <Calculator />
      </div>
    </>
  )
}

export default Events