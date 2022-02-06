import Link from 'next/link';

import Header from '../components/Header';
import Footer from '../components/Footer';
// import NavDesktop from '../components/NavDesktop';
// import NavMobile from '../components/NavMobile';

import Hero from '../components/Hero';
import HeroImage from '../public/images/vot_banner.png';
import RandomQuote from '../modules/RandomQuote';

import TextContainer from '../components/TextContainer';
import ImageContainer from '../components/ImageContainer';
import SocialCircles from '../components/SocialCircles';

import Pixels from '../public/images/art/choose_your_vot.png';
import Hope from '../public/images/art/hope.png';

const Home = () => {
  const main = {
    border: true,
    containerClasses: "thick shadow dark-gradient",
    textClasses: "col s12 index-main gravy-font",
    p1: <>
      <div className="row img-main_container desktop only">
        <div className="col m12 l6 justify-text">
          <br/>
          <div><span className="weight-6 special-text">Village of Thousands</span> is a Web 3.0 ready, skateboard culture lifestyle
          brand and community that produces high quality, sustainable NFT-authenticated fashion and products.
          </div>
          <p>Our village is a state of mind. We believe that our dedication to <span className="weight-7 italics">sustainability</span> is
          what will help us achieve our vision of building a community with the <span className="weight-7 italics">ability to sustain.</span>
          </p>
        </div>
        <div className="col m12 l6 p-style index-main_row">
          <ImageContainer width={"400px"} imgClasses={"index-main_img"} description={"Hope"} src={Hope} contain />
        </div>
      </div>
      <div className="row index-main_row">
        <ImageContainer width={"400px"} containerClasses={"img-main mobile only"} imgClasses={"index-main_img"} description={"Hope"} src={Hope} contain />
        <div className="index-main_row col s12 weight-2 justify-text">We are passionate about minimizing our impact on the environment
        so we can focus on maximizing our efforts to build our community. Our company uses high quality products and
        services that prioritize fair trade practices at every step in our development process.
        </div>
      </div>
    </>
  }
  return (
    <div className="animate__animated animate__fadeIn">
    <Header />
    {/* <NavMobile /> */}
    <div id="content" className="main-content">
    <Hero image={HeroImage} priority />
    <div className="spacer"/>
    <div className="index-section animate__animated animate__fadeIn">
      <div className="container col s12 index-main">
        <div className="mobile only index_mobile-container justify-text gravy-font">
          <div className="index_mobile-box">
            <div><span className="weight-5 special-text">Village of Thousands</span> is a Web 3.0 ready, skateboard culture lifestyle
              brand and community that produces high quality, sustainable NFT-authenticated fashion and products.
            </div>
            <br/>
            <div>Our village is a state of mind. We believe that our dedication to <span className="weight-7 italics">sustainability</span> is
              what will help us achieve our vision of building a community with the <span className="weight-7 italics">ability to sustain.</span>
            </div>
          </div>
        </div>
        <TextContainer
            border={main.border}
            containerClasses={main.containerClasses}
            text={main.p1}
            textClasses={main.textClasses}
        />
      </div>
      <div className="index-quote col s12 italics center">
        <RandomQuote className={"home-zen"} type={"zen"} />
      </div>
      <div className="big-spacer"/>
      <div className="index-content row">
        <div className="index-nft-art col s12 m6 center break">
          <ImageContainer description="Choose Your VoT" src={Pixels} contain />
        </div>
        <div className="index-socials col s12 m6 break">
          <div className="right-align index-aside justify-text">
            <div className="index-aside_text">
              <p>We strive to be a leader in providing quality, eco-friendly products in the fashion world and set high standards
              for all emerging Web 3.0 products and services.
              </p><p>Our company is currently preparing for a full Web 3.0 release in early 2022 when we will begin selling all
              of our products with NFTs as a means of authentication. If you’d like to join the movement, follow us on our socials
              and you can get ready for our first drop by <Link href="/register"><a className="text-link">creating an
              account</a></Link> with us today.
              </p>
            </div>
            <SocialCircles />
          </div>
        </div>
      </div>
      <div className="big-spacer"/>
    </div>
    </div>
    <Footer />
    {/* <NavDesktop /> */}
    </div>
  );
}

export default Home;