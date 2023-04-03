import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props:any) => {
    const { src, fallbackSrc, deps, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [err, setErr] = useState(false);

    const handleError = useCallback(() => {
      setErr(true);
      setImgSrc(fallbackSrc);
    }, [err,fallbackSrc])
    
    useEffect(() => {
      if(!err) {
        setImgSrc(src);
      } else {
        setImgSrc(fallbackSrc);
      }
    }, [src,fallbackSrc,err,...deps])

    return (
      <Image {...rest}
        src={imgSrc}
        onError={handleError}
      />
    )
};

//! EXAMPLE:
//? <ImageWithFallback
//?   key={id}
//?   layout="fill"
//?   src={`/img-${id}.webp`}
//?   fallbackSrc={`/img-${id}.png`}
//?   deps={id}
//? />

export default ImageWithFallback;