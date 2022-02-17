import React from 'react';
// import '../styles/style.css';
import '../styles/materialize.css';
import '../styles/animate.css';
import '../styles/fonts.css';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  return (
  <React.StrictMode>
  <Component {...pageProps} />
  </React.StrictMode>
  )
}

export default MyApp
