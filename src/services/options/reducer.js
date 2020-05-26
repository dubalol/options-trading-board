import * as types from "./actionTypes";


const initialState = {
  isFetching: false,
  isConnected: false,
  messages: [],
  contracts: [
    /**
     * Only active and non-expired contracts
     * 
     * {
     *  id,
     *  label,
     *  type,
     *  strike,
     *  date_exercise,
     *  open_interest,
     *  time_series: [
     *    [
     *      initial_book_tops,
     *      new best price, ...
     *    ]  
     *  ]
     * }
     */
  ]
}

const options = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_CONTRACTS:
      return state
    case types.RECEIVE_CONTRACTS:
      console.log(action.payload);
      return state
    case types.REQUEST_BOOK_TOPS:
      return state
    case types.RECEIVE_BOOK_TOPS:
      return state
    case types.WS_CONNECTED:
      console.log('connected in reducer')
      return state;
    case types.WS_DISCONNECTED:
      console.log('disconnected in reducer')
      return state;
    case types.UPDATE_CONTRACT:
      console.log('updating contract, ', action)
      return state
    default:
      return state
  }
}

export default options;