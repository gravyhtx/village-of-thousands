import { useEffect } from 'react';
// import M from '../js/materialize';
// import NavMobile from './NavMobile';
import Head from 'next/head';
import TopNav from './TopNav';
// import NavDesktop from './NavDesktop';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children }) {
//   useEffect(() => {M.AutoInit()});
  return (
    <div className="animate__animated animate__fadeIn">
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Village of Thousands is an apparel company based out of Houston, TX to promote wellness driven by an environmentally conscious lifestyle"
        />
      </Head>
      <Header />
      <TopNav />
      {/* <NavMobile /> */}
      <>{children}</>
      <Footer />
      {/* <NavDesktop /> */}
    </div>
  )
}