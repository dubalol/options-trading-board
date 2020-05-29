import React from "react";
import styled from "styled-components";

class TradeBlotter extends React.Component {
  render() {
    return(
      <Div>
        TradeBlotter
      </Div>
    )
  }
}

const Div = styled.div`
  background-color: ${props => props.theme.bgCard2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TradeBlotter;