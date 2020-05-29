import React from "react";
import { connect } from 'react-redux';

import { wsConnect, wsDisconnect } from '../services/options/actions';
import { setInitialDataIfNeeded, updateBookTop } from "../services/options/actions";

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
    dispatch(setInitialDataIfNeeded())
    const host = `ws://localhost:3000`;
    dispatch(wsConnect(host));
  };

  render() {
    const { dispatch } = this.props;
    return(
      <div>
        {/* <button onClick={() => dispatch(updateBookTop())}>Updater</button> */}
        <Exchange />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);