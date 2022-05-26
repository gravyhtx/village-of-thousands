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

export const screenWidth = () => {
  return useWindowSize().width;
}

export const screenHeight = () => {
  return useWindowSize().height;
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


// SIMPLIFY ELEMENTS

export const cdnLink = ( filename ) => {
  
  // USE WITH FULL FILENAME WITH EXTENSION
  //  ex: "header.fb0ffabf.png"
  
  const path = "/_next/static/media/"

  return path+filename
}

export const ImageCDN = ({ filename, fileExt, description, classes, id, allowDrag, sizes, defaultWidth,customStyles, containerClasses, responsive, useFallbackStyles, useContainerStyles }) => {
  
  // filename example -- "header.fb0ffabf"
  // filename = filename.toString();
  const fSplit = filename.split(".");
  const fileTitle = fSplit[0];
  const fileId = fSplit[1];
  
  // fileExt example -- ".jpg"
  fileExt = fileExt ? fileExt : ".png";
  
  customStyles = customStyles ? customStyles : {};
  responsive = responsive ? responsive : true;

  const displayStyle = responsive ? 'flex': 'block';
  
  const fallbackStyles = {
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: displayStyle,
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  }
  
  const imgStyles = useFallbackStyles ? fallbackStyles + customStyles : customStyles;
  
  useContainerStyles = useContainerStyles ? useContainerStyles : true;
  const containerStyles = {
    display: responsive ? 'block' : 'inline-block',
    position: 'relative'
  }
  
  const widths = ["640","750","828","1080","1200","1920","2048","3840"];
  defaultWidth = defaultWidth ? defaultWidth : widths[7];  
  const path = "/_next/static/media/";
  
  const link = (n) => { return path+filename+fileExt+"?imwidth="+widths[n]+" "+widths[n]+"w" };
  const srcSet = `${link(0)}, ${link(1)}, ${link(2)}, ${link(3)}, ${link(4)}, ${link(5)}, ${link(6)}, ${link(7)}`

  console.log(`${path}${filename}${fileExt}?imwidth=${defaultWidth}`)
  console.log(filename)

  const image =
          <div className={ containerClasses } style={ useContainerStyles ? containerStyles : '' }>
            <img
              alt={ description ? description : "Village of Thousands - Site Image" }
              className={classes ? classes : "image-class"}
              id={ id ? id : fileTitle+fileId }
              draggable={ allowDrag ? allowDrag.toString() : "false" }
              sizes={ sizes ? sizes : "100vw"}
              srcSet={ srcSet }
              src={ path+filename+fileExt+"?imwidth="+defaultWidth }
              decoding="async"
              style={ imgStyles }/>
          </div>
  
  return image;
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