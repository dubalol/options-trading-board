import React from "react";
import { connect } from 'react-redux';

import { wsConnect, wsDisconnect } from '../services/options/actions';
import { fetchInitialDataIfNeeded } from "../services/options/actions";

const mapStateToProps = (state) => ({
  messages: state.messages
})

class App extends React.Component {

  componentDidMount() {
    this.connectToAPIs();
  }

  connectToAPIs() {
    const { dispatch } = this.props;
    // const host = `ws://localhost:3000`;
    // dispatch(wsConnect(host));
    dispatch(fetchInitialDataIfNeeded())
  };

  render() {
    return(
      <div>
        Hello World
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);