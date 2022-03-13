import Image from "next/image";

const ImageContainer = ({ width, containerClasses, imgClasses, layout, description, src, id, svg, priority, blur, drag, contain }) => {

    containerClasses = containerClasses ? ' '+containerClasses : '';
    imgClasses = imgClasses ? ' '+imgClasses : '';
    width = width ? {maxWidth: width} : '';
    layout = layout ? layout : 'responsive';
    id = id ? id : '';
    priority = priority ? priority : '';
    svg = svg ? svg : false;
    blur = blur ? "blur" : "";
    drag = drag ? drag : false;
    contain = contain ? " contain" : "";

    return (
      <div className={"image-container"+containerClasses+contain}>
        <Image
          layout={layout}
          className={"image-class"+imgClasses}
          alt={description}
          src={src}
          id={id}
          placeholder={blur}
          draggable={drag}
          priority={priority} />
      </div>
    )
    
}

export default ImageContainer;