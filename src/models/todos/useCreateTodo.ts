import { gql, useMutation } from '@apollo/client';

const CREATE_TODO = gql`
    mutation CreateTodo($input: TodoInput) {
        todo(input: $input) {
            id
            todo
            image
        }
    }
`;

type DataType = {
    todo: {
        id: number;
        todo: string;
        image: string;
    };
};

type VariablesType = {
    input: {
        todo: string;
        image: string;
    };
};

const useCreateTodo = () => {
    const result = useMutation<DataType, VariablesType>(CREATE_TODO, {
        onCompleted({ todo }) {
            const todoList = JSON.parse(localStorage.getItem('todo') || '[]');
            const newList = [...todoList, todo];
            localStorage.setItem('todo', JSON.stringify(newList));
        }
    });

    return result;
};

export default useCreateTodo;
