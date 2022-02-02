// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies/react-component");
//   <Blockies opts={{seed: "foo", color: "#dfe", bgcolor: "#a71", size: 15, scale: 3, spotcolor: "#000"}}/>
import React from 'react';
import blockies from './modules/blockies';

class BlockiesIdenticon extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  getOpts () {
    return {
      seed: this.props.opts.seed || "Claire Richard",
      color: this.props.opts.color || "#111111",
      bgcolor: this.props.opts.bgcolor || "#3b4954",
      size: this.props.opts.size || 10,
      scale: this.props.opts.scale || 8,
      spotcolor: this.props.opts.spotcolor || "#7FCCE4"
    };
  }
  componentDidMount() {
    this.draw();
  }
  draw() {
    blockies.render(this.getOpts(), this.canvas);
  }
  render() {
    const blockieCanvas = <canvas className='animate__animated animate__fadeIn blockie-canvas' ref={canvas => this.canvas = canvas} id="blockie-canvas"/>
    // const blockieUrl = blockieCanvas.toDataURL();
    // console.log(blockieUrl)
    return (blockieCanvas)
  }
}

export default BlockiesIdenticon;
