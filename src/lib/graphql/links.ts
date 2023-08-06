/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHttpLink, fromPromise, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import client from 'lib/graphql/client';

export const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
});

// References : https://www.apollographql.com/docs/react/networking/authentication/#header
export const tokenLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            accessToken
            refreshToken
        }
    }
`;

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
};

// References : https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8
// eslint-disable-next-line consistent-return
export const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        if (client && graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
            // eslint-disable-next-line no-console
            console.log('if unauthenticated');
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            let forward$;

            if (!isRefreshing) {
                isRefreshing = true;
                forward$ = fromPromise(
                    client
                        .mutate({ mutation: REFRESH_TOKEN })
                        .then(({ refreshToken }: any) => {
                            // Store the new tokens for your auth link
                            resolvePendingRequests();
                            return refreshToken;
                        })
                        .catch((error) => {
                            pendingRequests = [];
                            // Handle token refresh errors e.g clear stored tokens, redirect to login, ...
                        })
                        .finally(() => {
                            isRefreshing = false;
                        })
                ).filter((value) => Boolean(value));
            } else {
                // Will only emit once the Promise is resolved
                forward$ = fromPromise(
                    new Promise((resolve) => {
                        pendingRequests.push(() => resolve(null));
                    })
                );
            }
            return forward$.flatMap(() => forward(operation));
        }
    }

    if (networkError) {
        // eslint-disable-next-line no-console
        console.log(`[Network error]: ${networkError}`);
        // if you would also like to retry automatically on
        // network errors, we recommend that you use
        // apollo-link-retry
    }
});
