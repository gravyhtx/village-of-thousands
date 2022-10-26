import Link from 'next/link';

import DefaultLayout from '../templates/DefaultLayout';

import Hero from '../components/Hero';
import HeroImage from '../public/images/vot_banner.png';
import RandomQuote from '../components/dynamic-content/RandomQuote';

import TextContainer from '../components/TextContainer';
import ImageContainer from '../components/ImageContainer';
import SocialCircles from '../components/SocialCircles';

import Pixels from '../public/images/art/choose_your_vot.png';
import Hope from '../public/images/art/hope.png';

import { useWindowSize } from '../modules/getWindow';

const Home = () => {

  const main = {
    border: true,
    containerClasses: "thick shadow dark-gradient padding",
    textClasses: "col s12 index-main gravy-font",
    id: "main-text-container",
    p: <>
      <div className="row img-main_container">
        <div className="main-text col m12 l6 justify-text">
          <div style={{'marginTop': '20px'}}><span className="weight-6 special-text">Village of Thousands</span> is a Web 3.0 ready, skateboard culture lifestyle
          brand and community that produces high quality, sustainable NFT-authenticated fashion and products.
          </div>
          <p>Our village is a state of mind. We believe that our dedication to <span className="weight-7 italics">sustainability</span> is
          what will help us achieve our vision of building a community with the <span className="weight-7 italics">ability to sustain.</span>
          </p>
        </div>
        <div className="col m12 l6 p-style index-main_row">
          <ImageContainer imgClasses={"index-main_img"} description={"Hope"} src={Hope} contain />
        </div>
      </div>
      <div className="row index-main_row">
        <ImageContainer containerClasses={"img-main mobile only"} imgClasses={"index-main_img"} description={"Hope"} src={Hope} contain />
        <div className="index-main_row col s12 weight-2 justify-text">We are passionate about minimizing our impact on the environment
        so we can focus on maximizing our efforts to build our community. Our company uses high quality products and
        services that prioritize fair trade practices at every step in our development process.
        </div>
      </div>
    </>
  }

  const mobile = {
    containerClasses: "index_mobile-container no-bkg no-margin no-padding",
    textClasses: "justify-text gravy-font",
    id: "mobile-text-container",
    p: <>
      <div className="index_mobile-box">
        <div><span className="weight-5 special-text">Village of Thousands</span> is a Web 3.0 ready, skateboard culture lifestyle
          brand and community that produces high quality, sustainable NFT-authenticated fashion and products.
        </div>
        <br/>
        <div>Our village is a state of mind. We believe that our dedication to <span className="weight-7 italics">sustainability</span> is
          what will help us achieve our vision of building a community with the <span className="weight-7 italics">ability to sustain.</span>
        </div>
      </div>
      <br/>
      <div className="row index-main_row">
        <ImageContainer containerClasses={"img-main mobile only"} imgClasses={"index-main_img"} description={"Hope"} src={Hope} contain />
        <div className="index-main_row col s12 weight-2 justify-text">We are passionate about minimizing our impact on the environment
        so we can focus on maximizing our efforts to build our community. Our company uses high quality products and
        services that prioritize fair trade practices at every step in our development process.
        </div>
      </div>
    </>
  }

  const socials = {
    containerClasses: "index_aside-container no-bkg no-margin no-padding",
    textClasses: "index-content row",
    id: "socials-text-container",
    p: <>
      <div className="index-nft-art col s12 m6 center break">
        <ImageContainer containerClasses="contain-md" description="Choose Your VoT" src={Pixels} />
      </div>
      <div className="index-socials col s12 m6 break">
        <div className="right-align index-aside justify-text">
          <div className="index-aside_text">
            <p>We strive to be a leader in providing quality, eco-friendly products in the fashion world and set high standards
            for all emerging Web 3.0 products and services.
            </p><p>Our company is currently preparing for a full Web 3.0 release in 2023 when we will begin selling
            our products with NFTs for collection and as a means of authentication. If you’d like to join the movement,
            follow us on our socials
            and you can get ready for our first drop by <Link href="/register"><a className="text-link">creating an
            account</a></Link> with us today.
            </p>
          </div>  
          <SocialCircles />
        </div>
      </div>
    </>
  }

  return (
    <DefaultLayout>
    <div id="content" className="main-content">
      <Hero image={HeroImage} />
      <div className="index-section animate__animated animate__fadeIn">
        <div className="container index-main">
          {useWindowSize().width <= 880 ?
            <TextContainer
              containerClasses={mobile.containerClasses}
              text={mobile.p}
              textClasses={mobile.textClasses}
              containerId={mobile.id}
            /> :
            <TextContainer
              border={main.border}
              containerClasses={main.containerClasses}
              text={main.p}
              textClasses={main.textClasses}
              containerId={main.id}
            />
          }
        </div>
        <div className="index-quote italics center">
          <RandomQuote className={"home-zen"} type={"zen"} />
        </div>
        <TextContainer
            containerClasses={socials.containerClasses}
            text={socials.p}
            textClasses={socials.textClasses}
            containerId={socials.id}
            />
      </div>
    </div>
    </DefaultLayout>
  );
}

export default Home;