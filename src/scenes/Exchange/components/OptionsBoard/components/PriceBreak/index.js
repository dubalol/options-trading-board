import React from "react";
import styled from "styled-components";

class PriceBreak extends React.Component {
  constructor() {
    super()
    this.state = { hover: false }
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }
  
  handleMouseEnter() {
    console.log('heoheho')
    this.setState({ hover: true })
  }

  render() {
    return(
      <Div 
        // onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}
      >
        {/* {this.state.hover && <ToolTip>Current BTC Price: {this.props.price}</ToolTip>} */}
      </Div>
    )
  }
}

// Width needs to be the same as that defined in Row component grid
const Div = styled.div`
  margin-top: 0px;
  position: absolute;
  z-index: 1;
  width: 14%;
  border: 2px solid gold;
  pointer-events: auto;
`;

const ToolTip = styled.div`
  z-index: 3;
  background-color: gold;
  color: black;
`;

export default PriceBreak;