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

export type TodoItemType = {
    id: string;
    title: string;
    description: string;
    image: string;
    isCompleted: boolean;
    tag: string;
};

export type DataType = {
    todoList: {
        data: TodoItemType[];
        totalCount: number;
    };
};

const useGetTodos = () => {
    return useQuery<DataType>(GET_TODOS);
};

export default useGetTodos;
