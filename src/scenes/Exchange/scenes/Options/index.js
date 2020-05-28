import React from "react";
import { connect } from 'react-redux';

import Board from "./components/Board"

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
      <div>
        {priceBTC}
        <Board optionsMap={optionsMap} priceBTC={priceBTC}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Options);