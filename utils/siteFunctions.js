import { useEffect, useState } from "react"
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
// import { width } from '@mui/system';

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

  return location+file
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
    src: imgLink+'?imwidth='+defaultWidth,
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
  
  const link = (n) => { return imgLink+"?imwidth="+widths[n]+" "+widths[n]+"w" };
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




//////////////
// OBSOLETE //
//////////////

import LoginContainer from '../components/LoginContainer';
import Blockie from "../components/Blockie";

export const withAuth = Component => {
  const Render = (props) => {
    // If user is not logged in, return login component
    if (!Auth.loggedIn()) {
      return (
        <LoginContainer state="login" />
      );
    }
    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  return Render;
};