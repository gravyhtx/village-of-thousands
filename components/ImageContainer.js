import Image from "next/image";
import { useEffect, useState } from "react";

const ImageContainer = ({ width, height, square, containerClasses, imgClasses, layout, description, src, id, containerId, svg, priority, blur, drag, contain }) => {

  const [imageData, setImageData] = useState({
    width: {
      width: width,
      maxWidth: width
    },
    height: height,
    containerClasses:containerClasses,
    imgClasses:imgClasses,
    layout:layout,
    description:description,
    src:src,
    id:id,
    svg:svg,
    priority:priority,
    blur:blur,
    drag:drag,
    contain:contain
  });

  const dataLength = Object.keys(imageData).length;

  useEffect(() => {
    setImageData({
      containerClasses: containerClasses ? ' '+containerClasses : '',
      imgClasses: imgClasses ? ' '+imgClasses : '',
      width: width ? { width:width, maxWidth:width } : {},
      height: height ? height : '',
      layout: layout ? layout : 'responsive',
      description: description ? description : "VoT Site Image",
      id: id ? id : '',
      priority: priority ? priority : '',
      svg: svg ? svg : false,
      blur: blur ? "blur" : "",
      drag: drag ? drag : false,
      contain: contain ? " contain" : ""
    })
  }, [dataLength]);

  const containerStyles = width ? { width: width, height: height ? height : width } : {}

  // if( (imgHeight && square) && !imgWidth ) { imgWidth = imgHeight }
  return (
    <div style={ containerStyles } className={"image-container"+imageData.containerClasses+imageData.contain}
      id={containerId} aria-label={description+" Contianer"}>
      <Image
        // width={imgWidth}
        layout={imageData.layout}
        className={"image-class"+imageData.imgClasses}
        alt={imageData.description}
        src={src}
        id={imageData.id}
        placeholder={imageData.blur}
        draggable={imageData.drag}
        priority={imageData.priority} />
    </div>
  )
      
}

export default ImageContainer;