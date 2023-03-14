import { gql, useMutation } from '@apollo/client';

const CREATE_TODO = gql`
    mutation CreateTodo($input: TodoInput) {
        todo(input: $input) {
            id
            title
            description
            image
            isCompleted
            tag
        }
    }
`;

type DataType = {
    todo: {
        id: string;
        title: string;
        description: string;
        image: string;
        isCompleted: boolean;
        tag: string;
    };
};

type VariablesType = {
    input: {
        title: string;
        description: string;
        image: string;
        tag: string;
    };
};

const useCreateTodo = () => {
    const result = useMutation<DataType, VariablesType>(CREATE_TODO, {
        update(cache, { data }) {
            cache.modify({
                fields: {
                    todoList(existingTodos = []) {
                        const newTodoRef = cache.writeFragment({
                            data: data?.todo,
                            fragment: gql`
                                fragment NewTodo on Todo {
                                    id
                                    title
                                    description
                                    image
                                    isCompleted
                                    tag
                                }
                            `
                        });

                        return {
                            ...existingTodos,
                            ...{
                                data: [...existingTodos.data, newTodoRef]
                            }
                        };
                    }
                }
            });
        }
    });

    return result;
};

export default useCreateTodo;
