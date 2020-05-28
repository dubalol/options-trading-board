import React from "react";
import styled from "styled-components";

import PriceBreak from "../PriceBreak"

class StrikeSpan extends React.Component {
  render() {
    const { strike, isPriceBreak, breakOffset } = this.props; 
    return(
      <Span>
        {strike}
        {isPriceBreak && <PriceBreak offset={breakOffset}/>}
      </Span>
    )
  }
}
const Span = styled.span`
  z-index: 2;
  text-align: center;
  pointer-events: none;
`;

export default StrikeSpan