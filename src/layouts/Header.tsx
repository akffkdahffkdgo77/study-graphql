import { useBoundStore } from 'lib/zustand/store';

import useMode from './useMode';

import { MoonIcon, PlusCircleIcon, SunIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [isLightMode, setIsLightMode] = useMode();
    const openUpload = useBoundStore((state) => state.openUpload);

    return (
        <header className="sticky top-0 z-[9999] flex w-full items-center justify-between border-b border-slate-300 bg-slate-100 px-5 py-2.5 dark:bg-slate-900 dark:text-slate-50">
            <h1 className="text-base font-bold">TodoList</h1>
            <div className="flex items-center justify-center gap-2.5">
                <button type="button" onClick={() => openUpload()}>
                    <PlusCircleIcon className="h-8 w-8" />
                </button>
                <button type="button" className="rounded-full border border-black bg-slate-900 p-0.5 dark:bg-slate-50" onClick={(e) => setIsLightMode((prev) => !prev)}>
                    {isLightMode ? <MoonIcon className="h-5 w-5 text-slate-50" /> : <SunIcon className="h-6 w-6 text-slate-900" />}
                </button>
            </div>
        </header>
    );
}
