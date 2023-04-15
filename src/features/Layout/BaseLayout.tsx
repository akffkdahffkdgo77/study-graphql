import { Outlet } from 'react-router-dom';

import { useBoundStore } from 'lib/zustand/store';

import Edit from 'features/Form/Edit';
import Upload from 'features/Form/Upload';
import Header from 'features/Layout/Header';

export default function BaseLayout() {
    const { isOpen, isEditOpen } = useBoundStore((state) => ({ isOpen: state.isOpen, isEditOpen: state.isEditOpen }));

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center dark:bg-slate-900">
            <div className="w-full max-w-sm mx-auto border border-black rounded-md font-mono max-h-[700px] overflow-y-auto h-full flex items-center justify-start flex-col dark:border-white dark:bg-slate-900 ">
                <Header />
                <main className="h-full w-full flex-1 p-5">
                    <Outlet />
                    {isOpen && <Upload />}
                    {isEditOpen && <Edit />}
                </main>
            </div>
        </div>
    );
}
