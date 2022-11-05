import Link from "next/link";
import website from '../../config/site-data.json';
import { checkType, imageSizeObj } from "../../utils/validation";

// SVG TO IMG COMPONENT
// Use <img> tag to show a dynamic SVG element
export const SvgImg =
  ({ margins, svg, link, containerClasses, id, styles, linkClasses, description, color, drag, maxWidth }) => {

  containerClasses = containerClasses ? containerClasses=' '+container : '';
  let svgId = id ? id : '';

  if(color === "white") {
    color = "invert(100%)"
  }

  let svgStyles = {
    margin:margins?margins:"0 auto",
    maxWidth:maxWidth?maxWidth:'',
    color:color?color:'',
    styles,
  }

  const data = svg.src ? svg : { src: svg };
  const dataSrc = data.src;

  link = link ? link : false;

  const container =
    <div className={"svg-container"+containerClasses}>
      <img
        style={svgStyles ? svgStyles : null}
        src={dataSrc}
        className={"svg-img"+svgClass}
        id={svgId}
        draggable={drag ? drag : false}
        alt={description} />
    </div>


  return (<>
    {link ?
    <Link href={ link === true ? '/' : link } target="_blank">
      <a className={linkClasses?linkClasses:''} target="_blank">
      { container }
      </a>
    </Link> : container }
  </>)
}


// SVG ICON
// Container for SVG icons
export const SvgIcon = ({ svg, classes, link, onClick, linkClasses, target }) => {
  // Check imported as Next image -- Next uses 'image.src' to get the location
  const data = svg.src ? svg : { src: svg };
  const dataSrc = data.src;

  //
  link = link === true ? '/' : link ? link : '';
  linkClasses = linkClasses ? linkClasses : '';

  // Default 'target' to new tab ("_blank")
  target =
    (target === 'self' || target === false) ? '_self' :
    target === 'parent' ? '_parent' :
    '_blank';

  return (<span>
    { link && !onClick
      ? <Link href={link} target={target}>
          <a className={linkClasses} target="_blank">
            <img className={"svg icon-class"+classes} src={dataSrc} />
          </a></Link>
    : !link && onClick
      ? <a className={linkClasses} href="javascript:void(0);" onClick={onClick}>
          <img className={"svg icon-class"+classes} src={dataSrc} />
        </a>
      : <img className={"svg icon-class"+classes} src={dataSrc} /> }
    </span>
  )
}

// SVG ICON
// Container for SVG icons
export const MaterializeIcon = ({ name, classes, link, target, alt, onClick }) => {
  // Must have at least the name for this to work!
  name = name ? name : '';
  // Default 'target' to new tab ("_blank")
  target =
    target === 'self' || target === false ? '_self' :
    target === 'parent' ? '_parent' :
    '_blank';

  const mIcon = <i className={"material-icons icon-class"+classes} alt={alt}>{name}</i>

  return (<>
    { link && !onClick
      ? <Link href={link} target={target}>
          <a className={linkClasses} target={target}>
            { mIcon }
          </a></Link>
      : onClick
      ? <a className={linkClasses} href="javascript:void(0);" onClick={onClick}>
          { mIcon }
        </a>
      : mIcon }
    </>
  )
}

// SVG ACTION ICON
// Container for SVG icons
export const SvgActionIcon = ({ src, classes, linkClasses, onClick }) =>{
  let dataSrc = src.src || src;
  return (
    <a className={linkClasses} href="javascript:void(0);" onClick={onClick}>
      <img className={"svg action-icon"+classes} src={dataSrc} />
    </a>
  )
}


// SVG OBJECT CONTAINER
// Container for SVGs
export const SvgObject = ({ svg, classes, color, styles, alt, sizeObj, margins, maxWidth, useFallback }) => {
  // https://vecta.io/blog/best-way-to-embed-svg#2-using-an--object--tag
  const data = svg.src ? svg : { src: svg };
  const dataSrc = data.src;
  
  alt = alt ? alt : `${website.name} Site Image`;
  
  classes = classes && classes !== {} ? ' '+classes : '';

  const size = sizeObj === true ? { width: data.width, height: data.height }
    : sizeObj !== undefined && sizeObj !== true && sizeObj !== false ? imageSizeObj(sizeObj) : false;

  // SVG  COLORS IN AVAILABLE ASS CSS CLASSES
  //  Search for available classes by '.svg-color_'
  color=checkType(color, 'string')?"svg-color-"+color:null;
  // ADDITIONAL STYLES MAY BE USED
  // COLOR MAY ALSO BE CHANGED USING THE 'filter' PROPERTY
  styles=checkType(styles, 'object')?styles:{};

  margins=margins?margins:"0 auto";

  // IMAGE STYLES
  const imageStyles = {
    margin:margins,
    maxWidth:maxWidth?maxWidth:null,
    styles
  }
  
  // FALLBACK IMAGE
  const fallback = useFallback === true ? <img alt={alt} className={"svg-fallback"+classes} src={dataSrc} /> : <></>;
  
  return(<>
    {size !== false ?
      <object style={imageStyles ? imageStyles : {}} className={"svg-container"+classes} width={size.width} height={size.height} type="image/svg+xml" data={dataSrc}>
        { fallback }
      </object>
    : <object className={"svg-container"+classes} type="image/svg+xml" data={dataSrc}>
        { fallback }
      </object>
    }
  </>)
}

// SVG CONTAINER
// Standard Container for SVGs
export const SvgContainer = ({ margins, src, link, color, width, description, container, classes, id, styles, drag, maxWidth }) => {
  let svgContainer="";
  if(container){svgContainer=" "+container;}
  let svgClass="";
  if(classes){svgClass=" "+classes;}
  let svgId="";
  if(id){svgId=" "+id;}

  // SVG  COLORS IN AVAILABLE ASS CSS CLASSES
  //  Search for available classes by '.svg-color_'
  color=checkType(color, 'string')?" svg-color-"+color:'';
  // ADDITIONAL STYLES MAY BE USED
  // COLOR MAY ALSO BE CHANGED USING THE 'filter' PROPERTY
  styles=checkType(styles, 'object')?styles:{};

  margins=margins?margins:"0 auto"

  // IMAGE STYLES
  const svgStyles = {
    margin:margins,
    width:width?width:null,
    maxWidth:maxWidth?maxWidth:null,
    ...styles
  }

  let path;

  if(src && src.src){ path = src.src }
  else { path = src }

  return (
    <Link href={link?link:'/'} target="_blank" rel="noreferrer">
    <a target="_blank" rel="noreferrer">
    <div className={"svg-container"+svgContainer}>
      <img
        style={svgStyles ? svgStyles : {}}
        src={src ? path : ""}
        className={"svg-img"+svgClass+color}
        id={svgId ? "svg-img_"+svgId : ""}
        draggable={drag ? drag : false}
        alt={description} />
    </div>
    </a>
    </Link>
  )
}