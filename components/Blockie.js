// Usage:
//   npm install blockies-identicon
//   const Blockies = require("blockies/react-component");
//   <Blockies opts={{seed: "foo", color: "#dfe", bgcolor: "#a71", size: 15, scale: 3, spotcolor: "#000"}}/>
import React from 'react';
import blockie from '../modules/blockie';

class Blockie extends React.Component {
  constructor(props) {
    super(props);
  }
  getOpts () {
    return {
      seed: this.props.opts.seed || "Claire Richard",
      color: this.props.opts.color || "#111111",
      bgcolor: this.props.opts.bgcolor || "#3b4954",
      size: this.props.opts.size || 10,
      scale: this.props.opts.scale || 8,
      spotcolor: this.props.opts.spotcolor || "#7FCCE4",
    };
  }
  componentDidMount() {
    this.draw();
  }
  draw() {
    blockie.render(this.getOpts(), this.canvas);
  }
  render() {
    const blockieCanvas = <canvas className={'blockie-canvas'+this.props.classes} ref={canvas => this.canvas = canvas} id="blockie-canvas"/>
    
    return (<div className='blockie-box animate__animated animate__fadeIn'>{blockieCanvas}</div>)
  }
}

export default Blockie;
