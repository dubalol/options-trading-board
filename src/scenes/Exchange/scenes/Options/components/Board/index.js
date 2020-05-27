import React from "react";
import moment from "moment";

import ColumnNames from "./components/ColumnNames"
import Header from "./components/Header"
import Row from "./components/Row"


class Board extends React.Component {
  render() {
    const board = [];
    const { optionsMap } = this.props;

    if (optionsMap) {
      const sortedExpiryDates = Object.keys(optionsMap).sort();
  
      sortedExpiryDates.forEach(date => {
        board.push(<Header date={date} key={date}/>)
  
        const sortedStrikes = Object.keys(optionsMap[date]);
        sortedStrikes.forEach(strike => {
          board.push(<Row strike={strike} contracts={optionsMap[date][strike]} key={date+strike}/>)
        })
      })
    }

    return(
      <div>
        Options Board
        <ColumnNames />
        {board}
      </div>
    )
  }
}

export default Board;