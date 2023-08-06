import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'app/App';
import ErrorBoundary from 'layouts/ErrorBoundary';

import { ApolloProvider } from '@apollo/client';
import client from 'lib/graphql/client';
import { worker } from 'mocks/browser';

import 'styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (process.env.NODE_ENV === 'development') {
    worker.start();
}

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
