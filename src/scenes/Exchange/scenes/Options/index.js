import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";

import Board from "./components/Board"
import OrderForm from "./components/OrderForm"
import Graph from "./components/Graph"
import OrderBook from "./components/OrderBook"

const mapStateToProps = (state) => ({
  optionsMap: state.optionsMap,
  activeDayAhead: state.contracts[state.currentDayAheadId]
})

class Options extends React.Component {
  render() {
    const { optionsMap, activeDayAhead } = this.props;

    let priceBTC;
    if (activeDayAhead) priceBTC = (activeDayAhead.bid + activeDayAhead.ask) / 2;

    return(
      <Div>
        {priceBTC}
        <BoardArea>
          <Board optionsMap={optionsMap} priceBTC={priceBTC}/>
        </BoardArea>
        <OrderArea><OrderForm /></OrderArea>
        <GraphArea><Graph /></GraphArea>
        <BookArea><OrderBook /></BookArea>
      </Div>
    )
  }
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 3fr 2fr 3fr;
  gap: 3px;
  grid-template-areas: 
    "order board board"
    "graph board board"
    "book board board";
`;

const BoardArea = styled.div`
  grid-area: board;
`;

const OrderArea = styled.div`
  grid-area: order;
`;

const GraphArea = styled.div`
  grid-area: graph;
`;

const BookArea = styled.div`
  grid-area: book;
`;

export default connect(mapStateToProps)(Options);