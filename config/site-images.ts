import Image from 'next/image';
//* CREWNECKS *//
  import vocnbk from '../public/images/szn/001/products/crewnecks/vocn-bk.webp';
  import vocnbkfb from '../public/images/szn/001/products/crewnecks/vocn-bk.png';
  import vocnnt from '../public/images/szn/001/products/crewnecks/vocn-nt.webp';
  import vocnntfb from '../public/images/szn/001/products/crewnecks/vocn-nt.png';
  import vocnaq from '../public/images/szn/001/products/crewnecks/vocn-aq.webp';
  import vocnaqfb from '../public/images/szn/001/products/crewnecks/vocn-aq.png';
  import vocnsf from '../public/images/szn/001/products/crewnecks/vocn-sf.webp';
  import vocnsffb from '../public/images/szn/001/products/crewnecks/vocn-sf.png';
  import vocnlv from '../public/images/szn/001/products/crewnecks/vocn-lv.webp';
  import vocnlvfb from '../public/images/szn/001/products/crewnecks/vocn-lv.png';

//* HOODIES *//
  import vohdbk from '../public/images/szn/001/products/hoodies/vohd-bk.webp';
  import vohdbkfb from '../public/images/szn/001/products/hoodies/vohd-bk.png';
  import vohdnt from '../public/images/szn/001/products/hoodies/vohd-wt.webp';
  import vohdntfb from '../public/images/szn/001/products/hoodies/vohd-wt.png';
  import vohdaq from '../public/images/szn/001/products/hoodies/vohd-aq.webp';
  import vohdaqfb from '../public/images/szn/001/products/hoodies/vohd-aq.png';
  import vohdsf from '../public/images/szn/001/products/hoodies/vohd-sf.webp';
  import vohdsffb from '../public/images/szn/001/products/hoodies/vohd-sf.png';
  import vohdlv from '../public/images/szn/001/products/hoodies/vohd-lv.webp';
  import vohdlvfb from '../public/images/szn/001/products/hoodies/vots-lv.png';

//* LONGSLEEVES *//
  import volsbk from '../public/images/szn/001/products/longsleeves/vols-bk.webp';
  import volsbkfb from '../public/images/szn/001/products/longsleeves/vols-bk.png';
  import volswt from '../public/images/szn/001/products/longsleeves/vols-wt.webp';
  import volswtfb from '../public/images/szn/001/products/longsleeves/vols-wt.png';
  import volsaq from '../public/images/szn/001/products/longsleeves/vols-aq.webp';
  import volsaqfb from '../public/images/szn/001/products/longsleeves/vols-aq.png';
  import volssf from '../public/images/szn/001/products/longsleeves/vols-sf.webp';
  import volssffb from '../public/images/szn/001/products/longsleeves/vols-sf.png';
  import volslv from '../public/images/szn/001/products/longsleeves/vols-lv.webp';
  import volslvfb from '../public/images/szn/001/products/longsleeves/vols-lv.png';

//* SHIRTS *//
  import votsbk from '../public/images/szn/001/products/shirts/vots-bk.webp';
  import votsbkfb from '../public/images/szn/001/products/shirts/vots-bk.png';
  import votswt from '../public/images/szn/001/products/shirts/vots-wt.webp';
  import votswtfb from '../public/images/szn/001/products/shirts/vots-wt.png';
  import votsaq from '../public/images/szn/001/products/shirts/vots-aq.webp';
  import votsaqfb from '../public/images/szn/001/products/shirts/vots-aq.png';
  import votssf from '../public/images/szn/001/products/shirts/vots-sf.webp';
  import votssffb from '../public/images/szn/001/products/shirts/vots-sf.png';
  import votslv from '../public/images/szn/001/products/shirts/vots-lv.webp';
  import votslvfb from '../public/images/szn/001/products/shirts/vots-lv.png';

//* ART *//
  import bro from '../public/images/art/bro.webp';
  import brofb from '../public/images/art/bro.png';
  import cartas from '../public/images/art/cartas.webp';
  import cartasfb from '../public/images/art/cartas.png';
  import chooseyourvot from '../public/images/art/choose_your_vot.webp';
  import chooseyourvotfb from '../public/images/art/choose_your_vot.png';
  import coperror from '../public/images/art/cop_error.webp';
  import coperrorfb from '../public/images/art/cop_error.png';
  import fallerror from '../public/images/art/fall_error.webp';
  import fallerrorfb from '../public/images/art/fall_error.png';
  import hope from '../public/images/art/hope.webp';
  import hopefb from '../public/images/art/hope.png';
  import riko from '../public/images/art/riko.webp';
  import rikofb from '../public/images/art/riko.png';
  import specialorder from '../public/images/art/special_order.webp';
  import specialorderfb from '../public/images/art/special_order.png';

