import React, { useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { useBoundStore } from 'lib/zustand/store';
import { GET_TODOS, TodoItemType } from 'models/todos/useGetTodos';

import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

type TodoType = {
    onSubmit: ({ todo, preview }: { todo: string; preview: string }) => void;
};

export default function Todo({ onSubmit }: TodoType) {
    const client = useApolloClient();
    const id = useBoundStore((state) => state.editableData);

    const [todo, setTodo] = useState('');
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (id) {
            const { todoList } = client.readQuery({ query: GET_TODOS });
            const cachedTodo = todoList.data.filter((d: TodoItemType) => d.id === id)[0];
            setTodo(cachedTodo?.description);
            setPreview(cachedTodo?.image);
        }
    }, [id, client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const [file] = e.currentTarget.files;
            const reader = new FileReader();
            reader.onloadend = function onLoadEnd() {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ todo, preview });
    };

    return (
        <form autoComplete="off" onSubmit={handleSubmit} className="border-900 mb-7 w-full max-w-[300px] overflow-hidden rounded-md border">
            <label className="flex h-[300px] w-full items-center justify-center border-b border-dashed border-slate-300" htmlFor="file">
                {preview ? (
                    <img width="100%" height="100%" src={preview} alt="todo preview" className="h-full" />
                ) : (
                    <>
                        <PlusIcon className="h-10 w-10" />
                        <input hidden id="file" type="file" accept="image/*" onChange={handleChange} />
                    </>
                )}
            </label>
            <label className="ml-2.5 flex items-center gap-2.5" htmlFor="todo">
                <CheckCircleIcon className="h-6 w-6 animate-pulse text-pink-500" />
                <input
                    id="todo"
                    type="text"
                    required
                    value={todo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.currentTarget.value)}
                    className="flex-1 p-2.5 text-xs font-medium outline-none dark:bg-slate-900 dark:text-slate-50"
                />
            </label>
        </form>
    );
}
