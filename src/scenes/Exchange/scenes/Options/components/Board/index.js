import React from "react";
import moment from "moment";

import ColumnNames from "./components/ColumnNames"
import Header from "./components/Header"
import Row from "./components/Row"

class Board extends React.Component {
  render() {
    const board = [];
    const { optionsMap, priceBTC } = this.props;

    if (optionsMap) {
      const sortedExpiryDates = Object.keys(optionsMap).sort();
  
      sortedExpiryDates.forEach(date => {
        board.push(<Header date={date} key={date}/>)
  
        const sortedStrikes = Object.keys(optionsMap[date]).map(el => Number(el)).sort((a, b) => a - b);

        sortedStrikes.forEach((strike, index) => {
          const isPriceBreak = (strike <= priceBTC && sortedStrikes[index + 1] >= priceBTC);
          const breakOffset = 0;

          const row = <Row 
            strike={strike} contracts={optionsMap[date][strike]} key={date+strike}
            isPriceBreak={isPriceBreak} breakOffset={breakOffset}
          />
          board.push(row)
        })
      })
    }

    return (
      <div>
          <ColumnNames />
          {board}
      </div>
    )
  }
}

export default Board;