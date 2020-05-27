import React from "react";
import styled from "@emotion/styled";

class ColumnNames extends React.Component {
  render() {
    return(
      <Div>
        <span>OI</span>
        <span>BID</span>
        <span>ASK</span>
        <span>STRIKE</span>
        <span>BID</span>
        <span>ASK</span>
        <span>OI</span>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 14% 1fr 1fr 1fr;
  text-align: center;
`;

export default ColumnNames