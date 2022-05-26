// SHIRTS
import voTsBk from '../public/images/szn/001/products/shirt/vots-bk.png' // BLACK
import voTsWt from '../public/images/szn/001/products/shirt/vots-wt.png' // WHITE
import voTsAq from '../public/images/szn/001/products/shirt/vots-aq.png' // AQUA
import voTsSf from '../public/images/szn/001/products/shirt/vots-sf.png' // SEAFOAM
import voTsLv from '../public/images/szn/001/products/shirt/vots-lv.png' // LAVENDAR

// LONGSLEEVES
import voLsBk from '../public/images/szn/001/products/longsleeve/vols-bk.png' // BLACK
import voLsWt from '../public/images/szn/001/products/longsleeve/vols-wt.png' // WHITE
import voLsAq from '../public/images/szn/001/products/longsleeve/vols-aq.png' // AQUA
import voLsSf from '../public/images/szn/001/products/longsleeve/vols-sf.png' // SEAFOAM
import voLsLv from '../public/images/szn/001/products/longsleeve/vols-lv.png' // LAVENDAR

// HOODIES
import voHdBk from '../public/images/szn/001/products/hoodie/vohd-bk.png' // BLACK
import voHdNt from '../public/images/szn/001/products/hoodie/vohd-nt.png' // NATURAL
import voHdAq from '../public/images/szn/001/products/hoodie/vohd-aq.png' // AQUA
import voHdSf from '../public/images/szn/001/products/hoodie/vohd-sf.png' // SEAFOAM
import voHdLv from '../public/images/szn/001/products/hoodie/vohd-lv.png' // LAVENDAR

// CREWNECKS
import voCnBk from '../public/images/szn/001/products/crewneck/vocn-bk.png' // BLACK
import voCnNt from '../public/images/szn/001/products/crewneck/vocn-nt.png' // Natural
import voCnAq from '../public/images/szn/001/products/crewneck/vocn-aq.png' // AQUA
import voCnSf from '../public/images/szn/001/products/crewneck/vocn-sf.png' // SEAFOAM
import voCnLv from '../public/images/szn/001/products/crewneck/vocn-lv.png' // LAVENDAR

import { emptyData } from '../utils/siteFunctions'

export const productImage = ( filename ) => {

  const ts = [voTsBk, voTsWt, voTsAq, voTsSf, voTsLv];
  const ls = [voLsBk, voLsWt, voLsAq, voLsSf, voLsLv];
  const hd = [voHdBk, voHdNt, voHdAq, voHdSf, voHdLv];
  const cn = [voCnBk, voCnNt, voCnAq, voCnSf, voCnLv];

  const emptyUrl =  emptyData(true)
  
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
  
  return filename && output ? output : emptyUrl;
}

export const productSet = ( category ) => {

  const ts = [voTsBk, voTsWt, voTsAq, voTsSf, voTsLv];
  const ls = [voLsBk, voLsWt, voLsAq, voLsSf, voLsLv];
  const hd = [voHdBk, voHdNt, voHdAq, voHdSf, voHdLv];
  const cn = [voCnBk, voCnNt, voCnAq, voCnSf, voCnLv];

  const blankArr = [emptyUrl, emptyUrl, emptyUrl, emptyUrl, emptyUrl]

  const output =
      category === "shirts" ? ts
    : category === "longsleeves" ? ls
    : category === "hoodies" ? hd
    : category === "crewnecks" ? cn
    : blankArr

  return output
}