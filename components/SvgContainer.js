import { Link } from 'react-router-dom';

const SvgContainer = ( { margins, src, link, color, width, description, container, classes, id, styles, draggable } ) => {
    let svgContainer="";
    if(container){svgContainer=" "+container;}
    let svgClass="";
    if(classes){svgClass=" "+classes;}
    let svgId="";
    if(id){svgId=" "+id;}

    if(color === "white") {
        color = "invert(100%) sepia(94%) saturate(0%) hue-rotate(150deg) brightness(106%) contrast(101%);"
    }

    margins=margins?margins:"0 auto"
    let svgStyles = {
        margin:margins,
        maxWidth:width,
        styles
    }
    return (
        <a href={link?link:''} target="_blank" rel="noreferrer">
        <div className={"svg-container"+svgContainer}>
            <img
                style={svgStyles ? svgStyles : {}}
                src={src ? src : ""}
                className={"svg-img"+svgClass}
                id={svgId ? "svg-img_"+svgId : ""}
                draggable={draggable ? draggable : true}
                alt={description} />
        </div>
        </a>    )
}

export default SvgContainer