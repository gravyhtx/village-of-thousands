import { useEffect } from 'react';
// import M from '../js/materialize';
// import NavMobile from './NavMobile';
import TopNav from './TopNav';
// import NavDesktop from './NavDesktop';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
//   useEffect(() => {M.AutoInit()});
  return (
    <div className="animate__animated animate__fadeIn">
      <Header />
      <TopNav />
      {/* <NavMobile /> */}
      <>{children}</>
      <Footer />
      {/* <NavDesktop /> */}
    </div>
  )
}