const TextContainer = ( { containerClasses, containerId, header, headerClasses, headerId, text, textId, textClasses, border, fnClick, fnChange } ) => {
    let cClass = containerClasses ? " "+containerClasses : "";
    let cId = containerId ? containerId : 'text-container';
    let hClass = headerClasses ? " "+headerClasses  : "";
    let tClass= textClasses ? " "+textClasses: "";

    const handleClick = () =>  {
        // scrollbox.classList.add('reverse');
    }
    const handleChange = () => {

    }
    const setBlur = () =>  {
        // scrollbox.classList.remove('reverse');
    }

    return (
        <div
        onClick={fnClick?fnClick:handleClick}
        onChange={fnChange?fnChange:handleChange}
        onBlur={setBlur}
        className={border ? "text-container borders"+cClass : "text-container"+cClass}
        id={cId}>
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
//    Box: padding, margin, no-margin/padding

// BORDERS
//    FX: thick, dark, shadow, glow
//    reverse

// HEADER:
//    dark, light, big, small, thick, thin, glow

// TEXT:
//    dark, light, dark-gradient


export default TextContainer;