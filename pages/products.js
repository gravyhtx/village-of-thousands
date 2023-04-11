import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import DefaultLayout from '../templates/DefaultLayout';

import TextContainer from '../components/TextContainer';
import { SocialCircles } from '../components/containers/SocialCircles';
import SiteImage from '../components/SiteImage';
import { ProductImage } from '../components/dynamic-content/ProductData';
import ProductImageGrid from '../components/ProductImageGrid';

import website from '../config/site-data.json';

import { shuffleArr } from '../utils/generator';

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
      <p>We are currently preparing for our first SZN, and will be dropping the first wave of product online in 2022. We will
      be featuring our VoT Logo on <b>100% organic <span className="italics">Supima®</span> cotton</b> apparel with all of our
      materials GROWN IN THE USA.
      </p><p>
      We believe in blockchain technology and are in the process of developing our digital ecosystem using the security of the
      Ethereum network as we prepare to launch via Layer 2 Arbitrum. We invite you to add your add your wallet to your account
      to be ready to participate in our Web 3.0 community early, though for our current drop we are currently accepting
      credit card payments while we build up our brand and invite everyone interested to participate in our movement.
      </p><p>If you’d like to be notified for our release then <Link href="/register"><a className="link weight-6 underline">create
      an account</a></Link> with us today and follow us
      on <a href="https://discord.gg/t3VJZZwzmq" className="link weight-6 underline">Discord</a> so we can keep you updated.
      Sign up with your crypto wallet to prepare for our full Web 3.0 release in 2022. We will be dropping our first digital art
      collection and you will need a verified wallet for us to send your digital swag so make sure to complete your registration
      if you want to be among the first VoT Enthusiasts.
      </p>
    </>
  }
  
  const aside = {
    containerClasses: "no-bkg no-margin side-padding justify-text",
    textClasses: "big learn-more",
    p1: <p>To learn more about our Village of Thousands and get updates on our Web 3.0 release, head over to
    our "<Link href="/faq"><a className="link underline">Frequently Ask Questions</a></Link>" page. 
    You can start your journey as a VoT Enthusiast by creating an account and following us on our socials.
    We look forward to having you grow with us.</p>
  }

  const img1 = {
      containerClasses: "",
      imgClasses: "img-md",
      description: "The Movement Has Begun!",
  }

  const ImageGrid = ({ blur, category }) => { return <ProductImageGrid width={"400px"} randomSetLength={1} randomize={category} colsize={6} blur={ blur ? blur : false} /> }
  
  const catArr = ["shirts", "longsleeves", "hoodies", "crewnecks"];

  const [productGrid, setProductGrid] = useState(<>
    <ProductImage key={catArr[0]} category={catArr[0]} containerClasses={"col s12 m6 l6"} random />
    <ProductImage key={catArr[1]} category={catArr[1]} containerClasses={"col s12 m6 l6"} random />
    <ProductImage key={catArr[2]} category={catArr[2]} containerClasses={"col s12 m6 l6"} random />
    <ProductImage key={catArr[3]} category={catArr[3]} containerClasses={"col s12 m6 l6"} random />
  </>);
  
  const refreshArr = () => {
    shuffleArr(catArr);
    setProductGrid(<></>)
    setProductGrid(<>
      <ProductImage key={catArr[0]} category={catArr[0]} containerClasses={"col s12 m6 l6"} random />
      <ProductImage key={catArr[1]} category={catArr[1]} containerClasses={"col s12 m6 l6"} random />
      <ProductImage key={catArr[2]} category={catArr[2]} containerClasses={"col s12 m6 l6"} random />
      <ProductImage key={catArr[3]} category={catArr[3]} containerClasses={"col s12 m6 l6"} random />
    </>)
  }


  return (
    <DefaultLayout title={"Products"}>
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
        <div className="products_showcase-container row">
          <h2 className="center product-carousel-header gravy-font">{
            `SZN // SPRING 2022 // DROP #${dropNumber()}`
          }</h2>
          <div className="product-grid">
          <div className="row" onClick={refreshArr}>{ productGrid }</div>
          </div>
          <div className="products-link_view-all center disable-highlight">
            <span className="special-link products-link_view-all">
            <Link href="/shop">
              <a className="blue-outline special-link special-border">
              <span className="view-all-products">VIEW ALL PRODUCTS</span></a>
            </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="row product-aside box-container">
        <div className="product-aside-image col m12 l6">
          <SiteImage
            containerClasses={img1.containerClasses}
            imgClasses={img1.imgClasses}
            description={img1.description}
            siteImage={"The Movement"}
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