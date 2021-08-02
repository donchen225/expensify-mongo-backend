import axios from '../services/index';
import {
    ADD_CASH_TRANSACTION,
    DELETE_CASH_TRANSACTION,
    GET_CASH_TRANSACTIONS,
    UPDATE_CASH_TRANSACTION,
} from 
'./types';

exports.addTransaction = (transaction) => async (dispatch) => {
    console.log("addTransaction is called");
    try {
        const res = await axios.post('/transaction', transaction);
        dispatch({ type: ADD_CASH_TRANSACTION, transaction: res.data });
    } catch (e) {
        console.log(e);
    }
}

exports.deleteTransaction = (id) => async (dispatch) => {
    console.log("deleteTransaction is called");
    try {
        await axios.delete('/transaction/:id');
        dispatch({ type: DELETE_CASH_TRANSACTION, id });
    } catch (e) {
        console.log(e);
    }
}

exports.getAllTransactions = () => async (dispatch) => {
    console.log("getAllTransactions is called");
    try {
        const res = await axios.get('/transactions');
        dispatch({ type: GET_CASH_TRANSACTIONS, transaction: res.data });
    } catch (e) {
        console.log(e);
    }
}

exports.updateTransaction = (updates) => async (dispatch) => {
    console.log("updateTransaction is called");
    try {
        const res = await axios.patch('/transaction/:id', updates);
        dispatch({ type: UPDATE_CASH_TRANSACTION, updates });
    } catch (e) {
        console.log(e);
    }
}