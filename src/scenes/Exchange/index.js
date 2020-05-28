import React from "react";
import { connect } from 'react-redux';
import styled, { css } from "styled-components";

import PortfolioBar from "./components/PortfolioBar"
import TradeNav from "./components/TradeNavBar"
import Options from "./scenes/Options/";
import Futures from "./scenes/Futures";
import Chat from "./components/Chat";
import TradeBlotter from "./components/TradeBlotter";

class Exchange extends React.Component {
  constructor() {
    super();
    this.state = { 
      focus: 'options'
    }
  }

  handleTopNavClick() {

  }

  render() {
    const { focus } = this.state;
    return(
      <Div>
        <PortfolioStyle><PortfolioBar /></PortfolioStyle>
        <NavStyle><TradeNav /></NavStyle>
        {focus === 'options' && <FocusStyle><Options /></FocusStyle>}
        {focus === 'futures' && <FocusStyle><Futures /></FocusStyle>}
        <ChatStyle><Chat /></ChatStyle>
        <BlotStyle><TradeBlotter /></BlotStyle>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 19fr 20fr;
  gap: 3px;
  grid-template-areas: 
    "port port port"
    ". nav chat"
    "focus focus chat"
    "focus focus blot";
`;

const PortfolioStyle = styled.div`
  grid-area: port;
`;

const NavStyle = styled.div`
  grid-area: nav;
`;

const FocusStyle = styled.div`
  grid-area: focus;
`;

const ChatStyle = styled.div`
  grid-area: chat;
`;

const BlotStyle = styled.div`
  grid-area: blot;
`;

export default Exchange;