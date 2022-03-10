import React, { useState, useEffect } from "react";

export default function Test () {

  const [count, setCount] = useState({count1: 0, count2: 0, count3: 0});
  const [totalCount, setTotalCount] = useState(5);

  const cost = 0.1;
  const [totalCost, setTotalCost] = useState(0.0);

  const round = (num) => { return (Math.round(num * 10) / 10) };

  const increment = (name, value) => {
    if (totalCount <= 5 && totalCount > 0 && value < 5) {
      setCount({...count, [name]: value+1});
      setTotalCount(totalCount - 1);
      setTotalCost(round(totalCost + cost));
    }
  }
  const decrement = (name, value) => {
    if (totalCount < 5 && value > 0) {
      setCount({...count, [name]: value-1});
      setTotalCount(totalCount + 1);
      setTotalCost(round(totalCost - cost));
    }
  }

  const buttonEl = (name, value) => [
    <button onClick={() => decrement(name, value)}>-</button>,
    <button onClick={() => increment(name, value)}>+</button>
  ];

  useEffect(() => {
    console.log(count);
    console.log(totalCount);
  });
  
  return (
    <div className="center">
      {/* <h1>You can mint 5 and no less than 3.</h1>
      <h2>Cost {totalCost} ETH</h2>
      <div>
        <div>Count 1: {count.count1 || 0}</div>
        {buttonEl('count1', count.count1)[0]}
        {buttonEl('count1', count.count1)[1]}
      </div>
      <div>
        <div>Count 2: {count.count2 || 0}</div>
        {buttonEl('count2', count.count2)[0]}
        {buttonEl('count2', count.count2)[1]}
      </div>
      <div>
        <div>Count 3: {count.count3 || 0}</div>
        {buttonEl('count3', count.count3)[0]}
        {buttonEl('count3', count.count3)[1]}
      </div>
      <div>You have {totalCount} more.</div> */}
    </div>
  )
}