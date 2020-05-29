import React from "react";
import { connect } from 'react-redux';
import styled from "styled-components";

import ColumnNames from "./components/ColumnNames"
import Header from "./components/Header"
import Row from "./components/Row"
import Spinner from "./components/Spinner"

import { updateBookTop } from "../../../../services/options/actions"

const mapStateToProps = (state) => ({
  optionsMap: state.optionsMap,
  activeDayAhead: state.contracts[state.currentDayAheadId],
  focusedContract: state.contracts[state.focusedContract],
  isInitiallySet: state.isInitiallySet
})

class OptionsBoard extends React.Component {
  render() {
    const board = [];
    const { optionsMap, priceBTC, isInitiallySet } = this.props;

    if (optionsMap) {
      const sortedExpiryDates = Object.keys(optionsMap).sort();
  
      sortedExpiryDates.forEach(date => {
        board.push(<Header date={date} key={date}/>)
  
        const sortedStrikes = Object.keys(optionsMap[date]).map(el => Number(el)).sort((a, b) => a - b);

        sortedStrikes.forEach((strike, index) => {
          const isPriceBreak = (strike <= priceBTC && sortedStrikes[index + 1] >= priceBTC);
          const breakOffset = 0; // Can calculate pixel offset to more accurately display money line
          const row = <Row 
            strike={strike} contracts={optionsMap[date][strike]} key={date+strike}
            isPriceBreak={isPriceBreak} breakOffset={breakOffset} isEven={index % 2 === 0}
          />
          board.push(row)
        })
      })
    }

    return (
      isInitiallySet ? 
        <Div>
          <ColumnNames />
          {board}
        </Div> : 
        <Div><Spinner /></Div>
    )
  }
}

// 3rem for PortfolioBar, 3rem + 1px for NavBar
const Div = styled.div`
  height: calc(100vh - 3rem - 3rem - 1px);
  overflow: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.borderCard};
    border-radius: 10px;
  }
`;

export default connect(mapStateToProps)(OptionsBoard);