import Image from "next/image";

import products from "../../config/products.json";
import website from '../../config/site-data.json';

import { randomize } from "../../utils/generator";

////////////////////////
// SZN 001 - PRODUCTS //
////////////////////////

// CREWNECKS
import vocnbk from '../../public/images/szn/001/products/crewnecks/vocn-bk.png';
import vocnnt from '../../public/images/szn/001/products/crewnecks/vocn-nt.png';
import vocnaq from '../../public/images/szn/001/products/crewnecks/vocn-aq.png';
import vocnsf from '../../public/images/szn/001/products/crewnecks/vocn-sf.png';
import vocnlv from '../../public/images/szn/001/products/crewnecks/vocn-lv.png';

// HOODIES
import vohdbk from '../../public/images/szn/001/products/hoodies/vohd-bk.png';
import vohdnt from '../../public/images/szn/001/products/hoodies/vohd-nt.png';
import vohdaq from '../../public/images/szn/001/products/hoodies/vohd-aq.png';
import vohdsf from '../../public/images/szn/001/products/hoodies/vohd-sf.png';
import vohdlv from '../../public/images/szn/001/products/hoodies/vohd-lv.png';

// LONGSLEEVES
import volsbk from '../../public/images/szn/001/products/longsleeves/vols-bk.png';
import volswt from '../../public/images/szn/001/products/longsleeves/vols-wt.png';
import volsaq from '../../public/images/szn/001/products/longsleeves/vols-aq.png';
import volssf from '../../public/images/szn/001/products/longsleeves/vols-sf.png';
import volslv from '../../public/images/szn/001/products/longsleeves/vols-lv.png';

// SHIRTS
import votsbk from '../../public/images/szn/001/products/shirts/vots-bk.png';
import votswt from '../../public/images/szn/001/products/shirts/vots-wt.png';
import votsaq from '../../public/images/szn/001/products/shirts/vots-aq.png';
import votssf from '../../public/images/szn/001/products/shirts/vots-sf.png';
import votslv from '../../public/images/szn/001/products/shirts/vots-lv.png';
import { maxWidth } from "@mui/system";

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
    public: [vocnbk, vocnnt, vocnaq, vocnsf, vocnlv],
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
    public: [vohdbk, vohdnt, vohdaq, vohdsf, vohdlv],
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
    public: [volsbk, volswt, volsaq, volssf, volslv],
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
    public: [votsbk, votswt, votsaq, votssf, votslv],
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
  category ? category.toLowerCase() : '';
  
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
  imgClasses = imgClasses ? imgClasses : '';

  const szn = website.szn;

  const p = categoryData(category ? category.toLowerCase() : '');
  const categoryLength = p.colors.length;
  const randomId = randomize(categoryLength);

  const color = p.colors[random ? randomId : colorId];

  const img = {
    src: "/"+p.public[random ? randomId : colorId].src,
    width: p.public[random ? randomId : colorId].width,
    height: p.public[random ? randomId : colorId].height,
    alt: description ? description : p.name+' // '+color+' // '+szn,
    imgClasses: imgClasses ? 'image-class '+imgClasses : 'image-class',
    containerClasses: containerClasses ? 'image-container '+containerClasses : 'image-container',
    contain: contain ? ' contain' : '',
    imgId: imgId ? imgId : '',
    containerId: containerId ? containerId : 'container-'+(random ? randomId : colorId),
    draggable: allowDrag ? true : false,
    highlight: allowHighlight ? "" : " disable-highlight",
  }

  // const boxSizing = {
  //   maxWidth: boxSize ? boxSize : '100%',
  //   maxHeight: boxSize ? boxSize : '100%',
  // }

  const productImg =
      <Image layout='responsive'
        src={ img.src }
        sizes="100vw"
        width={ p.public[random ? randomId : colorId].width }
        height={ p.public[random ? randomId : colorId].height }
        draggable={img.draggable}
        description={img.description}
        // className={ img.imgClasses }
        id={img.imgId} />

  return (
    <div className={img.containerClasses+img.contain+img.highlight}>
      <div className={img.imgClasses}>{productImg}</div>
    </div>
  )
}