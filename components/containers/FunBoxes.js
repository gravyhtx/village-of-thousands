import { useRef, useEffect, useState } from "react";
import { checkType } from "../../utils/validation";

import styles from './styles/FunBoxes.module.css';

export const GradientBox = ({ colorsArray, children, position, stripe, height, spacing,
  contain, border, gradientBorder }) => {

  let multi;

  spacing = checkType(spacing, "string") ? ' ' + spacing : spacing === false ? ' no-spacing' : '';
  border = border === true
      ? ' border'
    : border && checkType(border, 'string')
      ? ' '+border
    : border === false
      ? ' no-border'
      : '';

  if(colorsArray && checkType(colorsArray, 'arrays')) {
    multi = true;
  }

  contain = contain === true ? ' container' : '';
  stripe = stripe === true
      ? '5px'
    : stripe && checkType(stripe, 'number')
      ? `${stripe}px`
    : checkType(stripe, 'string')
      ? stripe
      : false;

  height = height === true
    ? '500px'
  : checkType(height, 'number')
    ? `${height}px`
  : checkType(height, 'string')
    ? height
  : contain !== ''
    ? '80vh'
    : '100vw';

  const setPosition = (str) => {
    if(str === 'left') {
      return "to left";
    }
    if(str === 'right') {
      return "to right, ";
    }
    if(checkType(str, 'number') && str < 1) {
      return `${str}turn,`;
    }
    if(checkType(str, 'number') && str >= 1) {
      // console.log('deg')
      return `${str}deg, `;
    }
    if(checkType(str, 'string')) {
      return str+', ';
    }

    // If all else fails return empty string...
    return '';
  }
  const colors = (colorsArray) => colorsArray && checkType(colorsArray,'array')
      ? colorsArray.join(', ')
    : colorsArray && checkType(colorsArray, 'string')
      ? colorsArray
      : '#e66465, #9198e5';

  const linerGradient = (deg, colors) => deg ? `linear-gradient(${deg}${colors})` : `linear-gradient(${colors})`;

  let linGrad = () => {
    let arr = [];
    if(multi === true) {
      for(let i=0; i < colorsArray.length; i++) {
        if(position[i] && checkType(position, 'array')) {
          arr.push(linerGradient(setPosition(position[i]),colors(colorsArray[i])))
        } else if(!position[i] && checkType(position[i], 'array')) {
          arr.push(linerGradient(setPosition(position[position.length - 1]),colors(colorsArray[i])))
        } else {
          arr.push(linerGradient(setPosition(position),colors(colorsArray[i])))
        }
      }
    }

    return arr.length ? arr.join(', ') : linerGradient(setPosition(position),colors(colorsArray));
  }

  const style = {
    backgroundImage: linGrad(),
    height: stripe ? stripe : height,
  }

  const gBoxRef = useRef(null);
  const gBorderRef = useRef(null);
  const gChildrenRef = useRef(null);
  const [gradientLoaded, setGradientLoaded] = useState(false);
  const [gBoxes, setGBoxes] = useState({
    box: <></>,
    border: <></>
  });

  const gradientBox =
    <div ref={gBoxRef} onClick={(e) => console.log(e)} className={"gradient-box"+border+contain} style={style}>
      { children ? <div className="gradient-box_children" ref={gChildrenRef}>
      { children }</div> : <></> }
    </div>

  // const gBoxHeight = gBoxRef ? gBoxRef.current.offsetHeight : '';
  // const gBoxWidth = gBoxRef ? gBoxRef.current.offsetWidth : '';

  const gBorderSize = gradientBorder && !checkType(gradientBorder, 'string') && gradientBorder.size
    ? gradientBorder.size : '2px';
  const gBorderStyles = {
    border: gBorderSize+' solid',
    borderImage: linGrad(),
    height: gBoxRef.current !== null ? gBoxRef.current.offsetHeight : '',
    width: gBoxRef.current !== null ? gBoxRef.current.offsetWidth :  ''
  }
  // const gBorderStyles = null
    
  const gradientBorderBox = gradientBorder && gradientBorder !== true && checkType(gradientBorder, 'object')
      // ? <div ref={gBorderRef} className="gradient-box_border styled" style={gBorderStyles} />
    ? <div ref={gBorderRef} className="gradient-box_border styled" />
    : gradientBorder && gradientBorder === true
      ? <div ref={gBorderRef} className="gradient-box_border" />
      : <></>;

  useEffect(() => {
    if(gradientBox && gBoxRef.current) {
      // console.log(gBoxRef) 
      setGradientLoaded(true);
    }
    // console.log()
  }, [gradientLoaded]);

  return (
    <div className={"gradient-box_wrapper"+spacing}>
      { gradientBorderBox }
      { gradientBox }
    </div>
  )
}