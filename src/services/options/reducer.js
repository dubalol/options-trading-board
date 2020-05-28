import produce from "immer";
import moment from "moment";

import * as types from "./actionTypes";

import { contracts } from "./STATIC_CONTRACTS";
import { bookTops } from "./STATIC_BOOK_TOPS";

import  { mapOptions } from "./optionsMapper"

const initialState = {
  isInitiallySet: false,
  isConnected: false,
  // updateQueue: [],
  currentDayAheadId: null,
  focusedContract: null,
  contracts: {
    // Index on contract_id to facilitate updates
    // Handle selector logic in component services
  },
  optionsMap: null
}


/*
  Sample Contract
  "id": 21786162,
  "name": null,
  "label": "cBTC 2021-06-25 Put $50,000.00",
  "underlying_asset": "CBTC",
  "collateral_asset": "USD",
  "active": true,
  "type": "put",
  "strike_price": 5000000,
  "min_increment": 1,
  "date_live": "2019-11-19 05:00:00+0000",
  "date_expires": "2021-06-25 20:00:00+0000",
  "date_exercise": "2021-06-25 21:00:00+0000",
  "derivative_type": "options_contract",
  "open_interest": 100,
  "is_one_day": false 
*/
const options = (state = initialState, action) => {
  let newState, now;

  switch (action.type) {
    case types.REQUEST_CONTRACTS:
      // newState = produce(state, draftState => {
      //   draftState.isFetching = true;
      // })
      // newState = produce(state, draftState => {
      //   contracts.filter(ct => ct.active).forEach(ct => {
      //     const { id, label, strike_price, date_expires, derivative_type, open_interest, type } = ct;
      //     draftState.contracts[id] = {
      //       label,
      //       strike_price: strike_price / 100,
      //       open_interest,
      //       date_expires,
      //       derivative_type,
      //       type
      //     }

      //     // There should only be 1 day ahead swap active per day
      //     if (derivative_type === 'day_ahead_swap') draftState.currentDayAheadId = id;
      //   })
      // });
      // // console.log(mapOptions(newState.contracts));
      // return newState
      return state;

    case types.RECEIVE_CONTRACTS:
      const contracts = action.payload;
      newState = produce(state, draftState => {
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
      // now = moment().unix() * 1000;
      // newState = produce(state, draftState => {
      //   bookTops.data.forEach(bt => {
      //     const { contract_id, clock, ask, bid } = bt;
      //     if (draftState.contracts[contract_id]) {
      //       draftState.contracts[contract_id].clock = clock;
      //       draftState.contracts[contract_id].ask = ask/100;
      //       draftState.contracts[contract_id].bid = bid/100;
      //       draftState.contracts[contract_id].history = [
      //         [now, bid/100, ask/100, (bid + ask) / 2 / 100]
      //       ]
      //     }
      //   })
      // })
      // return newState;
      return state;

    case types.RECEIVE_BOOK_TOPS:
      const bookTops = action.payload;
      now = moment().unix() * 1000;
      newState = produce(state, draftState => {
        draftState.isInitiallySet = true;
        bookTops.forEach(bt => {
          const { contract_id, clock, ask, bid } = bt;
          if (draftState.contracts[contract_id]) {
            draftState.contracts[contract_id].clock = clock;
            draftState.contracts[contract_id].ask = ask/100;
            draftState.contracts[contract_id].bid = bid/100;
            draftState.contracts[contract_id].history = [
              [now, bid/100, ask/100, (bid + ask) / 2 / 100]
            ]
          }
        })
      })
      return newState;

    case types.WS_CONNECTED:
      console.log('connected in reducer')
      return state;
    
    case types.WS_DISCONNECTED:
      console.log('disconnected in reducer')
      return state;
    
    case types.UPDATE_BOOK_TOP:
      now = moment().unix() * 1000;
      // return produce(state, draftState => {
      //   draftState.contracts[22199887].history.push([
      //     now, (Math.random()*(1000)) + 2000, Math.random()*(1000) + 4000, Math.random()*(1000) + 3000
      //   ])
      // })
      // console.log('updating contract with ', action.payload)
      const { contract_id, clock, ask, bid } = action.payload;

      newState = produce(state, draftState => {
        draftState.contracts[contract_id].clock = clock;
        draftState.contracts[contract_id].bid = bid/100;
        draftState.contracts[contract_id].ask = ask/100;
        draftState.contracts[contract_id].history.push(
          [now, bid/100, ask/100, (bid + ask) / 2 / 100]
        )
      })
      return newState

    default:
      return state
  }
}

export default options;