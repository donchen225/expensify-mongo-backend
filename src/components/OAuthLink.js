import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { usePlaidLink } from "react-plaid-link";
import { addAccount } from '../actions/accounts';

const OAuthLink = () => { 
    const dispatch = useDispatch();

    const linkToken = localStorage.getItem('link_token');
    const accounts = useSelector(state => state.accounts);

    // Add account
    const onSuccess = useCallback((public_token, metadata) => {
        console.log("handleOnSuccess is called");
        const plaidData = {
            public_token,
            metadata,
            accounts
        }
        dispatch(addAccount(plaidData)); 
    }, []);

    const config = {
        token: linkToken,
        receivedRedirectUri: window.location.href,
        onSuccess
    };

    const { open, ready, error } = usePlaidLink(config);

    // automatically re-initialize Link
    useEffect(() => { // Calling open will display the Consent Pane view to your user, starting the Link flow.
        console.log("automatically re-initialize Link")
        if (ready) {
            open();
        }
    }, [ready, open]);

    return ( 
        <></>
    )
}

export default OAuthLink;