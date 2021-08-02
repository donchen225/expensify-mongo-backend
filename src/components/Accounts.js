import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from "./Link";
import { getTransactions, deleteAccount } from "../actions/accounts";
import MaterialTable from "material-table";
import { tableIcons } from '../fixtures/tableIcons';

const Accounts = () => {
    const dispatch = useDispatch();

    const accounts = useSelector(state => state.accounts.accounts);
    const transactionsLoading = useSelector(state => state.accounts.transactionsLoading);
    const transactions = useSelector(state => state.accounts.transactions);

    useEffect(() => {
        dispatch(getTransactions(accounts));
    }, []);

    // Delete account
    const onDeleteClick = id => {
        const accountData = {
            id: id,
            accounts: accounts
        };
        dispatch(deleteAccount(accountData));
    };

    console.log("accounts", accounts);
    console.log("transactions", transactions);

    let accountItems = accounts.map( account => (
        <li key={account._id} style={{ marginTop: "1rem" }}>
            <button
                style={{marginRight: "1rem"}}
                onClick={() => onDeleteClick(account._id)}
                className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3"
            >
                <i className="material-icons">delete</i>
            </button>
            <b>{account.institutionName}</b>
        </li>
    ));

    // Setting up data table
    const transactionsColumns = [
        { title: "Account", field: "account" },
        { title: "Date", field: "date", type: "date", defaultSort: "desc" },
        { title: "Name", field: "name" },
        { title: "Amount", field: "amount" },
        { title: "Category", field: "category" }
    ];

    let transactionsData = [];
    transactions.forEach((account) => {
        account.transactions.forEach((transaction) => {
            transactionsData.push({
                account: account.accountName,
                date: transaction.date,
                category: transaction.category[0],
                name: transaction.name,
                amount: transaction.amount
            });
        });
    });
    console.log("transactionsData", transactionsData);

    return (
        <div className="row">
            <div className="col s12">
            <h5>
                <b>Linked Accounts</b>
            </h5>
            <p className="grey-text text-darken-1">
                Add or remove your bank accounts below
            </p>
            <ul>{accountItems}</ul>
            <Link/>
            <h5>
                <b>Transactions</b>
            </h5>
            {transactionsLoading ? (
                <p className="grey-text text-darken-1">Fetching transactions...</p>
            ) : (
                <>
                    <p className="grey-text text-darken-1">
                        You have <b>{transactionsData.length}</b> transactions from your
                        <b> {accounts.length}</b> linked
                        {accounts.length > 1 ? (
                        <span> accounts </span>
                        ) : (
                        <span> account </span>
                        )}
                        from the past 30 days
                    </p>
                    <MaterialTable
                        title="Search Transactions"
                        columns={transactionsColumns}
                        data={transactionsData}
                        options={{
                            headerStyle: {
                              backgroundColor: '#01579b',
                              color: '#FFF'
                            }
                        }}
                        icons={tableIcons}
                    />
                </>
            )}
            </div>
        </div>
    )
}

export default Accounts;

