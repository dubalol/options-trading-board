import React from "react"
import styled from "styled-components";

import Call from "../Call"
import Put from "../Put"
import StrikeSpan from "../StrikeSpan"

class Row extends React.Component {
  render() {
    const { contracts, strike, isPriceBreak, breakOffset } = this.props;
    return (
      <Div>
        <Call id={contracts.call} />
        <StrikeSpan isPriceBreak={isPriceBreak} breakOffset={breakOffset} strike={strike}/>
        <Put id={contracts.put} />
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 43% 14% 43%;
  width: 100%;
`;

const Span = styled.span`
  text-align: center;
`;

export default Row;