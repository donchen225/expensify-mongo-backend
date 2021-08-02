import {
    ADD_CASH_TRANSACTION,
    DELETE_CASH_TRANSACTION,
    GET_CASH_TRANSACTIONS,
    UPDATE_CASH_TRANSACTION
  } from "../actions/types";

  const initialState = {
    transaction: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CASH_TRANSACTION:
            return [
                ...state,
                action.transaction
            ];
        case DELETE_CASH_TRANSACTION:
            return state.filter( 
                transaction => transaction.id !== action.id 
            );
        case UPDATE_CASH_TRANSACTION:
            return state.map (transaction => {
                if (transaction.id === action.id) {
                    return {
                        ...transaction,
                        ...action.updates
                    }
                } else {
                    return transaction
                }
            });
        case GET_CASH_TRANSACTIONS:
            return action.transaction;
        default: 
            return state;
    }
  }