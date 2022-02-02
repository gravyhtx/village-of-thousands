import React from 'react';

const TextContainer = ( { containerClasses, containerId, header, headerClasses, headerId, text, textId, textClasses, border } ) => {
    let cClass="";
    if(containerClasses){
        cClass=" "+containerClasses;
    }
    let hClass="";
    if(headerClasses){
        hClass=" "+headerClasses;
    }
    let tClass="";
    if(textClasses){
        tClass=" "+textClasses;
    }
    return (
        <div className={border ? "text-container borders"+cClass : "text-container"+cClass} id={containerId?containerId:"text-container"}>
            {header ? <header className={"text-container_header"+hClass} id={headerId?headerId:"text-container-header"}>{header}</header> : ""}
            {text ? <div className={"text-container_text"+tClass} id={textId?textId:"text-container-text"}>{text}</div> : ""}
        </div>
    )
}


////////////////////////////////
//-- TEXT CONTAINER CLASSES --//
////////////////////////////////

// CONTAINER
//    Background: no-bkg, dark, light, dark-gradient
//    Box: padding, margin

// BORDERS
//    FX: shadow glow
//    thick, dark, shadow, glow

// HEADER:
//    dark, light, big, small, thick, thin, glow

// TEXT:
//    dark, light, dark-gradient


export default TextContainer;