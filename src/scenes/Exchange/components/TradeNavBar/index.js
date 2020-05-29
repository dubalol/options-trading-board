import React from "react";
import styled from "styled-components";

class TradeNav extends React.Component {
  render() {
    return(
      <Div>
        <Button>Options</Button>
        <ButtonInactive>Futures <i>(coming soon)</i></ButtonInactive>
      </Div>
    )
  }
}

const Div = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 3rem; 
  border-bottom: 1px solid ${props => props.theme.borderCard}
`;

const Button = styled.button`
  width: 12%;
  height: 100%;
  font-weight: bold;
  border: none;
  background-color: inherit;
  color: ${props => props.theme.textPrimary};
  &:hover {
    border-bottom: 4px solid ${props => props.theme.bgButton};
  }
  &:focus {
    outline: none;
  }
`;

const ButtonInactive = styled.button`
  height: 100%;
  font-weight: bold;
  background-color: inherit;
  color: grey;
  border: none;
  &:focus {
    outline: none;
  }
`;

export default TradeNav;