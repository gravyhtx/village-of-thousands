/////////////
// IMPORTS //
/////////////

  // SHIRTS
  import voTsBk from '../public/images/szn/001/products/shirts/vots-bk.png' // BLACK
  import voTsWt from '../public/images/szn/001/products/shirts/vots-wt.png' // WHITE
  import voTsAq from '../public/images/szn/001/products/shirts/vots-aq.png' // AQUA
  import voTsSf from '../public/images/szn/001/products/shirts/vots-sf.png' // SEAFOAM
  import voTsLv from '../public/images/szn/001/products/shirts/vots-lv.png' // LAVENDAR

  // LONGSLEEVES
  import voLsBk from '../public/images/szn/001/products/longsleeves/vols-bk.png' // BLACK
  import voLsWt from '../public/images/szn/001/products/longsleeves/vols-wt.png' // WHITE
  import voLsAq from '../public/images/szn/001/products/longsleeves/vols-aq.png' // AQUA
  import voLsSf from '../public/images/szn/001/products/longsleeves/vols-sf.png' // SEAFOAM
  import voLsLv from '../public/images/szn/001/products/longsleeves/vols-lv.png' // LAVENDAR

  // HOODIES
  import voHdBk from '../public/images/szn/001/products/hoodies/vohd-bk.png' // BLACK
  import voHdNt from '../public/images/szn/001/products/hoodies/vohd-nt.png' // NATURAL
  import voHdAq from '../public/images/szn/001/products/hoodies/vohd-aq.png' // AQUA
  import voHdSf from '../public/images/szn/001/products/hoodies/vohd-sf.png' // SEAFOAM
  import voHdLv from '../public/images/szn/001/products/hoodies/vohd-lv.png' // LAVENDAR

  // CREWNECKS
  import voCnBk from '../public/images/szn/001/products/crewnecks/vocn-bk.png' // BLACK
  import voCnNt from '../public/images/szn/001/products/crewnecks/vocn-nt.png' // NATURAL
  import voCnAq from '../public/images/szn/001/products/crewnecks/vocn-aq.png' // AQUA
  import voCnSf from '../public/images/szn/001/products/crewnecks/vocn-sf.png' // SEAFOAM
  import voCnLv from '../public/images/szn/001/products/crewnecks/vocn-lv.png' // LAVENDAR

  // PRODUCTS JSON
  import products from '../config/products.json'

  // UTILS
  import { emptyData, ImageCDN } from '../utils/siteFunctions' // BLANK IMAGE
  import { arrayEl, select } from '../utils/generator'


  const p = products.currentDrop;
  const crewnecks = p.crewnecks;
  const hoodies = p.hoodies;
  const longsleeves = p.longsleeves
  const shirts = p.shirts;

  

///////////////////////////////////
// PRODUCT IMAGE FILES -- PUBLIC //
///////////////////////////////////

  // OUTPUT SINGLE PRODUCT IMAGE
    export const productImage = ( filename ) => {

      const ts = [voTsBk, voTsWt, voTsAq, voTsSf, voTsLv];
      const ls = [voLsBk, voLsWt, voLsAq, voLsSf, voLsLv];
      const hd = [voHdBk, voHdNt, voHdAq, voHdSf, voHdLv];
      const cn = [voCnBk, voCnNt, voCnAq, voCnSf, voCnLv];

      const emptyUrl = emptyData(true);
      
      let output;

      // SHIRTS
      if(filename.toLowerCase() === "vots-bk") { output = ts[0] }
      if(filename.toLowerCase() === "vots-wt") { output = ts[1] }
      if(filename.toLowerCase() === "vots-aq") { output = ts[2] }
      if(filename.toLowerCase() === "vots-sf") { output = ts[3] }
      if(filename.toLowerCase() === "vots-lv") { output = ts[4] }

      // LONGSLEEVES
      if(filename.toLowerCase() === "vols-bk") { output = ls[0] }
      if(filename.toLowerCase() === "vols-wt") { output = ls[1] }
      if(filename.toLowerCase() === "vols-aq") { output = ls[2] }
      if(filename.toLowerCase() === "vols-sf") { output = ls[3] }
      if(filename.toLowerCase() === "vols-lv") { output = ls[4] }

      // HOODIES
      if(filename.toLowerCase() === "vohd-bk") { output = hd[0] }
      if(filename.toLowerCase() === "vohd-nt") { output = hd[1] }
      if(filename.toLowerCase() === "vohd-aq") { output = hd[2] }
      if(filename.toLowerCase() === "vohd-sf") { output = hd[3] }
      if(filename.toLowerCase() === "vohd-lv") { output = hd[4] }

      // CREWNECKS
      if(filename.toLowerCase() === "vocn-bk") { output = cn[0] }
      if(filename.toLowerCase() === "vocn-nt") { output = cn[1] }
      if(filename.toLowerCase() === "vocn-aq") { output = cn[2] }
      if(filename.toLowerCase() === "vocn-sf") { output = cn[3] }
      if(filename.toLowerCase() === "vocn-lv") { output = cn[4] }
      
      return (filename && output ? output : emptyUrl);
    }

  // RETURN ALL IMAGES IN CATEGORY AS AN ARRAY
    export const productSet = ( category ) => {

      const ts = [voTsBk, voTsWt, voTsAq, voTsSf, voTsLv];
      const ls = [voLsBk, voLsWt, voLsAq, voLsSf, voLsLv];
      const hd = [voHdBk, voHdNt, voHdAq, voHdSf, voHdLv];
      const cn = [voCnBk, voCnNt, voCnAq, voCnSf, voCnLv];

      const all = [ts, ls, hd, cn];

      const emptyUrl = emptyData(true);
      const blankArr = [emptyUrl, emptyUrl, emptyUrl, emptyUrl, emptyUrl];

      const output =
          category === "shirts" ? ts
        : category === "longsleeves" ? ls
        : category === "hoodies" ? hd
        : category === "crewnecks" ? cn
        : all

      return category ? output : blankArr
    }

  // OUTPUT A RANDOM PRODUCT OR SET OF RANDOM PRODUCTS BY CATEGORY
    export const randomProduct = ( category, setLength ) => {

      const output = productSet(category);
      
      let arr = [];
      
      while(arr.length < setLength){
        // const item = category === "all" ? select(output) : arrayEl(output);
        arr.push(category === "all" ? select(output) : arrayEl(output));
      }

      if(setLength) {
        return arr;
      } else {
        return category === "all" ? select(output) : arrayEl(output);
      }  

    }

/////////////////////////
// OUTPUT PRODUCT DATA //
/////////////////////////

  // CURRENT DROP
    export const productDataByCategory = ( category ) => {
      const currentLineup = products.currentDrop;
      if(category.toLowerCase() === "shirts"){
        return currentLineup.shirts
      } else if(category.toLowerCase() === "longsleeves"){
        return currentLineup.longsleeves
      } else if(category.toLowerCase() === "hoodies"){
        return currentLineup.hoodies
      } else if(category.toLowerCase() === "crewnecks"){
        return currentLineup.crewnecks
      } else {
        return currentLineup
      }
    }
  
  
