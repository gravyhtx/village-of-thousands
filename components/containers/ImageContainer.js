import Image from "next/image";
import website from '../../config/site-data.json'

const ImageContainer = ({ img, sizeObj, width, height, useNext, containerClasses, imgClasses, layout,
  description, id, containerId, priority, blur, drag, contain }) => {
  // Check imported as Next image -- Next uses 'image.src' to get the location
  const data = img.src ? img : { src: img };
  const dataSrc = data.src;

  useNext = useNext === true ? true : false;

  const size = sizeObj === true && data
      ? { width: data.width, height: data.height }
    : sizeObj !== undefined && sizeObj !== true && sizeObj !== false
      ? imageSizeObj(sizeObj)
    : width && height && sizeObj === false
      ? { width: width, height: height }
      : false;

  const imageData = {
      containerClasses: containerClasses ? ' '+containerClasses : '',
      imgClasses: imgClasses ? ' '+imgClasses : '',
      width: width ? { width:width, maxWidth:width } : {},
      height: height ? height : '',
      layout: layout ? layout : 'responsive',
      description: description = description ? description : `${website.name} Site Image`,
      id: id ? id : '',
      priority: priority ? priority : '',
      blur: blur ? "blur" : "",
      drag: drag ? drag : false,
      contain: contain ? " contain" : ""
  }

  const containerStyles = size ? { width: size.width, height: size.height ? height : width } : {};
  
  return (
    <div style={containerStyles} className={"image-container"+imageData.containerClasses+imageData.contain} id={containerId}>
      {size !== false && useNext === true ?
        <Image
          width={size.width ? size.width : "100%"}
          height={size.height ? size.height : "100%"}
          layout={imageData.layout}
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={imageData.blur}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : size === false && useNext ?
        <Image
          layout={imageData.layout}
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          placeholder={imageData.blur}
          draggable={imageData.drag}
          priority={imageData.priority} />
      : <img
          className={"image-class"+imageData.imgClasses}
          alt={imageData.description}
          src={dataSrc}
          id={imageData.id}
          draggable={imageData.drag} />}
    </div>
  )
      
}

export default ImageContainer;