//* BRAND *//
  import logo from '../public/images/header.webp';
  import logofb from '../public/images/header.png';
  import logosvgwt from '../public/images/header.svg';
  import logosvgbk from '../public/images/header_bk.svg';
  import hero from '../public/images/icons/vot_banner.webp';
  import herofb from '../public/images/vot_banner.png';

//* CONFIG *//
  import website from './site-data.json';

interface SIProps {
  type?: "crewnecks" | "hoodies" | "longsleeves" | "shirts" | "art" | "brand" | number | undefined,
  id?: string | number | undefined,
  drop?: number | undefined
}

const siteImage = ({ type=0, id=0, drop=website.drop }: SIProps): any[] => {
  const crewnecks = (id: string | number) => {
    // if(drop === 1) { // Future use case
    switch(id) {
      case "bk":
      case 0:
      default:
        return [ vocnbk, vocnbkfb ];
      case "nt":
      case 1:
        return [ vocnnt, vocnntfb ];
      case "aq":
      case 2:
        return [ vocnaq, vocnaqfb ];
      case "sf":
      case 3:
        return [ vocnsf, vocnsffb ];
      case "sf":
      case 4:
        return [ vocnlv, vocnlvfb ]; }}
  const hoodies = (id: string | number) => {
    switch(id) {
      case "bk":
      case 0:
      default:
        return [ vohdbk, vohdbkfb ];
      case "nt":
      case 1:
        return [ vohdnt, vohdntfb ];
      case "aq":
      case 2:
        return [ vohdaq, vohdaqfb ];
      case "sf":
      case 3:
        return [ vohdsf, vohdsffb ];
      case "sf":
      case 4:
        return [ vohdlv, vohdlvfb ]; }}
  const longsleeves = (id: string | number) => {
    switch(id) {
      case "bk":
      case 0:
      default:
        return [ volsbk, volsbkfb ];
      case "wt":
      case 1:
        return [ volswt, volswtfb ];
      case "aq":
      case 2:
        return [ volsaq, volsaqfb ];
      case "sf":
      case 3:
        return [ volssf, volssffb ];
      case "sf":
      case 4:
        return [ volslv, volslvfb ]; }}
  const shirts = (id: string | number) => {
    switch(id) {
      case "bk":
      case 0:
      default:
        return [ votsbk, votsbkfb ];
      case "wt":
      case 1:
        return [ votswt, votswtfb ];
      case "aq":
      case 2:
        return [ votsaq, votsaqfb ];
      case "sf":
      case 3:
        return [ votssf, votssffb ];
      case "sf":
      case 4:
        return [ votslv, votslvfb ]; }}
  const art = (id: string | number) => {
    switch(id) {
      case "bro":
      case 0:
      default:
        return [ bro, brofb ];
      case "cartas":
      case 1:
        return [ cartas, cartasfb ];
      case "chooseyourvot":
      case 2:
        return [ chooseyourvot, chooseyourvotfb ];
      case "coperror":
      case 3:
        return [ coperror, coperrorfb ];
      case "fallerror":
      case 4:
        return [ fallerror, fallerrorfb ];
      case "hope":
      case 4:
        return [ hope, hopefb ];
      case "riko":
      case 4:
        return [ riko, rikofb ];
      case "specialorder":
      case 4:
        return [ specialorder, specialorderfb ]; }}
  const brand = (id: string | number) => {
    switch(id) {
      case "logo":
      case 0:
      default:
        return [ logo, logofb ];
      case "logosvg":
      case 1:
        return [ logosvgwt, logosvgbk ];
      case "hero":
      case 2:
        return [ hero, herofb ]; }}
  
  switch(type) {
    case "crewnecks":
    case 0:
      return crewnecks(id);
    case "hoodies":
    case 1:
      return hoodies(id);
    case "shirts":
    case 2:
      return shirts(id);
    case "longsleeves":
    case 3:
      return longsleeves(id);
    case "art":
    default:
      return art(id); }
}

export default siteImage;