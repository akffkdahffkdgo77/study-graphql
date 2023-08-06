import EmptyData from 'components/Empty';
import Loader from 'components/Loader';

import { useBoundStore } from 'lib/zustand/store';
import { useGetTodos } from 'models/todos';

import EditModal from './EditModal';
import UploadModal from './UploadModal';

import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
    const { loading, data } = useGetTodos();
    const { isOpen, isEditOpen, openEdit } = useBoundStore();

    const handleEditModal = (id: string) => {
        openEdit(id);
    };

    if (loading) return <Loader />;

    return (
        <div>
            {data?.todoList?.totalCount ? (
                <ul className="list-none">
                    {data?.todoList?.data?.map((d) => (
                        <li key={d?.id} className="mb-2.5 rounded-md border border-slate-900 bg-slate-100 p-5 text-lg dark:border-slate-50 dark:bg-slate-300">
                            <button type="button" className="h-full w-full" onClick={() => handleEditModal(d?.id)}>
                                <img width="100%" height={300} src={d.image} alt={d.title} className="rounded-md" />
                                <h2 className="mt-2.5 flex items-center gap-1 text-lg font-semibold">
                                    <button type="button">{!d.isCompleted ? <CheckCircleIcon className="h-6 w-6 text-red-600" /> : <CheckCircleIcon className="h-6 w-6 text-green-600" />}</button>
                                    {d.title}
                                </h2>
                                <p className="text-left text-sm">{d.description}</p>
                                <hr className="my-2.5 dark:border-slate-900" />
                                <div className="flex flex-wrap items-center gap-2.5">
                                    {d.tag.split(',').map((tag: string) => (
                                        <span key={tag} className="rounded-md bg-slate-900 px-2.5 py-1 text-xs text-white dark:border dark:border-slate-900 dark:bg-slate-300 dark:text-slate-900">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <EmptyData />
            )}
            {isOpen && <UploadModal />}
            {isEditOpen && <EditModal />}
        </div>
    );
}
