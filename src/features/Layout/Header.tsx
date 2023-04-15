import { MoonIcon, PlusCircleIcon, SunIcon } from '@heroicons/react/24/outline';

import { useBoundStore } from 'lib/zustand/store';

import useMode from 'hooks/useMode';

export default function Header() {
    const [isLightMode, setIsLightMode] = useMode();
    const openUpload = useBoundStore((state) => state.openUpload);

    return (
        <header className="sticky top-0 z-[9999] bg-slate-100 px-5 py-2.5 w-full border-b border-slate-300 flex items-center justify-between dark:bg-slate-900 dark:text-slate-50">
            <h1 className="font-bold text-base">TodoList</h1>
            <div className="flex justify-center items-center gap-2.5">
                <button type="button" onClick={() => openUpload()}>
                    <PlusCircleIcon className="w-8 h-8" />
                </button>
                <button type="button" className="border border-black rounded-full p-0.5 bg-slate-900 dark:bg-slate-50" onClick={(e) => setIsLightMode((prev) => !prev)}>
                    {isLightMode ? <MoonIcon className="w-5 h-5 text-slate-50" /> : <SunIcon className="w-6 h-6 text-slate-900" />}
                </button>
            </div>
        </header>
    );
}
