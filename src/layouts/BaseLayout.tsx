import { Outlet } from 'react-router-dom';

import Header from './Header';

export default function BaseLayout() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center dark:bg-slate-900">
            <div className="mx-auto flex h-full max-h-[700px] w-full max-w-sm flex-col items-center justify-start overflow-y-auto rounded-md border border-black font-mono dark:border-white dark:bg-slate-900 ">
                <Header />
                <main className="h-full w-full flex-1 p-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
