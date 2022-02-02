import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NavDesktop from '../components/NavDesktop';
import NavMobile from '../components/NavMobile';

import Hero from '../components/modules/Hero';
import HeroImage from '../images/vot_banner-pipe.png';
import RandomQuote from '../components/modules/RandomQuote';

import TextContainer from '../components/TextContainer';
import ImageContainer from '../components/ImageContainer';
import SocialCircles from '../components/SocialCircles';

import Pixels from '../images/art/choose_your_vot.png';
import Hope from '../images/art/hope.png';

const Home = () => {
    const main = {
        border: true,
        containerClasses: "thick shadow dark-gradient",
        textClasses: "col s12 index-main gravy-font",
        p1: <>
            <div className="row">
              <div className="col m12 l6 weight-4 justify-text">
                <br/>
                <div>Village of Thousands is a Web 3.0 ready skateboard lifestyle brand and community that sells high quality,
                sustainable apparel and NFT-authenticated products.
                </div>
                <p>Our village is a state of mind. We believe that our dedication to <b>sustainability</b> is what will help us
                achieve our vision of building a community with the <b>ability to sustain.</b>
                </p>
              </div>
              <div className="col m12 l6 p-style">
                <ImageContainer width={"400px"} imgClasses={""} description={"Hope"} src={Hope} />
              </div>
            </div>
            <div className="row">
              <div className="col s12 weight-2 justify-text">We are passionate about minimizing our impact on the environment
              so we can focus on maximizing our efforts to build our community. Our company uses high quality products and
              services that prioritize fair trade practices at every step in our development process.
              </div>
            </div>
        </>
    }
    return (
      <div className="animate__animated animate__fadeIn">
      <Header />
      <NavMobile />
      <div id="content" className="main-content">
      <Hero image={HeroImage} />
      <div className="spacer"/>
      <div className="index-section animate__animated animate__fadeIn">
        <div className="container col s12 index-main">
          <TextContainer
              border={main.border}
              containerClasses={main.containerClasses}
              text={main.p1}
              textClasses={main.textClasses}
          />
        </div>
        <br/>
        <div className="col s12 italics center">
          <RandomQuote className={"home-zen"} type={"zen"} />
        </div>
        <div className="big-spacer"/>
        <div className="index-content row">
          <div className="col s12 m7 l6 center">
          <ImageContainer imgClasses="" description="Choose Your VoT" src={Pixels} />
          </div>
          <div className="col s12 m5 l6">
            <div className="right-align index-aside justify-text">
                <p>We strive to be a leader in providing quality, eco-friendly products in the fashion world and set high standards
                for all emerging Web 3.0 products and services.
                </p><p>Our company is currently preparing for a full Web 3.0 release in 2022 when we will be selling all
                NFT-authenticated products. If you’d like to join the movement, follow us on our socials and you can get
                ready for our first drop by <Link className="text-link" to="/register">creating an account</Link> with
                us today.
                </p>
                <br/>
                <SocialCircles />
            </div>
          </div>
        </div>
        <div className="big-spacer"/>
      </div>
      </div>
      <Footer />
      <NavDesktop />
      </div>
    );
}

export default Home;