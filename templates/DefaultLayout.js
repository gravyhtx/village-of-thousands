import { useRouter } from 'next/router';
import Head from 'next/head'
import TopNav from '../components/TopNav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

import website from '../config/site-data.json';

import favicon from '../public/favicon.ico'

import { authCheck } from '../utils/siteFunctions';
import { useEffect } from 'react';

// import XMLHttpRequest from 'xhr2';

export default function DefaultLayout({ headerImages, title, classes, description, withAuth, children }) {

  title = title ? (website.name + " // " + title) : website.name;
  description = description ? description : website.description;
  classes = classes ? "animate__animated animate__fadeIn "+classes : "animate__animated animate__fadeIn";

  useEffect(() => {
    if(withAuth && (authCheck() === false)) {
      window.location.href='/login';
    }
  });

  return (
    <div className={classes} id="layout">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={description}
        />

        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={website.url} />
        <meta property="og:image" content={website.hero} />

        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:type" content="website" />
        <meta property="twitter:url" content={website.url} />
        <meta property="twitter:image" content={website.hero} />

        <meta name="twitter:site" content={website.twitterHandle} />
        <meta name="twitter:creator" content={website.twitterHandle} />
        <meta name="twitter:image:alt" content={website.motto} />
        <meta name="twitter:card" content={website.twitterCard} />

        <link rel="shortcut icon" href={ favicon.src } />
      </Head>
      <ScrollToTop />
      {headerImages ? <Header images={headerImages} /> : <Header />}
      <TopNav />
        <div className="main-content" id="content">
          {withAuth && authCheck() || !withAuth ? children : <></>}
        </div>
      <Footer />
    </div>
  )
}