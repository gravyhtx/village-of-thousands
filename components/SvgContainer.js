import Link from "next/link";
import Image from "next/image";

const SvgContainer = ( { margins, src, link, color, width, description, container, classes, id, styles, drag, maxWidth } ) => {
  let svgContainer="";
  if(container){svgContainer=" "+container;}
  let svgClass="";
  if(classes){svgClass=" "+classes;}
  let svgId="";
  if(id){svgId=" "+id;}

  if(color === "white") {
    color = "invert(100%)"
  }

  margins=margins?margins:"0 auto"
  let svgStyles = {
    margin:margins,
    // width:width,
    maxWidth:maxWidth,
    styles
  }
  return (
    <Link href={link?link:'/'} target="_blank" rel="noreferrer">
    <a target="_blank" rel="noreferrer">
    <div className={"svg-container"+svgContainer}>
      <img
        style={svgStyles ? svgStyles : {}}
        src={src ? src.src : ""}
        width={width}
        className={"svg-img"+svgClass}
        id={svgId ? "svg-img_"+svgId : ""}
        draggable={drag ? drag : false}
        alt={description} />
    </div>
    </a>
    </Link>
  )
}

export default SvgContainer