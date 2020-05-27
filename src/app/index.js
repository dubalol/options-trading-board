import React from "react";
import { connect } from 'react-redux';

import { wsConnect, wsDisconnect } from '../services/options/actions';
import { setInitialDataIfNeeded, update } from "../services/options/actions";

import Exchange from '../scenes/Exchange'

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
    dispatch(setInitialDataIfNeeded())
  };

  render() {
    const { dispatch } = this.props;
    return(
      <div>
        Hello World
        <button onClick={() => dispatch(update())}>Updater</button>
        <Exchange />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);