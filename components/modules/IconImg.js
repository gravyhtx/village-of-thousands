import React from 'react';

const IconImg = ( { iconClassName, description, src } ) => {
    <>
        <img className={"icon-class "+iconClassName} alt={description} src={src} />
    </>
}

export default IconImg;
