// // https://react-glider.vercel.app/
// import ReactGlider from 'react-glider';

// const Glider = ({ children, containerClasses, hasDots, hasArrows, perspective, draggable, exactWidth, itemWidth,
//   scrollLock, slidesToShow, slidesToScroll, contain }) => {

//   hasDots = hasDots === true ? true : false;
//   hasArrows = hasArrows === true ? true : false;
//   draggable = draggable === false ? false : true;

//   exactWidth = exactWidth === true ? true : itemWidth && !exactWidth ? true : false;
  
//   scrollLock = scrollLock === true ? true : false;
//   slidesToShow = slidesToShow ? slidesToShow : perspective && !slidesToShow && !itemWidth ? 5
//     : !slidesToShow && itemWidth ? "auto" : 1;
//   slidesToScroll = slidesToScroll ? slidesToScroll : 1;

//   contain = contain === true ? "container" : "";
//   containerClasses = containerClasses ? " "+containerClasses : "";

//   const containerClassName = contain + containerClasses;

//   return (
//     <div className={containerClassName}>
//       <ReactGlider
//         className={perspective ? "glider-perspective" : "glider-container"}
//         draggable={draggable}
//         hasArrows={hasArrows}
//         hasDots={hasDots}
//         scrollLock={scrollLock}
//         slidesToShow={slidesToShow}
//         slidesToScroll={slidesToScroll}
//         exactWidth={exactWidth}
//         itemWidth={itemWidth}
//       >
//       { children ? children : <div>&nbsp;</div> }
//       </ReactGlider>
//     </div>
//   )
// }

// export default Glider;
