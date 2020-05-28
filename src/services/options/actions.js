import {
  REQUEST_CONTRACTS, RECEIVE_CONTRACTS, MAP_OPTIONS, FOCUS_CONTRACT,
  REQUEST_BOOK_TOPS, RECEIVE_BOOK_TOPS,
  WS_CONNECT, WS_CONNECTING, WS_CONNECTED, WS_DISCONNECT, WS_DISCONNECTED,
  UPDATE_BOOK_TOP
} from './actionTypes'

import { getContracts, getBookTops } from "./api";

// WebSocket actions
export const wsConnect = host => ({ type: WS_CONNECT, host })
// export const wsConnecting = host => ({ type: WS_CONNECTING, host })
export const wsConnected = host => ({ type: WS_CONNECTED, host })
export const wsDisconnect = host => ({ type: WS_DISCONNECT, host })
export const wsDisconnected = host => ({ type: WS_DISCONNECTED, host })

export const updateBookTop = data => ({ type: UPDATE_BOOK_TOP, payload: data})


// Contract and Book Top actions
const requestContracts = () => ({ type: REQUEST_CONTRACTS })

const receiveContracts = (data) => ({ type: RECEIVE_CONTRACTS, payload: data })

const mapOptions = () => ({ type: MAP_OPTIONS })

export const focusContract = (data) => ({ type: FOCUS_CONTRACT, payload: data })

const requestBookTops = () => ({ type: REQUEST_BOOK_TOPS })

const receiveBookTops = (data) => ({ type: RECEIVE_BOOK_TOPS, payload: data })

const setInitialData = () => {
  return async (dispatch) => {
    dispatch(requestContracts());
    await getContracts().then(data => dispatch(receiveContracts(data)));
    dispatch(mapOptions());
    dispatch(requestBookTops());
    await getBookTops().then(data => dispatch(receiveBookTops(data)));
  }
}

const shouldSetInitialData = (state) => {
  return !state.isFetching;
}

export const setInitialDataIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldSetInitialData(getState())) {
      return dispatch(setInitialData());
    }
  }
}