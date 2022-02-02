const SvgShape = ({ type, width, height, roundWidth, roundHeight, strokeColor, strokeWidth, fill, fillColor, gradientId, fillRule, shapeStyles, x, y, cx, cy, r, rx, ry, points, path, stopFirst, stopMiddle, stopLast, stopOffsetFirst, stopOffsetMiddle, stopOffsetLast, stopColorFirst, stopColorMiddle, stopColorLast, stopOpacityFirst, stopOpacityMiddle, stopOpacityLast, x1, y1, x2, y2, text, textColor, textX, textY, fontSize, textStyles, image, imageWidth, imageHeight, imageSrc, imageDescription, imageStyles, clipPath, clipId }) => {

    type=type?type:"circle";

    x=x?x:"50";
    y=y?y:"20";
    cx=cx?cx:"50";
    cy=cy?cy:"50";
    r=r?r:"50";
    rx=rx?rx:"50";
    ry=ry?ry:"50";

    width=width?width:"200";
    height=height?height:"200";
    roundWidth=roundWidth?roundWidth:width;
    roundHeight=roundHeight?roundHeight:height;
    points=points?points:"100,10 40,198 190,78 10,78 160,198";

    fill=fill?fill:"fill"
    fillColor=fillColor?fillColor:"#000000";
    fillRule=fillRule?fillRule:"nonzero";

    x1=x1?x1:"0%";
    y1=y1?y1:"0%";
    x2=x2?x2:"100%";
    y2=y2?y2:"0%";

    gradientId=gradientId?gradientId:"svg-gradient"

    stopFirst=stopFirst?stopFirst:true;
    stopMiddle=stopMiddle?stopMiddle:false;
    stopLast=stopLast?stopLast:true;

    stopColorFirst=stopColorFirst?stopColorFirst:"#ffffff";
    stopColorMiddle=stopColorMiddle?stopColorMiddle:"";
    stopColorLast=stopColorLast?stopColorLast:"#000000";

    stopOffsetFirst=stopOffsetFirst?stopOffsetFirst:"0%";
    stopOffsetMiddle=stopOffsetMiddle?stopOffsetMiddle:"50%";
    stopOffsetLast=stopOffsetLast?stopOffsetLast:"100%";
    
    stopOpacityFirst=stopOpacityFirst?stopOpacityFirst:"1";
    stopOpacityMiddle=stopOpacityMiddle?stopOpacityMiddle:"1";
    stopOpacityLast=stopOpacityLast?stopOpacityLast:"1";

    strokeColor=strokeColor?strokeColor:"#ffffff";
    strokeWidth=strokeWidth?strokeWidth:"0";
    shapeStyles=shapeStyles?shapeStyles:{};

    clipId=clipId?clipId:"clip-path";
    clipPath=clipPath?clipPath:<></>;

    let gradient=
        <linearGradient
            id={gradientId} x1={x1} y1={y1} x2={x2} y2={y2}>
            {stopColorFirst ? <stop offset={stopOffsetFirst} stopColor={stopColorFirst} stopOpacity={stopOpacityFirst} /> : <></>}
            {stopColorMiddle ? <stop offset={stopOffsetMiddle} stopColor={stopColorMiddle} stopOpacity={stopOpacityMiddle} /> : <></>}
            {stopColorLast ? <stop offset={stopOffsetLast} stopColor={stopColorLast} stopOpacity={stopOpacityLast} /> : <></>}
        </linearGradient>;
    
    let clip=
        <clipPath id={clipId}>
            <path fill="none" d={clipPath}/>
        </clipPath>

    let color = fill === "gradient" ? `url(#${gradientId})` : fillColor;

    let shape = <></>
    if (type === "circle") {
        shape = <circle cx={cx} cy={cy} r={r} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} style={shapeStyles} />;
    } else if (type === "ellipse") {
        shape = <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} style={shapeStyles} />;
    } else if (type === "rect") {
        shape = <rect x={x} y={y} rx={rx} ry={ry}  width={roundWidth} height={roundHeight} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} style={shapeStyles} />;
    } else if (type === "path") {
        shape = {path}
    }else {
        shape = <polygon points={points} stroke={strokeColor} strokeWidth={strokeWidth} fill={color} style={shapeStyles} />;
    }

    textX=textX?textX:"50%";
    textY=textY?textY:"50%";

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
            <defs>
                {gradient}
                {clip}
            </defs>
            {shape ? shape : <></>}
            {image ? <image width={imageWidth} height={imageHeight} clip-path={clipPath?`url(#${clipPath})`:""} src={imageSrc?imageSrc:""} style={imageStyles?imageStyles:{}} /> : <></>}
            {text ? <text x={textX} y={textY} fill={textColor?textColor:"#ffffff"} fontSize={fontSize?fontSize:""} style={textStyles?textStyles:{}}>{text}</text> : <></>}
        </svg>
    ) 
}

export default SvgShape;