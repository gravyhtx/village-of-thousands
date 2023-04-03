import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { randomize } from "../../utils/generator";
import website from '../../config/site-data.json';

////////////////////////
// SZN 001 - PRODUCTS //
////////////////////////

// CREWNECKS
import vocnbk from '../../public/images/szn/001/products/crewnecks/vocn-bk.webp';
import vocnnt from '../../public/images/szn/001/products/crewnecks/vocn-nt.webp';
import vocnaq from '../../public/images/szn/001/products/crewnecks/vocn-aq.webp';
import vocnsf from '../../public/images/szn/001/products/crewnecks/vocn-sf.webp';
import vocnlv from '../../public/images/szn/001/products/crewnecks/vocn-lv.webp';
import vocnbkfb from '../../public/images/szn/001/products/crewnecks/vocn-bk.png';
import vocnntfb from '../../public/images/szn/001/products/crewnecks/vocn-nt.png';
import vocnaqfb from '../../public/images/szn/001/products/crewnecks/vocn-aq.png';
import vocnsffb from '../../public/images/szn/001/products/crewnecks/vocn-sf.png';
import vocnlvfb from '../../public/images/szn/001/products/crewnecks/vocn-lv.png';

// HOODIES
import vohdbk from '../../public/images/szn/001/products/hoodies/vohd-bk.webp';
import vohdnt from '../../public/images/szn/001/products/hoodies/vohd-nt.webp';
import vohdaq from '../../public/images/szn/001/products/hoodies/vohd-aq.webp';
import vohdsf from '../../public/images/szn/001/products/hoodies/vohd-sf.webp';
import vohdlv from '../../public/images/szn/001/products/hoodies/vohd-lv.webp';
import vohdbkfb from '../../public/images/szn/001/products/hoodies/vohd-bk.png';
import vohdntfb from '../../public/images/szn/001/products/hoodies/vohd-nt.png';
import vohdaqfb from '../../public/images/szn/001/products/hoodies/vohd-aq.png';
import vohdsffb from '../../public/images/szn/001/products/hoodies/vohd-sf.png';
import vohdlvfb from '../../public/images/szn/001/products/hoodies/vohd-lv.png';

// LONGSLEEVES
import volsbk from '../../public/images/szn/001/products/longsleeves/vols-bk.webp';
import volswt from '../../public/images/szn/001/products/longsleeves/vols-wt.webp';
import volsaq from '../../public/images/szn/001/products/longsleeves/vols-aq.webp';
import volssf from '../../public/images/szn/001/products/longsleeves/vols-sf.webp';
import volslv from '../../public/images/szn/001/products/longsleeves/vols-lv.webp';
import volsbkfb from '../../public/images/szn/001/products/longsleeves/vols-bk.png';
import volswtfb from '../../public/images/szn/001/products/longsleeves/vols-wt.png';
import volsaqfb from '../../public/images/szn/001/products/longsleeves/vols-aq.png';
import volssffb from '../../public/images/szn/001/products/longsleeves/vols-sf.png';
import volslvfb from '../../public/images/szn/001/products/longsleeves/vols-lv.png';

// SHIRTS
import votsbk from '../../public/images/szn/001/products/shirts/vots-bk.webp';
import votswt from '../../public/images/szn/001/products/shirts/vots-wt.webp';
import votsaq from '../../public/images/szn/001/products/shirts/vots-aq.webp';
import votssf from '../../public/images/szn/001/products/shirts/vots-sf.webp';
import votslv from '../../public/images/szn/001/products/shirts/vots-lv.webp';
import votsbkfb from '../../public/images/szn/001/products/shirts/vots-bk.png';
import votswtfb from '../../public/images/szn/001/products/shirts/vots-wt.png';
import votsaqfb from '../../public/images/szn/001/products/shirts/vots-aq.png';
import votssffb from '../../public/images/szn/001/products/shirts/vots-sf.png';
import votslvfb from '../../public/images/szn/001/products/shirts/vots-lv.png';

const drop = {
  id: "001",
  shipping: {
    "service": "USPS",
    "cost": 12
  }
}

