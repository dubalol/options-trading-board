import React from "react";
import { connect } from 'react-redux';

import Options from "./scenes/Options/"

class Exchange extends React.Component {
  render() {
    return(
      <div>
        <Options />
      </div>
    )
  }
}

export default Exchange;