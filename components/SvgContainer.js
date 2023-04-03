import Link from "next/link";

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
  console.log(src)

  margins=margins?margins:"0 auto"
  let svgStyles = {
    margin:margins,
    // width:width,
    maxWidth:maxWidth,
    styles
  }

  let path;

  if(src.src){ path = src.src }
  else { path = src }
  console.log(path)
  console.log(src)

  return (
    <Link href={link?link:'/'} target="_blank" rel="noreferrer">
    <div className={"svg-container"+svgContainer}>
      <img
        style={svgStyles ? svgStyles : {}}
        src={src ? path : ""}
        className={"svg-img"+svgClass}
        id={svgId ? "svg-img_"+svgId : ""}
        draggable={drag ? drag : false}
        alt={description} />
    </div>
    </Link>
  )
}

export default SvgContainer