import { useEffect, useRef, useState } from 'react';

import { CalendarDaysIcon, CheckCircleIcon, MoonIcon, PencilIcon, PlusCircleIcon, PlusIcon, PlusSmallIcon, StopCircleIcon, SunIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

import { NoImage } from 'assets/icons';
import { useCreateTodo, useGetTodos } from 'models/todos';

export default function Home() {
    const { loading, error, data } = useGetTodos();
    const [createTodo] = useCreateTodo();

    const [isOpen, setIsOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(localStorage.theme === 'light');

    const [todo, setTodo] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tags, setTags] = useState<string[]>([]);

    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (isLightMode) {
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        }
    }, [isLightMode]);

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

    const handleTag = () => {
        if (inputRef.current) {
            const newValue = inputRef.current.value;
            setTags((prev) => [...prev, newValue || '']);
            inputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTodo({
            variables: {
                input: {
                    title: 'GraphQL 공부하기',
                    description: todo,
                    image: preview,
                    tag: tags.join(',')
                }
            }
        });
        setIsOpen(false);
        setTodo('');
        setPreview('');
        setTags([]);
    };

    if (loading)
        return (
            <div className="font-mono min-h-screen max-w-full flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="font-mono min-h-screen max-w-full flex items-center justify-center">
                <p>Error : {error.message}</p>
            </div>
        );

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center dark:bg-slate-900">
            <div className="max-w-sm mx-auto border border-black rounded-md font-mono max-h-[700px] overflow-y-auto h-full flex items-center justify-start flex-col dark:border-white dark:bg-slate-900">
                <header className="sticky top-0 bg-slate-100 px-5 py-2.5 w-full border-b border-slate-300 flex items-center justify-between dark:bg-slate-900 dark:text-slate-50">
                    <h1 className="font-bold text-base">TodoList</h1>
                    <div className="flex justify-center items-center gap-2.5">
                        <button type="button" onClick={() => setIsOpen(true)}>
                            <PlusCircleIcon className="w-8 h-8" />
                        </button>
                        <button type="button" className="border border-black rounded-full p-0.5 bg-slate-900 dark:bg-slate-50" onClick={(e) => setIsLightMode((prev) => !prev)}>
                            {isLightMode ? <MoonIcon className="w-5 h-5 text-slate-50" /> : <SunIcon className="w-6 h-6 text-slate-900" />}
                        </button>
                    </div>
                </header>
                <main className="h-full w-full flex-1 p-5">
                    {isOpen &&
                        createPortal(
                            <div role="dialog" aria-modal="true" className="fixed top-0 right-0 left-0 bottom-0 [background:rgba(0,0,0,0.5)] flex items-center justify-center">
                                <div className="rounded-md bg-white dark:bg-slate-900 dark:text-slate-50 min-h-[500px] max-w-[360px] w-full flex items-center justify-start flex-col">
                                    <h2 className="font-bold text-lg text-left w-full p-2.5 italic flex items-center gap-1">
                                        <CalendarDaysIcon className="w-6 h-6 text-pink-500" />
                                        What is your plan?
                                    </h2>
                                    <hr className="border border-slate-100 dark:border-slate-300 mb-7 w-full" />
                                    <form onSubmit={handleSubmit} className="w-full overflow-hidden border border-900 rounded-md max-w-[300px]" autoComplete="off" noValidate>
                                        <label className="w-full h-[300px] flex items-center justify-center border-b border-dashed border-slate-300" htmlFor="file">
                                            {preview ? (
                                                <img width="100%" height="100%" src={preview} alt="todo preview" className="h-full" />
                                            ) : (
                                                <>
                                                    <PlusIcon className="w-10 h-10" />
                                                    <input hidden id="file" type="file" accept="image/*" onChange={handleChange} />
                                                </>
                                            )}
                                        </label>
                                        <label className="flex items-center gap-2.5 ml-2.5" htmlFor="todo">
                                            <CheckCircleIcon className="animate-pulse w-6 h-6 text-pink-500" />
                                            <input
                                                id="todo"
                                                type="text"
                                                required
                                                value={todo}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodo(e.currentTarget.value)}
                                                className="flex-1 outline-none p-2.5 font-medium text-xs dark:bg-slate-900 dark:text-slate-50"
                                            />
                                        </label>
                                    </form>
                                    <form onSubmit={(e) => e.preventDefault()} className="mt-2.5 mb-7 w-full overflow-hidden border border-900 rounded-md max-w-[300px]" autoComplete="off">
                                        <label className="flex items-center gap-2.5 ml-2.5" htmlFor="tag">
                                            <span className="text-[8px] ml-[2px] font-bold border-[1.5px] rounded-full flex items-center justify-center border-pink-500 text-pink-500 w-[20px] h-[20px] animate-pulse">
                                                #
                                            </span>
                                            <input id="tag" type="text" ref={inputRef} className="flex-1 outline-none rounded-md font-medium p-2.5 text-xs dark:bg-slate-900 dark:text-slate-50" />
                                            <button
                                                className="p-1 text-xs rounded-md mr-2.5 bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 font-bold"
                                                type="button"
                                                onClick={handleTag}
                                            >
                                                <PlusSmallIcon className="w-3 h-3" />
                                            </button>
                                        </label>
                                        {Boolean(todo.length) && Boolean(tags.length) && (
                                            <div className="flex items-center gap-2.5 m-2.5">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs dark:bg-slate-300 dark:border-slate-900 dark:border dark:text-slate-900"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>,
                            document.getElementById('root') as Element
                        )}
                    {data?.todoList?.totalCount ? (
                        <ul className="list-none">
                            {data?.todoList?.data?.map((d) => (
                                <li key={d?.id} className="relative text-lg border bg-slate-100 border-slate-900 rounded-md p-5 mb-2.5 dark:border-slate-50 dark:bg-slate-300">
                                    <button type="button" className="absolute top-[5px] right-[5px]">
                                        <PencilIcon className="w-3 h-3" />
                                    </button>
                                    <img width="100%" height={300} src={d.image} alt={d.title} className="rounded-md" />
                                    <h2 className="font-semibold text-lg mt-2.5 flex items-center gap-1">
                                        <button type="button">{!d.isCompleted ? <StopCircleIcon className="w-6 h-6 text-red-600" /> : <CheckCircleIcon className="w-6 h-6 text-green-600" />}</button>
                                        {d.title}
                                    </h2>
                                    <p className="text-sm">{d.description}</p>
                                    <hr className="my-2.5 dark:border-slate-900" />
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        {d.tag.split(',').map((tag: string) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs dark:bg-slate-300 dark:border-slate-900 dark:border dark:text-slate-900">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex items-center justify-center gap-2.5 flex-col min-h-[600px] min-w-[300px]">
                            <div className="dark:bg-slate-300 p-5 rounded-md">
                                <NoImage className="w-[250px] h-[250px] dark:bg-slate-900 mb-2.5 rounded-md" />
                                <h2 className="dark:text-slate-900 text-slate-50 text-center text-sm font-bold">No Data</h2>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
