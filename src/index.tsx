import React from 'react';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import App from 'app';
import { worker } from 'mocks/browser';
import reportWebVitals from 'reportWebVitals';

import 'index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache() // Apollo Client uses to cache query results after fetching them
});

if (process.env.NODE_ENV === 'development') {
    worker.start();
}

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