const catalog = {
  crewnecks: {
    name: "VoT Logo Crewneck",
    category: "crewnecks",
    price: 110,
    colors: ["Black", "Natural", "Aqua", "Seafoam", "Lavender"],
    public: [vocnbk, vocnnt, vocnaq, vocnsf, vocnlv,],
    fallback: [vocnbkfb, vocnntfb, vocnaqfb, vocnsffb, vocnlvfb,],
    sizes: ["SM", "MD", "LG", "XL", "2X"],
    description: ["Relaxed Fit", "100% Supima® Cotton", "100% Grown in the USA"],
    sku: ["VOCNR-1001-BK", "VOCNR-1001-NT", "VOCNR-1001-AQ", "VOCNR-1001-SF", "VOCNR-1001-LV"],
    hexBase: ["#000000", "#f0eee4", "#5d9ca4", "#bcc8c6", "#b58da1"]
  },
  hoodies: {
    name: "VoT Logo Hoodie",
    category: "hoodies",
    price: 112,
    colors: ["Black", "Natural", "Aqua", "Seafoam", "Lavender"],
    public: [vohdbk, vohdnt, vohdaq, vohdsf, vohdlv,],
    fallback: [vohdbkfb, vohdntfb, vohdaqfb, vohdsffb, vohdlvfb,],
    sizes: ["SM", "MD", "LG", "XL", "2X"],
    description: ["Relaxed Fit", "100% Supima® Cotton", "100% Grown in the USA"],
    sku: ["VOHDR-1001-BK", "VOHDR-1001-NT", "VOHDR-1001-AQ", "VOHDR-1001-SF", "VOHDR-1001-LV"],
    hexBase: ["#000000", "#f0eee4", "#5d9ca4", "#bcc8c6", "#b58da1"]
  },
  longsleeves: {
    name: "VoT Logo Longsleeve",
    category: "longsleeves",
    price: 64,
    colors: ["Black", "White", "Aqua", "Seafoam", "Lavender"],
    public: [volsbk, volswt, volsaq, volssf, volslv,],
    fallback: [volsbkfb, volswtfb, volsaqfb, volssffb, volslvfb,],
    sizes: ["SM", "MD", "LG", "XL", "2X"],
    description: ["Relaxed Fit", "100% Supima® Cotton", "100% Grown in the USA"],
    sku: ["VOLSR-1001-BK", "VOLSR-1001-WT", "VOLSR-1001-AQ", "VOLSR-1001-SF", "VOLSR-1001-LV"],
    hexBase: ["#000000", "#ffffff", "#5d9ca4", "#bcc8c6", "#b58da1"]
  },
  shirts: {
    name: "VoT Logo Tee",
    category: "shirts",
    price: 55,
    colors: ["Black", "White", "Aqua", "Seafoam", "Lavender"],
    public: [votsbk, votswt, votsaq, votssf, votslv,],
    fallback: [votsbkfb, votswtfb, votsaqfb, votssffb, votslvfb,],
    sizes: ["SM", "MD", "LG", "XL", "2X"],
    description: ["Relaxed Fit", "100% Supima® Cotton", "100% Grown in the USA"],
    sku: ["VOTSR-1001-BK", "VOTSR-1001-WT", "VOTSR-1001-AQ", "VOTSR-1001-SF", "VOTSR-1001-LV"],
    hexBase: ["#000000", "#ffffff", "#5d9ca4", "#bcc8c6", "#b58da1"]
  }
}

const sizingChart = {
  crewnecks: {
    body:   ["","","","",""],
    chest:  ["","","","",""],
    sleeve: ["","","","",""]
  },
  hoodies: {
    body:   ["","","","",""],
    chest:  ["","","","",""],
    sleeve: ["","","","",""]
  },
  longsleeves: {
    body:   ["","","","",""],
    chest:  ["","","","",""],
    sleeve: ["","","","",""]
  },
  shirts: {
    body:   ["","","","",""],
    chest:  ["","","","",""],
    sleeve: ["","","","",""]
  }
}

export const allProductData = () => {
  return [drop, catalog, sizingChart]
}

export const categoryData = (category) => {
  category = category ? category.toLowerCase() : '';
  
  const cn = catalog.crewnecks;
  const hd = catalog.hoodies;
  const ls = catalog.longsleeves;
  const ts = catalog.shirts;

  const output =
    (category === 'crewnecks' || category === 'cn') ? cn
  : (category === 'hoodies' || category === 'hd') ? hd
  : (category === 'longsleeves' || category === 'ls') ? ls
  : ts;

  return output;
}

export const ProductImage = ({ category, colorId, containerClasses, imgClasses, description, boxSize, imgId, containerId, allowHighlight, contain, allowDrag, random }) => {

  containerClasses = containerClasses ? 'product-image '+containerClasses : '';
  imgClasses = imgClasses ?? '';
  
  // Get product and category data
  const szn = website.szn;
  const p = categoryData(category ?? '');
  const categoryLength = p.colors.length;
  
  const idRef = useRef(null);
  const randNum = () => {
    if(!idRef.current) {
      idRef.current = randomize(categoryLength);
    }
    return idRef.current;
  }
  
  // Set 'id' from 'colorId' as it changes to update image
  const pid = colorId ?? randNum();
  const [id, setId] = useState(pid);
  const color = p.colors[id];

  // Set 'imgSrc' and 'err' to get the proper 'src', 'width', and 'height' on load/change/error
  //   >> 'p.public' contains '.webp' images
  //   >> 'p.fallback' contains '.png' images
  const [imgSrc, setImgSrc] = useState(p.public[id]);
  const [err, setErr] = useState(false);

  const handleError = useCallback(() => {
    setErr(true);
    setImgSrc(p.fallback[id]);
  }, [id, p.fallback[id]])

  useEffect(() => {
    setImgSrc(!err?p.public[id]:p.fallback[id]);
  }, [id, p.fallback, p.public, setImgSrc]);
  
  useEffect(() => {
    setId(pid);
  }, [pid]);

  const handleContextMenu = (event) => {
    event.preventDefault();
  }

  const img = {
    src: imgSrc?"/"+imgSrc.src:'',
    width: imgSrc?imgSrc.width:null,
    height: imgSrc?imgSrc.height:null,
    alt: description ? description : p.name+' // '+color+' // '+szn,
    imgClasses: 'image-class' + (imgClasses ? ' '+imgClasses : ''),
    containerClasses: 'image-container' + (containerClasses ? ' ' + containerClasses : ''),
    contain: contain ? ' contain' : '',
    imgId: imgId ? imgId : '',
    containerId: containerId ? containerId : 'container-'+(colorId ?? randNum()),
    draggable: allowDrag ? true : false,
    highlight: allowHighlight ? '' : ' disable-highlight',
  }

  const productImg =
      <Image layout='responsive'
        src={ img.src }
        sizes="100vw"
        width={ img.width }
        height={ img.height }
        draggable={img.draggable}
        description={img.description}
        onError={handleError}
        id={img.imgId} />

  return (
    <div onContextMenu={handleContextMenu} className={img.containerClasses+img.contain+img.highlight}>
      {imgSrc?<div className={img.imgClasses}>{productImg}</div>:<></>}
    </div>
  )
}