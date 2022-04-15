import Image from "next/image";
import { useEffect, useState } from "react";

const ImageContainer = ({ width, containerClasses, imgClasses, layout, description, src, id, svg, priority, blur, drag, contain }) => {

  const [imageData, setImageData] = useState({
    width: {
      width: width,
      maxWidth: width
    },
    containerClasses:containerClasses,
    imgClasses:imgClasses,
    layout:layout,
    description:'',
    src:src,
    id:id,
    svg:svg,
    priority:priority,
    blur:blur,
    drag:drag,
    contain:contain
  });

  const dataLength = Object.keys(imageData).length;
    
  // containerClasses = containerClasses ? ' '+containerClasses : '';
  // imgClasses = imgClasses ? ' '+imgClasses : '';
  // width = width ? {maxWidth: width} : '';
  // layout = layout ? layout : 'responsive';
  // id = id ? id : '';
  // priority = priority ? priority : '';
  // svg = svg ? svg : false;
  // blur = blur ? "blur" : "";
  // drag = drag ? drag : false;
  // contain = contain ? " contain" : "";

  useEffect(() => {
    setImageData({
      containerClasses: containerClasses ? ' '+containerClasses : '',
      imgClasses: imgClasses ? ' '+imgClasses : '',
      width: width ? { width:width, maxWidth:width } : {},
      layout: layout ? layout : 'responsive',
      id: id ? id : '',
      priority: priority ? priority : '',
      svg: svg ? svg : false,
      blur: blur ? "blur" : "",
      drag: drag ? drag : false,
      contain: contain ? " contain" : ""
    })
  }, [dataLength])
    
    return (
    <div className={"image-container"+imageData.containerClasses+imageData.contain}>
    <Image
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