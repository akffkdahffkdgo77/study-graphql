import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql(`
    query GetTodos($options: PageQueryOptions) {
        todos(options: $options) {
            data {
                id
                title
                description
            }
            meta {
                totalCount
            }
        }
    }
`);

const useGetTodos = () => {
    const result = useQuery(GET_TODOS);

    return result;
};

export default useGetTodos;
