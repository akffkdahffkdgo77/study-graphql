import { gql, useQuery } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTodos($options: PageQueryOptions) {
        todoList(options: $options) {
            data {
                id
                title
                description
                image
                tag
            }
            totalCount
        }
    }
`;

export type DataType = {
    todoList: {
        data: {
            id: number;
            title: string;
            description: string;
            image: string;
            isCompleted: boolean;
            tag: string;
        }[];
        totalCount: number;
    };
};

const useGetTodos = () => {
    return useQuery<DataType>(GET_TODOS);
};

export default useGetTodos;
