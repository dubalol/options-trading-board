import React from "react";
import { connect } from 'react-redux';
import styled, { ThemeProvider } from "styled-components";

import PortfolioBar from "./components/PortfolioBar"
import TradeNav from "./components/TradeNavBar"
import OptionsBoard from "./components/OptionsBoard";
import FuturesBoard from "./components/FuturesBoard";
import Chat from "./components/Chat";
import TradeBlotter from "./components/TradeBlotter";

import OrderForm from "./components/OrderForm"
import Graph from "./components/Graph"
import OrderBook from "./components/OrderBook"

import themes from "../../services/theme"

const mapStateToProps = (state) => ({
  focusedContract: state.contracts[state.focusedContract],
  activeDayAhead: state.contracts[state.currentDayAheadId],
  networkError: state.networkError
})

class Exchange extends React.Component {
  constructor() {
    super();
    this.state = { 
      focus: 'options',
      theme: 'dark'
    }
  }

  handleTopNavClick() {

  }

  handleThemeChange() {
    this.setState({ theme: theme === 'dark' ? 'light' : 'dark'})
  }

  render() {
    const { focus, theme } = this.state;
    const { focusedContract, activeDayAhead, networkError } = this.props;

    let priceBTC = 0;
    if (activeDayAhead) priceBTC = (activeDayAhead.ask + activeDayAhead.bid) / 2
    // const { ask, bid } = activeDayAhead;

    if (networkError) return(<div>Unexpected network error</div>)
    return(
      <ThemeProvider theme={themes[theme]}>
        <PortfolioBar activeDayAhead={activeDayAhead} handleThemeChange={() => this.handleThemeChange()}/>
        <MainGrid>
          <Left>
            <OrderForm focus={focusedContract}/>
            <Graph focus={focusedContract}/>
            <OrderBook focus={focusedContract}/>
          </Left>
          <Mid>
            <TradeNav />
            {focus === 'options' && <OptionsBoard priceBTC={priceBTC}/>}
            {focus === 'futures' && <FuturesBoard />}
          </Mid>
          <Right>
            <Chat />
            <TradeBlotter />
          </Right>
        </MainGrid>
      </ThemeProvider>
    )
  }
}

const MainGrid = styled.div`
  margin-top: 3rem;
  position: absolute;
  width: 100%;
  background-color: ${props => props.theme.bgMain};
  color: ${props => props.theme.textPrimary};
  display: grid;
  grid-template-columns: 400px 2fr 1fr;
  grid-template-rows: auto;
  gap: 10px;
  grid-template-areas: 
    "left mid right"
`;

// 3rem for Portfolio bar, 10px for margin
const Left = styled.div`
  max-height: calc(100vh - 3rem - 10px);
  margin-top: 10px;
  grid-area: left;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 2fr 3fr;
  grid-template-areas:
    "form"
    "graph"
    "book"
`;

const Mid = styled.div`
  min-width: 600px;
  grid-area: mid;
`;

// 3rem for Portfolio bar, 10px for margin
const Right = styled.div`
  max-height: calc(100vh - 3rem - 10px);
  margin-top: 10px;
  grid-area: right;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "chat"
    "blot"
`;

export default connect(mapStateToProps)(Exchange);