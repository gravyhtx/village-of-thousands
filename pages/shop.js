import Link from 'next/link';

import DefaultLayout from '../templates/DefaultLayout';

import TextContainer from '../components/TextContainer';
import ImageContainer from '../components/ImageContainer';
import ProductGridItem from '../components/ProductGridItem';

import LogoTeeBlack from "../public/images/szn/001/products/vot-logo_tee-black.png";
import Image1 from '../public/images/szn/001/the_movement.png';
import SocialCircles from '../components/SocialCircles';

import website from '../config/site-data.json';

// import RandomQuote from '../components/modules/RandomQuote';

const ProductsPage = () =>  {

  const dropNumber = () => {
    if (website.drop < 10) {
      return '00'+website.drop;
    } else if (website.drop < 100 && website.drop >= 10) {
      return '0'+ website.drop;
    } else {
      return website.drop;
    }
  }

  const main = {
    border: true,
    containerClasses: "scroll shadow thick dark-gradient padding",
    headerClasses: "center gravy-font",
    textClasses: "gravy-font justify-text products-text-main",
    // h1: `Welcome to our ${website.szn} collection.`,
    p1: <>
      <p>We are currently preparing for our first SZN, and will be dropping the first wave of product online in January 2022. We will
      be featuring our VoT Logo on <b>100% organic <span className="italics">Supima®</span> cotton</b> apparel with all of our
      materials GROWN IN THE USA.
      </p><p>We believe in  a crypto future so are preparing for the Web 3.0 movement by selling our physical products with collectible
      digital NFTs and completely integrating our website onto the blockchain by Spring 2022. For our upcoming Winter drop we will
      be offering multiple payment options until we are completely on-chain.
      </p><p>If you’d like to be notified for our release then <Link className="link weight-6 underline" href="/register"><a>create
      an account</a></Link> with us today and follow us on Instagram and Twitter so we can keep you updated. Sign up with
      your crypto wallet to prepare for our full Web 3.0 release in 2022. We will be airdropping some rewards and our first
      collection of limited edition NFTs but you will need a verified wallet for us to send your
      digital swag so make sure to complete your registration if you want to be among the first VoT Enthusiasts.
      </p>
    </>
  }
  
  const aside = {
    containerClasses: "no-bkg no-margin side-padding justify-text",
    textClasses: "big learn-more",
    p1: <p>To learn more about our Village of Thousands and get updates on our Web 3.0 release, head over to
    our "<Link className="link underline" href="/faq"><a>Frequently Ask Questions</a></Link>" page. 
    You can start your journey as a VoT Enthusiast by creating an account and following us on our socials.
    We look forward to having you grow with us.</p>
  }

  const img1 = {
      containerClasses: "",
      imgClasses: "img-lg",
      description: "",
  }

  return (
    <DefaultLayout>
    <div className="products-page-container">
      <div className="row products-page-content box-container animate__animated animate__fadeIn">
        <h1 className='products-header center gravy-font'>Welcome to our {website.szn} collection.</h1>
        <div className='scroll-box'>
        <TextContainer
          containerClasses={main.containerClasses}
          header={main.h1}
          headerClasses={main.headerClasses}
          text={main.p1}
          textClasses={main.textClasses}
          border={main.border}
          containerId="scroll-container"
        />
        </div>
        <br/>
        <div className='row'>
          <h2 className='center product-carousel-header gravy-font'>{
            `SZN // SPRING 2022 // DROP #${dropNumber()}`
          }</h2>
          <div className='product-grid'>
          <ProductGridItem image={LogoTeeBlack} />
          </div>
        </div>
      </div>
      <div className="row product-aside box-container">
        <div className="product-aside-image col m12 l6">
          <ImageContainer
            containerClasses={img1.containerClasses}
            imgClasses={img1.imgClasses}
            description={img1.description}
            src={Image1}
          />
        </div>
        <div className="col m12 l6">
          <TextContainer
            containerClasses={aside.containerClasses}
            text={aside.p1}
            textClasses={aside.textClasses}
          />
          <br/>
          <br/>
          <SocialCircles containerClasses="products-page-socials" />
        </div>
      </div>
    </div>
    </DefaultLayout>
  )
}

export default ProductsPage;