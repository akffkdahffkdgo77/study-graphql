import Modal from 'components/Modal';

import { useApolloClient } from '@apollo/client';
import { useBoundStore } from 'lib/zustand/store';
import { GET_TODOS, TodoItemType } from 'models/todos/useGetTodos';

import Header from './Header';
import RequiredInfo from './Todo';

export default function EditModal() {
    const client = useApolloClient();
    const id = useBoundStore((state) => state.editableData);
    const close = useBoundStore((state) => state.close);

    const handleSubmit = ({ todo, preview }: { todo: string; preview: string }) => {
        client.cache.updateQuery({ query: GET_TODOS }, (d) => {
            return {
                todoList: {
                    data: d.todoList.data.map((cachedTodo: TodoItemType) => {
                        if (cachedTodo.id === id) {
                            return { ...cachedTodo, description: todo, image: preview };
                        }
                        return cachedTodo;
                    }),
                    totalCount: d.todoList.totalCount
                }
            };
        });
        close();
    };

    return (
        <Modal>
            <Header />
            <hr className="mb-7 w-full border border-slate-100 dark:border-slate-300" />
            <RequiredInfo onSubmit={handleSubmit} />
        </Modal>
    );
}
