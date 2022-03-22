import Link from "next/link";
// import { useRouter } from "next/router";

import votHeader from '../public/images/header.svg'

const Activate = () => {
  // const router = useRouter();
  const devMode = true;

  const bodyStyles = {
    margin: '0 auto',
    padding: '20px 10px',
    textAlign: 'center',

    display: 'block',
    boxSizing: 'border-box',
    border: '0',
    lineHeight: '1.5',
    verticalAlign: 'baseline',
    textDecoration: 'none',

    backgroundColor: 'rgb(17, 17, 17)',
    color: 'rgb(255, 255, 255)',

    fontSize: '1.2rem',
    fontFamily: '"Roboto Condensed", Helvetica, sans-serif',
  }

  const fill = { fill: '#FFFFFF' };

  const svgContainerStyles = {
    margin: '0 auto',
    position: 'relative',
    height: '0',
    width: '90%',
    padding: '0 0 8%'
  }

  const svgStyles = {
    position: 'absolute',
    height: 'auto',
    width: '100%',
    overflow: 'visible',
    left: '0',
    top: '0'
  }

  const header =
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1100 80" style={svgStyles} preserveAspectRatio="xMidYMin slice">
      <g id="Layer_2_00000054987500142603584780000006078965034674587804_">
      <g id="Layer_2-2">
        <polygon style={fill} points="102.1,3.8 102.1,76.2 82.6,76.2 82.6,8.1 57.6,76.2 36.6,76.2 10,3.8 31.7,3.8 47.1,51.8 62.5,3.8 		
          "/>
        <polygon style={fill} points="150.4,57.3 150.4,76.2 107.2,76.2 107.2,3.8 126.7,3.8 126.7,57.3 		"/>
        <path style={fill} d="M238,3.8h-21l-19.8,53.9v-0.5h-23.6V3.8h-19.5v72.3h58.1l4.2-12.7h22.1l4.4,12.7h21.7L238,3.8z M222.8,44.5
          l4.6-13.8l4.7,13.8H222.8z"/>
        <path style={fill} d="M328.5,41.5c0,17.8-11,35.9-35.4,35.9c-20.6,0-36.1-16-36.1-37.3s16.1-37.3,37.2-37.3
          c7.3,0,14.7,1.1,19.3,2.8l0.6,0.2v21.3l-1.4-0.8c-5.7-2.8-12.1-4.2-18.5-4.1c-9.9,0-17.2,7.5-17.2,17.8s7.1,17.8,16.6,17.8
          c9.2,0,13.5-6,13.8-10.2h-14.8V29.7h34.6l0.1,0.7C328.1,34.1,328.5,37.8,328.5,41.5z"/>
        <polygon style={fill} points="349.6,22.7 349.6,30.2 371.1,30.2 371.1,49.1 349.6,49.1 349.6,57.3 373.2,57.3 373.2,76.2 330,76.2 
          330,3.8 373.2,3.8 373.2,22.7 		"/>
        <polygon style={fill} points="492.4,22.7 492.4,33.4 513.9,33.4 513.9,52.2 492.4,52.2 492.4,76.2 472.9,76.2 472.9,3.8 516,3.8 
          516,22.7 		"/>
        <polygon style={fill} points="584.4,3.8 584.4,22.7 568.2,22.7 568.2,76.2 548.7,76.2 548.7,22.7 532.4,22.7 532.4,3.8 		"/>
        <polygon style={fill} points="651.9,3.8 651.9,76.2 632.4,76.2 632.4,49.1 606.1,49.1 606.1,76.2 586.6,76.2 586.6,3.8 606.1,3.8 
          606.1,30.2 632.4,30.2 632.4,3.8 		"/>
        <path style={fill} d="M791.4,3.8v44.2c0,18-10.9,29.2-28.5,29.2s-28.5-11.2-28.5-29.2V3.8h19.5v45.7c0,5.4,3.6,8.8,9,8.8
          s9-3.5,9-8.8V3.8H791.4z"/>
        <path style={fill} d="M840.9,54.2c0,17-13.7,23-25.5,23c-6.3,0-12.5-1.2-18.4-3.4l-0.6-0.2V51.9l1.5,1.2c4.9,3.5,10.7,5.5,16.7,5.8
          c3.7,0,5.6-1.2,5.6-3.6c0-0.8-0.4-2.1-4.2-4.2l-8.4-4.8c-9.2-5.3-13.2-11.6-13.2-21.1c0-16.6,13.8-22.5,26.7-22.5
          c5.3,0.1,10.5,1.1,15.4,3l0.6,0.3v20.7l-1.5-0.9c-3.5-2.2-9.8-4.6-14.6-4.6c-2.7,0-5.9,0.6-5.9,3.5c0,1.2,1.5,2.8,4.1,4.3l8,4.6
          C836.6,38.7,840.9,45.4,840.9,54.2z"/>
        <path style={fill} d="M951.7,3.8v37.5L927,3.8h-22.2v2.3l4.9,8.1V73L884.3,3.8h-21l-26.6,72.3h21.7l4.3-12.7h22.1l4.3,12.7h40.1
          V42.5l22.9,33.7h19.1V3.8H951.7z M869.1,44.5l4.7-13.8l4.6,13.8H869.1z"/>
        <path style={fill} d="M1007.9,3.8h-27.8v72.3h27.8c21.4,0,35.8-14.5,35.8-36.2S1029.3,3.8,1007.9,3.8z M1007.6,57.3h-8.1V22.7h8.1
          c9.9,0,16,6.6,16,17.3S1017.5,57.3,1007.6,57.3z"/>
        <path style={fill} d="M1090,54.2c0,17-13.7,23.1-25.5,23.1c-6.3,0-12.5-1.2-18.3-3.4l-0.6-0.2V51.9l1.5,1.2
          c4.9,3.5,10.7,5.5,16.7,5.8c3.7,0,5.6-1.2,5.6-3.6c0-0.8-0.4-2.1-4.2-4.2l-8.4-4.8c-9.2-5.3-13.2-11.6-13.2-21.1
          c0-16.6,13.8-22.5,26.7-22.5c5.3,0.1,10.5,1.1,15.3,3l0.6,0.3v20.7l-1.5-0.9c-3.5-2.2-9.8-4.6-14.6-4.6c-2.7,0-5.9,0.6-5.9,3.5
          c0,1.2,1.5,2.8,4.1,4.3l8,4.6C1085.7,38.7,1090,45.4,1090,54.2z"/>
        <path style={fill} d="M432.5,1.2c-22.1,0-38.7,16.7-38.7,38.8s16.6,38.8,38.7,38.8c22.1,0,38.7-16.7,38.7-38.8S454.6,1.2,432.5,1.2
          z M432.5,59c-10.3,0-18.3-8.3-18.3-19s8.1-19,18.3-19c10.2,0,18.3,8.3,18.3,19S442.8,59,432.5,59z"/>
        <path style={fill} d="M693.2,1.2c-22,0-38.7,16.7-38.7,38.8s16.7,38.8,38.7,38.8s38.7-16.7,38.7-38.8S715.2,1.2,693.2,1.2z
            M693.2,59c-10.3,0-18.3-8.3-18.3-19s8.1-19,18.3-19s18.3,8.3,18.3,19S703.5,59,693.2,59z"/>
      </g>
      </g>
    </svg>

  const VotLogo = () => {
    return (
      <div style={svgContainerStyles}>
        {header}
      </div>
    )
  }

  const hash = '1234567';

  const linkStyle = {
    textDecoration: 'underline'
  };

  const PrdLink = () => {
    return (
      <a href={`https://villageofthousands.com/activate/${hash}`} style={linkStyle}>Click here to activate your account.</a>
    )
  }

  const DevLink = () => {
    return (
      <Link href={`/activate/${hash}`}><a style={linkStyle}>Click here to activate your account.</a></Link>
    )
  };

  const Html = () => {
      return (
				<div>
          <VotLogo />
          {devMode ? <DevLink /> : <PrdLink />}
        </div>
      )
  };
  
  return (
    <div style={bodyStyles}>
      <Html />
    </div>
  );
}

export default Activate;