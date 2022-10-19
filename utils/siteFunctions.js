import { useEffect, useState } from "react"
import { getSingleUser } from '../utils/API';
import Auth from '../utils/auth';

const date =  new Date();

// GET CURRENT YEAR
// Input a number 1 to 4 (or -4 to -1) to specify the number of digits to output
export const getYears = (int) => {
  const year =  date.getFullYear().toString();
  const getLast = int && int !== true && int <= 4 && int >= 1
      ? -1*int
    : int && int !== true && int <= -1 && int >= -4
      ? int
    : int === true ? -2 : false;
  return getLast ? year.slice(getLast) : year;
}

// GET CURRENT MONTH
export const getMonths = (addZeros, toString) => {
  toString = toString === true ? true : false;
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = addZeros && (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 
  return toString === false ? month : months[date.getMonth()];
}

// GET CURRENT DATE
export const getDays = (addZeros) => {
  const today = date.getDate();
  return addZeros && today < 10 ? '0' + today.toString() : today.toString();
}

// GET HOURS/MINUTES IN CALCULATION OR MILITARY TIME
// Ex. 14hr 30min = 14.5 or 1430
export const getTimeCalc = (hour, minutes, military) => {
  const total = 60;
  const min = !Number.isNaN(minutes) && minutes <= 60 ? Number(minutes) : 0;
  const hr = !Number.isNaN(hour) && ((hour < 24 && min) || (hour === 24 && min === 0)) ? Number(hour) : 0;

  const timeCalc = hr + (min / total);

  const milMin = min > 10 ? min.toString() : min < 10 && min !== 0 ? '0' + minutes.toString() : '00';
  const milHr = hr < 10 ? '0'+hr.toString() : hr.toString();
  const milTime = milHr + milMin;

  return military === true ? milTime : timeCalc.toFixed(2);
}

// FORMAT DATE BASED ON 'FORMAT' INPUT
export const formatDate = (inputDate, format) => {
  inputDate = inputDate ? inputDate : false
  format = format ? format.toLowerCase() : false;

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const toDate = new Date(inputDate);
  const toYear = inputDate ? toDate.getFullYear() : today.getFullYear();
  const toMonth = inputDate ? toDate.getMonth()+1 : today.getMonth()+1;
  const toDay = inputDate ? toDate.getDate() : today.getDate();

  switch (format) {
    case format === false:
      return inputDate === false
      ? getMonths(true)+getDays(true)+getYears(2)
      : (toMonth < 10 ? '0'+toMonth : toMonth)+(toDay < 10 ? '0'+toDay : toDay)+(toYear.slice(-2));
    case format === 'str':
    case format === 'string':
      return inputDate === false
        ? today.toDateString()
        : toDate.toDateString()
        // "Sun Jun 13 2020"
    case format === 'iso':
      return inputDate === false
        ? today.toISOString()
        : toDate.toISOString()
        // "2020-06-13T18:30:00.000Z"
    case format === 'utc' && inputDate === false:
      return inputDate === false
        ? today.toUTCString()
        : toDate.toUTCString()
        // "Sat, 13 Jun 2020 18:30:00 GMT"
    case format === 'local':
    case format === 'locale':
      return inputDate === false
        ? today.toLocaleDateString()
        : toDate.toLocaleDateString()
        // "6/13/2020"
    case format === 'obj':
    case format === 'object':
      return { month: toMonth, day: toDay, year: toYear }
      // {month: 6, day: 13, year: 2020}
    default:
      return inputDate === false
        ? today.toLocaleDateString()
        : toDate.toLocaleDateString()
  }
}

export const taxAmount = (grossTotal, orderTotal) => {
  const stripePercent = ((grossTotal * 0.029) + 0.3).toFixed(2);
  const shippingPercent = orderTotal * 12;

  return ((grossTotal- stripePercent - shippingPercent) * 0.0825).toFixed(2);
}

export const netAmount = (grossTotal, orderTotal) => {
  const stripePercent = ((grossTotal * 0.029) + 0.3).toFixed(2);
  const shippingPercent = orderTotal * 12;
  const taxPercent = taxAmount(grossTotal, orderTotal);

  return (( grossTotal - stripePercent - shippingPercent - taxPercent)).toFixed(2);
}

////////////////////////
// CLIENT SIDE CHECKS //
////////////////////////

export const authCheck = () => {
  const token = Auth.loggedIn();
  const authorized = token ? true : false;
  return authorized;
};

export const isMobile = () => {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || window.matchMedia("only screen and (max-width: 760px)").matches ) {
    return true;
  } else {
    return false;
  }
}

