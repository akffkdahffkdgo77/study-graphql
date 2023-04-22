import EmptyData from 'components/Empty';
import Loader from 'components/Loader';
import TodoItem from 'features/Todo/TodoItem';
import { useGetTodos } from 'models/todos';

export default function TodoList() {
    const { loading, data } = useGetTodos();

    if (loading) return <Loader />;

    return data?.todoList?.totalCount ? (
        <ul className="list-none">
            {data?.todoList?.data?.map((d) => (
                <TodoItem key={d.id} data={d} />
            ))}
        </ul>
    ) : (
        <EmptyData />
    );
}
