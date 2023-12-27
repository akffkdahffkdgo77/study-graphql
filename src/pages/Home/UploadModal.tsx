import Modal from 'components/Modal';

import { useBoundStore } from 'lib/zustand/store';
import { useCreateTodo } from 'models/todos';

import Header from './Header';
import RequiredInfo from './Todo';

export default function UploadModal() {
    const [createTodo] = useCreateTodo();

    const close = useBoundStore((state) => state.close);

    const handleSubmit = ({ todo, preview }: { todo: string; preview: string }) => {
        createTodo({
            variables: {
                input: {
                    title: 'GraphQL 공부하기',
                    description: todo,
                    image: preview,
                    tag: 'GraphQL,Study'
                }
            }
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
