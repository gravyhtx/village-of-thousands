import TopNav from '../components/TopNav';
// import NavMobile from './NavMobile';
// import NavDesktop from './NavDesktop';
import Header from '../components/Header';
import Footer from '../components/Footer';

// const ScrollToTop = () => {
  // const router = useRouter();
  // const { pathname } = router.pathname;
  // useEffect(() => {
  //   const checkId = window.location.hash ? window.location.hash.substring(1) : "";
  //   const qId = Number(checkId-1);
  //   const rootEl = document.getElementById('layout');
  //   const scrollPosition = () => {
  //     checkId
  //     ? ('scrollToEl-'+qId).scrollIntoView({behavior: "smooth", block: "start"})
  //     : rootEl.scrollIntoView({behavior: "smooth", block: "start"});
  //   }
  //   setTimeout(() => {
  //     scrollPosition()},200);
  // }, [pathname]);

  // return null;
// };

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