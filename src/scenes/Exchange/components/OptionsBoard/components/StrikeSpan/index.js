import React from "react";
import styled from "styled-components";

import PriceBreak from "../PriceBreak"

class StrikeSpan extends React.Component {
  render() {
    const { strike, isPriceBreak, breakOffset, isEven } = this.props; 
    return(
      <Span isEven={isEven}>
        <b>{Number.parseInt(strike).toLocaleString()}</b>
        {/* {isPriceBreak && <PriceBreak offset={breakOffset}/>} */}
      </Span>
    )
  }
}
const Span = styled.span`
  height: 100%;
  line-height: 2em;
  z-index: 2;
  color: ${props => props.theme.textStrike};
  background-color: ${props => props.isEven ?  props.theme.bgStrike1 : props.theme.bgStrike2};
  text-align: center;
  vertical-align: middle;
  pointer-events: none;
`;

export default StrikeSpan