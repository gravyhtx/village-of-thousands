import { useState, useEffect } from 'react';
{/*
// HOW TO USE COMPONENT

  const c1 = <h1>Hi</h1>;
  const c2 = <h1>MOM!</h1>;

  <LoadComponents preLoadComponent={c1} loadedComponent={c2} />

  Expected Output (Pre-Load):  Hi
  Expected Output (Pre-Load):  MOM!

*/}

export default function LoadComponents({preLoadComponent, loadedComponent, count, interval, classes}) {

  // Set active 'component' to the 'preLoadComponent' before state updates. Sets an empty Fragment as default.
  const a = preLoadComponent ? preLoadComponent : <></>;
  const b = loadedComponent = loadedComponent ? loadedComponent : <></>;
  const [component, setComponent] = useState(a);

  // Set defaults.
  count = count ? count : false;
  interval = interval ? interval : 1000;
  classes = classes ? ' '+classes : '';

  useEffect(() => {
    // Update  'component' to the 'loadedComponent' when state updates.
    const updateComponent = async () => {

      try {
        // Set timeout delay if parameters are entered (correctly).
        if (count === "boolean" || typeof interval === 'number') {
          setTimeout(setComponent(b), interval);
        } else if (count && count !== "boolean") {
          console.error('Parameter "count" must be true/false or left blank.')
        } else if (interval && interval !== "number") {
          console.error('Parameter "interval" must be a number or left blank (default is 1000).')
        // Otherwise just switch in the new component immediately upon load.
        } else {
          setComponent(b);
        }
      } catch (err) {
          console.error(err);
      }
    };

    updateComponent();

  },[]);

  return (
    <div className={'preload-component'+classes}>
      {component}
    </div>
  )
}