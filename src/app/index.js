import React, { Suspense } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';

import { wsConnect, wsDisconnect } from '../services/options/actions';
import { setInitialDataIfNeeded, updateBookTop } from "../services/options/actions";

// import Exchange from '../scenes/Exchange'
const Exchange = React.lazy(() => import('../scenes/Exchange'))

const mapStateToProps = (state) => ({
  messages: state.messages
})

class App extends React.Component {
  componentDidMount() {
    this.connectToAPIs();
  }

  connectToAPIs() {
    const { dispatch } = this.props;
    const host = `ws://localhost:3000`;
    dispatch(setInitialDataIfNeeded())
    dispatch(wsConnect(host));
  };

  render() {
    return(
      <Suspense fallback={<Div>Loading...</Div>}>
        <Exchange />
      </Suspense>
    )
  }
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default connect(mapStateToProps)(App);