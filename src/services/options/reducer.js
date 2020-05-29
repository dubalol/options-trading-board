// TODO: Segregate updating historical data points from receiving initial booktops (fix missing first data points)

import produce from "immer";
import moment from "moment";

import * as types from "./actionTypes";
import  { mapOptions } from "./optionsMapper"

// Static data for development
// import { contracts } from "./STATIC_CONTRACTS";
// import { bookTops } from "./STATIC_BOOK_TOPS";


export const initialState = {
  networkError: false,
  isInitiallySet: false,
  isFetching: false,
  isConnected: false,
  currentDayAheadId: null,
  focusedContract: null,
  contracts: {
    // Index on contract_id to facilitate updates
  },
  optionsMap: null
}

export const options = (state = initialState, action) => {
  let newState, now;

  switch (action.type) {
    case types.REQUEST_CONTRACTS:
      return produce(state, draftState => {
        draftState.isFetching = true;
      });

    case types.RECEIVE_CONTRACTS:
      const contracts = action.payload;
      newState = produce(state, draftState => {
        draftState.isFetching = false;

        contracts.filter(ct => ct.active).forEach(ct => {
          const { id, label, strike_price, date_expires, derivative_type, open_interest, type } = ct;
          
          draftState.contracts[id] = {
            label,
            strike_price: strike_price / 100,
            open_interest,
            date_expires,
            derivative_type,
            type
          }

          // There should only be 1 day ahead swap active per day
          if (derivative_type === 'day_ahead_swap') draftState.currentDayAheadId = id;
        })
      });
      return newState

    case types.MAP_OPTIONS:
      newState = produce(state, draftState => {
        draftState.optionsMap = mapOptions(draftState.contracts, draftState.currentDayAheadId);
      })
      return newState;

    case types.FOCUS_CONTRACT:
      newState = produce(state, draftState => {
        draftState.focusedContract = action.payload
      })
      return newState
      
    case types.REQUEST_BOOK_TOPS:
      return produce(state, draftState => {
        draftState.isFetching = true;
      });

    case types.RECEIVE_BOOK_TOPS:
      const bookTops = action.payload;
      now = moment().unix() * 1000;
      newState = produce(state, draftState => {
        draftState.isFetching = false;
        // ! Websocket messages will not update state until this next line
        draftState.isInitiallySet = true;

        const priceBTC = (draftState.contracts[draftState.currentDayAheadId].bid
          + draftState.contracts[draftState.currentDayAheadId].ask) / 2;

        bookTops.forEach(bt => {
          const { contract_id, clock, ask, bid } = bt;
          const mid = (ask + bid) / 2;
          if (draftState.contracts[contract_id]) {
            draftState.contracts[contract_id].clock = clock;
            draftState.contracts[contract_id].ask = ask/100;
            draftState.contracts[contract_id].bid = bid/100;
            draftState.contracts[contract_id].history = [[
              now,
              bid/100, 
              ask/100, 
              mid/100,
              Math.abs(priceBTC - draftState.contracts[contract_id].strike_price)
            ]]
          }
        })
      })
      return newState;
    
    case types.NETWORK_ERROR:
      return produce(state, draftState => {
        draftState.networkError = true;
      })

    case types.WS_CONNECTED:
      console.log('connected in reducer')
      return state;
    
    case types.WS_DISCONNECTED:
      console.log('disconnected in reducer')
      return state;
    
    case types.UPDATE_BOOK_TOP:
      now = moment().unix() * 1000;
      const { contract_id, clock, ask, bid } = action.payload;
      const mid = (ask + bid) / 2;
      
      newState = produce(state, draftState => {
        const priceBTC = (draftState.contracts[draftState.currentDayAheadId].bid
          + draftState.contracts[draftState.currentDayAheadId].ask) / 2;

        if (clock > draftState.contracts[contract_id].clock) {
          draftState.contracts[contract_id].clock = clock;
          draftState.contracts[contract_id].bid = bid/100;
          draftState.contracts[contract_id].ask = ask/100;
          draftState.contracts[contract_id].history.push([
              now,
              bid/100,
              ask/100,
              mid/100,
              Math.abs(priceBTC - draftState.contracts[contract_id].strike_price)
          ])
        }
      })
      return newState

    default:
      return state
  }
}