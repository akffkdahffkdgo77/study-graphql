import { CheckCircleIcon, PencilIcon, StopCircleIcon } from '@heroicons/react/24/outline';

import { useBoundStore } from 'lib/zustand/store';

import { TodoItemType } from 'models/todos/useGetTodos';

export default function TodoItem({ data }: { data: TodoItemType }) {
    const openEdit = useBoundStore((state) => state.openEdit);

    const handleEditModal = (id: string) => {
        openEdit(id);
    };

    return (
        <li key={data?.id} className="relative text-lg border bg-slate-100 border-slate-900 rounded-md p-5 mb-2.5 dark:border-slate-50 dark:bg-slate-300">
            <button type="button" className="absolute top-[5px] right-[5px]" onClick={() => handleEditModal(data?.id)}>
                <PencilIcon className="w-3 h-3" />
            </button>
            <img width="100%" height={300} src={data.image} alt={data.title} className="rounded-md" />
            <h2 className="font-semibold text-lg mt-2.5 flex items-center gap-1">
                <button type="button">{!data.isCompleted ? <StopCircleIcon className="w-6 h-6 text-red-600" /> : <CheckCircleIcon className="w-6 h-6 text-green-600" />}</button>
                {data.title}
            </h2>
            <p className="text-sm">{data.description}</p>
            <hr className="my-2.5 dark:border-slate-900" />
            <div className="flex flex-wrap items-center gap-2.5">
                {data.tag.split(',').map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs dark:bg-slate-300 dark:border-slate-900 dark:border dark:text-slate-900">
                        #{tag}
                    </span>
                ))}
            </div>
        </li>
    );
}
