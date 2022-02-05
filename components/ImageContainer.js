import Image from "next/image";

const ImageContainer = ({ width, containerClasses, imgClasses, layout, description, src, id, svg, priority, blur }) => {

    containerClasses = containerClasses ? ' '+containerClasses : '';
    imgClasses = imgClasses ? ' '+imgClasses : '';
    width = width ? {maxWidth: width} : '';
    layout = layout ? layout : 'responsive';
    id = id ? id : '';
    priority = priority ? priority : false;
    svg = svg ? svg : false;
    blur = blur ? "blur" : "";
    console.log(priority)

    return (
      <div className={"image-container"+containerClasses}>
        <Image
          layout={layout}
          className={"image-class"+imgClasses}
          alt={description}
          src={src}
          id={id}
          placeholder={blur}
          priority={priority} />
      </div>
    )
    
}

export default ImageContainer;