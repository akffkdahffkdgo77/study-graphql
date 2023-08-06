import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { errorLink, httpLink, tokenLink } from 'lib/graphql/links';

// eslint-disable-next-line import/no-mutable-exports
let client: ApolloClient<object>;

// eslint-disable-next-line prefer-const
client = new ApolloClient({
    connectToDevTools: true,
    link: ApolloLink.from([errorLink, tokenLink, httpLink]),
    cache: new InMemoryCache() // Apollo Client uses to cache query results after fetching them
});

export default client;
