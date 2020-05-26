import {
  REQUEST_CONTRACTS, RECEIVE_CONTRACTS,
  REQUEST_BOOK_TOPS, RECEIVE_BOOK_TOPS,
  WS_CONNECT, WS_CONNECTING, WS_CONNECTED, WS_DISCONNECT, WS_DISCONNECTED,
  UPDATE_CONTRACT
} from './actionTypes'

import { getContracts, getBookTops } from "./api";

// WebSocket actions
export const wsConnect = host => ({ type: WS_CONNECT, host })
// export const wsConnecting = host => ({ type: WS_CONNECTING, host })
export const wsConnected = host => ({ type: WS_CONNECTED, host })
export const wsDisconnect = host => ({ type: WS_DISCONNECT, host })
export const wsDisconnected = host => ({ type: WS_DISCONNECTED, host })

export const updateContract = data => ({ type: UPDATE_CONTRACT, payload: data})


// Contract and Book Top actions
const requestContracts = () => ({ type: REQUEST_CONTRACTS })

const receiveContracts = (data) => ({
  type: RECEIVE_CONTRACTS,
  payload: data
})

const requestBookTops = () => ({ type: REQUEST_BOOK_TOPS })

const receiveBookTops = (data) => ({
  type: RECEIVE_BOOK_TOPS,
  payload: data
})

const fetchInitialData = () => {
  return async (dispatch) => {
    dispatch(requestContracts());
    await getContracts().then(data => dispatch(receiveContracts(data)));
    dispatch(requestBookTops());
    await getBookTops().then(data => dispatch(receiveBookTops(data)));
  }
}

const shouldFetchInitialData = (state) => {
  return !state.isFetching
}

export const fetchInitialDataIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchInitialData(getState())) {
      return dispatch(fetchInitialData());
    }
  }
}

// Book top actions


// const fetchBookTops = () => {
//   return (dispatch) => {
//     dispatch(requestBookTops())
//     getBookTops().then(data => dispatch(receiveBookTops(data)))
//   }
// }

// const shouldFetchBookTops = (state) => {
//   return !state.isFetching
// }

// export const fetchBookTopsIfNeeded = () => {
//   return (dispatch, getState) => {
//     if (shouldFetchBookTops(getState())) {
//       return dispatch(fetchBookTops());
//     }
//   }
// }