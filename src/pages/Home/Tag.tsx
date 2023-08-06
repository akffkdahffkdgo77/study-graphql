import { useRef, useState } from 'react';

import Modal from 'components/Modal';

import { PlusSmallIcon } from '@heroicons/react/24/outline';

export default function Tag() {
    const [tags, setTags] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleTag = () => {
        if (inputRef.current) {
            const newValue = inputRef.current.value;
            setTags((prev) => [...prev, newValue || '']);
            inputRef.current.value = '';
        }
    };

    return (
        <Modal>
            <form onSubmit={(e) => e.preventDefault()} className="border-900 mb-7 mt-2.5 w-full max-w-[300px] overflow-hidden rounded-md border" autoComplete="off">
                <label className="ml-2.5 flex items-center gap-2.5" htmlFor="tag">
                    <span className="ml-[2px] flex h-[20px] w-[20px] animate-pulse items-center justify-center rounded-full border-[1.5px] border-pink-500 text-[8px] font-bold text-pink-500">#</span>
                    <input id="tag" type="text" ref={inputRef} className="flex-1 rounded-md p-2.5 text-xs font-medium outline-none dark:bg-slate-900 dark:text-slate-50" />
                    <button className="mr-2.5 rounded-md bg-slate-900 p-1 text-xs font-bold text-slate-50 dark:bg-slate-50 dark:text-slate-900" type="button" onClick={handleTag}>
                        <PlusSmallIcon className="h-3 w-3" />
                    </button>
                </label>
                {Boolean(tags.length) && (
                    <div className="m-2.5 flex items-center gap-2.5">
                        {tags.map((tag) => (
                            <span key={tag} className="rounded-md bg-slate-900 px-2.5 py-1 text-xs text-white dark:border dark:border-slate-900 dark:bg-slate-300 dark:text-slate-900">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </form>
        </Modal>
    );
}
