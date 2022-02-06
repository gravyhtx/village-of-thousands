import { useState, useEffect } from 'react';
{/*
// HOW TO USE COMPONENT

  <div>{LoadedComponent(preLoaded, loaded)}</div>

*/}

export default function LoadedComponent(preLoadComponent,loadedComponent) {
  // Set 'component' to the 'preLoadComponent' before state updates
  const [component, setComponent] = useState(preLoadComponent);

  useEffect(() => {
    // Update 'component' to the 'loadedComponent' when state updates
    const updateComponent = async () => {
      try {
        setTimeout(setComponent(loadedComponent),1000);
        console.log(component)
      } catch (err) {
          console.error(err);
      }
    };

    updateComponent();

  },[])
  return component;
}