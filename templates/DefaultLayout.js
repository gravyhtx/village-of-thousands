import { useWindowSize, screenWidth } from '../modules/getWindow';
import TopNav from '../components/TopNav';
// import NavMobile from './NavMobile';
// import NavDesktop from './NavDesktop';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function DefaultLayout({ children }) {
  return (
    <div className="animate__animated animate__fadeIn" id="layout">
      <ScrollToTop />
      <Header />
      <TopNav />
      {/* <NavMobile /> */}
      <div id="content" className="main-content">{children}</div>
      <Footer />
      {/* <NavDesktop /> */}
    </div>
  )
}