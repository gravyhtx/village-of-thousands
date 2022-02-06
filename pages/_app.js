import React from 'react';
import '../styles/globals.css';
// import '../styles/style.css';
import '../styles/materialize.css';
import '../styles/fonts.css'


function MyApp({ Component, pageProps }) {
  return (
  <React.StrictMode>
  <Component {...pageProps} />
  </React.StrictMode>
  )
}

export default MyApp
