const ImageContainer = ({ width, containerClasses, imgClasses, description, src }) => {
    let cClass="";
    if(containerClasses){cClass=" "+containerClasses};
    let iClass="";
    if(imgClasses){iClass=" "+imgClasses};
    let imgSize = {};
    if(width){imgSize = {maxWidth: width}};
    
    return (
        <div className={"image-container"+cClass}>
            <img style={imgSize} className={"image-class"+iClass} alt={description} src={src} />
        </div>
    )
}

export default ImageContainer;