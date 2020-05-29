import React from "react"
import styled from "styled-components";

import Call from "../Call"
import Put from "../Put"
import StrikeSpan from "../StrikeSpan"

class Row extends React.Component {
  render() {
    const { contracts, strike, isPriceBreak, breakOffset, isEven } = this.props;
    return (
      <Div isPriceBreak={isPriceBreak}>
        <Call isEven={isEven} id={contracts.call} />
        <StrikeSpan isEven={isEven} isPriceBreak={isPriceBreak} breakOffset={breakOffset} strike={strike}/>
        <Put isEven={isEven} id={contracts.put} />
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 43% 14% 43%;
  width: 100%;
  border-bottom: ${props => props.isPriceBreak ? `1px solid ${props.theme.moneyline}` : 'none'};
`;

const Span = styled.span`
  text-align: center;
`;

export default Row;