export const isLoaded = () => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if(!load){setLoad(true)}
  }, [load])
  return load;
}

export const isUser = async () => {
  try {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const response = await getSingleUser(token);
    if(!response.ok) {
      return false;
    }
    const user = await response.json();
    if(user.pending) {
      return "pending";
    }
    if(!user.pending) {
      return "active"
    }

  } catch (err) {
    console.error(err);
    return "error";
  }
}

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export function windowSize(window) {

  let windowSize = {
    width: window ? window.innerWidth : undefined,
    height: window ? window.innerHeight : undefined
  }

  return windowSize;
}

export const useScreenWidth = () => {
  return useWindowSize().width;
}

export const useScreenHeight = () => {
  return useWindowSize().height;
}

export const screenWidth = (window) => {
  return windowSize(window).width;
}

export const screenHeight = (window) => {
  return windowSize(window).height;
}

//////////////////////
// CONVERT ELEMENTS //
//////////////////////

export const canvasToDataUrl = ( canvasEl ) => {
  const dataUrl = canvasEl.toDataURL();
  return dataUrl;
}

export const canvasToPng = ( el, alt, classes, id ) => {
  const dataUrl = el.toDataURL();
  const png = document.write(`<img src="${dataUrl}" className=${classes} alt=${alt} id=${id} />`);
  return png;
}



/////////////////////
// RETURN ELEMENTS //
/////////////////////


export const emptyData = ( dataArray, dataImage ) => {
  // Returns an empty 1x1 px Data PNG
  const url = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  
  const img = {
    classes: dataImage ? dataImage.classes : '',
    styles: dataImage ? dataImage.styles : ''
  }
  return (  dataImage && !dataArray ? <img className={img.classes} style={img.styles} src={url} />
          : dataArray && !dataImage ? { src: url, blurDataUrl: url, height: 2000, width: 2000 } : url )
}


export const cdnLink = ( fileName, fileId, fileExt, imgWidth ) => {
  
  fileExt = fileExt ? fileExt : ".png";

  const location = "/_next/static/media/";
  const emptyUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  const file = fileName && fileId ? fileName+"."+fileId+fileExt : emptyUrl;

  return location+file + (imgWidth ? "?imwidth="+imgWidth : "?imgwidth=3840");
}

export const imageExists = (url) => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    return true;
  } else {
    img.onload = () => {
      return true;
    };
    img.onerror = () => {
      return false;
    };
  }
  return false;
}

export const ImageCDN = ({ fileName, fileId, fileExt, description, aria, containerClasses, imgClasses, containerId, allowDrag, contain, sizes, defaultWidth, customStyles, responsive, useFallbackStyles, useContainerStyles }) => {

  const imgLink = cdnLink(fileName, fileId, fileExt);

  const fallbackStyles = {
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: responsive ? 'flex': 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  }
  
  const widths = ["640","750","828","1080","1200","1920","2048","3840"];
  
  defaultWidth = defaultWidth ? defaultWidth : widths[7];
  useContainerStyles = useContainerStyles ? useContainerStyles : true;
  customStyles = customStyles ? customStyles : {};
  responsive = responsive ? responsive : true;  
  
  const img = {
    src: imgLink,
    alt: description ? description : 'Village of Thousands - Site Image',
    imgClasses: imgClasses ? 'image-class '+imgClasses : 'image-class',
    imgStyles: useFallbackStyles ? fallbackStyles + customStyles : customStyles,
    containerClasses: containerClasses ? 'image-container '+containerClasses : 'image-container',
    containerStyles: {
      display: responsive ? 'block' : 'inline-block'
    },
    contain: contain ? ' contain' : '',
    imgId: fileName && fileId ? fileName+'-'+fileId : '',
    containerId: containerId ? containerId : 'container-'+fileId,
    draggable: allowDrag ? allowDrag.toString() : 'false',
    sizes: sizes ? sizes : '100vw',
  }
  
  const link = (n) => { return imgLink };
  const srcSet = `${link(0)}, ${link(1)}, ${link(2)}, ${link(3)}, ${link(4)}, ${link(5)}, ${link(6)}, ${link(7)}`;

  return (<>
    {img.src ?
      <div role="img" aria-label={aria} className={ img.containerClasses+img.contain } style={ img.containerStyles } id={ img.containerId }>
        <img
          alt={ img.alt }
          className={ img.imgClasses }
          id={ img.imgId }
          draggable={ img.draggable }
          sizes={ img.sizes }
          srcSet={ srcSet }
          src={ img.src }
          style={ img.imgStyles }
          decoding="async" />
      </div>:<></>}
    </>)
}