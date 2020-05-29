import React from "react";
import styled from "styled-components";

class TradeBlotter extends React.Component {
  render() {
    const { activeDayAhead } = this.props;
    return(
      <Div>
        <Span>Portfolio Bar</Span>
        {activeDayAhead !== undefined && <Span>
          <b>Bitcoin:</b>
          <b>{Number(activeDayAhead.bid).toFixed(2).toLocaleString()} / {Number(activeDayAhead.ask).toFixed(2).toLocaleString()}</b>
        </Span>}
        
      </Div>
    )
  }
}

const Div = styled.div`
  background-color: ${props => props.theme.bgCard2};
  color: ${props => props.theme.textPrimary};
  height: 3rem;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: 400px repeat(auto-fill, 10%);
  grid-row: 1;
`;

const Span = styled.span`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export default TradeBlotter;