import React from "react";
import styled from "styled-components";

class ColumnNames extends React.Component {
  render() {
    return(
      <div>
        <Types>
          <Span>Call Options</Span>
          <Span>Put Options</Span>
        </Types>
        <Div>
          <Span>OI</Span>
          <Span>BID</Span>
          <Span>ASK</Span>
          <Span>STRIKE</Span>
          <Span>BID</Span>
          <Span>ASK</Span>
          <Span>OI</Span>
        </Div>
      </div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 14% 1fr 1fr 1fr;
  text-align: center;
`;

const Span = styled.span`
  padding: 0.5em 0em 0.5em 0em;
  font-size: 0.9em;
`;

const Types = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  font-size: 1.1em;
`;

export default ColumnNames