const { useState, useEffect, useRef } = React;

export const counter = (callback, delay) => {

  function useInterval() {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
      savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

  function count() {
    const [count, setCount] = useState(0);

    useInterval(() => {
      setCount(count + 1);
    }, 1000);
    
    return count;
  };
  
  count();

}