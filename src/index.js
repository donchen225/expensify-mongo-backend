import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'regenerator-runtime/runtime';
import "core-js/stable"; // or more selective import, like "core-js/es/array";

const store = configureStore(); 

const jsx = (
    <React.StrictMode>
        <Provider store={store}> {/* <Provider> makes Redux store available to any nested components that need access to Redux store} */}
            <AppRouter />
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(jsx, document.getElementById('app'));  