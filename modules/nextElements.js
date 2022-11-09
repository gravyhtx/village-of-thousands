import Link from "next/link";

export const NxtLink = ({ children, classes, url, linkClasses, linkAlt, button, buttonClasses, index, btnAlt }) => {

  let float = false;
  let nav = false;

  if(buttonClasses.includes('floating')) {
    float = true;
  }

  if(buttonClasses.includes('nav')) {
    float = true;
  }

  const bClassName =
    buttonClasses
    + (float === true ? ' btn-floating' : ' ')
    + (nav === true ? ' navigation-link nav-' : ' ')
    + (nav === true && index ? index : 'item')

  return (
    <Link href={url} key={index}><a className={linkClasses ? linkClasses : 'site-link'} alt={linkAlt?linkAlt:'Site Link'}>
      <div className={classes?classes:null}>
          {button
            ? <button alt={btnAlt?btnAlt:'Click me...'}
                color="inherit"
                className={bClassName}
              >{children}
              </button>
            : {children}
          }
      </div>
    </a></Link>
  )
}