import Head from 'next/head';

import style from './Print.module.css';

import website from "../config/site-data.json";
import { checkType } from "../utils/validation";
import favicon from '../public/favicon.ico';

const PrintableLayout = ({ children, header, title, description, classes, showTitle, landscape, paperSize, printActivate }) => {

  title = title ? (website.name + " // " + title) : website.name;
  description = description ? description : website.description;
  classes = classes ? "animate__animated animate__fadeIn "+classes : "animate__animated animate__fadeIn";
  console.log(printActivate)

  const printMode = landscape === true ? style.printAreaLandscape : style.printAreaPortrait;
  paperSize = checkType(paperSize, 'string') ? paperSize : 'A4';

  return(<>
    <Head>
      <title>{title ? title : 'Print Me!'}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#ffffff" />
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
    {printActivate === false ?
      <div className={style.body}>
        { header }
        <div className="printable-background" />
        <div className={"printable-content "+paperSize} id="printable">
          <div className="printable-title">{title && showTitle === true ? title : <></>}</div>
          <div className={printMode}>
            {children?children:<></>}
          </div>
        </div>
      </div> : <></>}
  </>)
}

export default PrintableLayout;