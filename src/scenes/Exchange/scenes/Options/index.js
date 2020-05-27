import React from "react";
import { connect } from 'react-redux';

import Board from "./components/Board"

const mapStateToProps = (state) => ({
  optionsMap: state.optionsMap,
  currentDayAheadId: state.currentDayAheadId
})

class Options extends React.Component {
  render() {
    console.log('rendered with props', this.props.optionsMap);
    const { optionsMap } = this.props;
    return(
      <div>
        <Board optionsMap={optionsMap}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Options);