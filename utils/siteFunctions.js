import Auth from '../utils/auth';
import LoginContainer from '../components/LoginContainer';


// CLIENT SIDE CHECKS

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

export const isMobile = () => {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.matchMedia("only screen and (max-width: 760px)").matches ) {
    return true;
  } else {
    return false;
  }
}

// CONVERT ELEMENTS

export const canvasToDataUrl = ( canvasEl ) => {
  const dataUrl = canvasEl.toDataURL();
  return dataUrl;
}

export const canvasToPng = ( canvasEl, alt, classes, id ) => {
  const dataUrl = canvasEl.toDataURL();
  const png = document.write(`<img src="${dataUrl}" className=${classes} alt=${alt} id=${id} />`);
  return png;
}


// SIMPLIFY ELEMENTS

export const cdnLink = ( filename ) => {

  // USE WITH FULL FILENAME
  //  ex: "header.fb0ffabf"

  const path = "https://villageofthousands.com/_next/static/media/";
  return path+filename
}

export const ImageCDN = ( filename, fileExt, description, classes, id, allowDrag, sizes, defaultWidth, customStyles, useFallbackStyles ) => {

  // filename example -- "header.fb0ffabf"
  const fSplit = filename.split(".");
  const fileTitle = fSplit[0];
  const fileId = fSplit[1];

  // fileExt example -- ".jpg"
  fileExt = fileExt ? fileExt : ".png";

  customStyles = customStyles ? customStyles : '';

  const fallbackStyles = {
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
  }

  const styles = useFallbackStyles ? fallbackStyles + customStyles : customStyles;

  const widths = ["640","750","828","1080","1200","1920","2048","3840"];
  defaultWidth = defaultWidth ? defaultWidth : "3840";

  const path = "https://villageofthousands.com/_next/static/media/";

  const link = (n) => { return path+filename+fileExt+"?imwidth="+widths[n]+" "+widths[n]+"w" };
  const srcSet = `${link(0)}, ${link(1)}, ${link(2)}, ${link(3)}, ${link(4)}, ${link(5)}, ${link(6)}, ${link(7)}`

  const image =
    <img
      alt={ description ? description : "Village of Thousands - Site Image" }
      className={classes ? classes : "image-class"}
      id={ id ? id : fileTitle+fileId }
      draggable={ allowDrag ? allowDrag.toString() : "false" }
      sizes={ sizes ? sizes : "100vw"}
      srcSet={ srcSet }
      src={ path+filename+fileExt+"?imwidth="+defaultWidth }
      decoding="async" data-nimg="responsive"
      style={ styles }/>

  return image;
}