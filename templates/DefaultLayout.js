import { useWindowSize, screenWidth } from '../modules/getWindow';
import { UserDataProvider } from '../components/context/UserDataContext';
import Head from 'next/head';
import TopNav from '../components/TopNav';
// import NavMobile from './NavMobile';
// import NavDesktop from './NavDesktop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';
import NavDesktop from '../components/NavDesktop';

export default function DefaultLayout({ children }) {
  return (
    <UserDataProvider>
    <div className="animate__animated animate__fadeIn" id="layout">
      <Head>
        <meta charset="utf-8" />
        <title>Village of Thousands</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Village of Thousands is an apparel company based out of Houston, TX to promote wellness driven by an environmentally conscious lifestyle"
        />
      </Head>
      <ScrollToTop />
      <Header />
      <TopNav />
      {/* {useWindowSize().width < 770 ? <TopNav /> : <></>} */}
      {/* <NavMobile /> */}
      <div id="content" className="main-content">{children}</div>
      
      <Footer />
      {/* {useWindowSize().width >= 770 ? <NavDesktop /> : <></>} */}
      {/* <NavDesktop /> */}
    </div>
    </UserDataProvider>
  )
}