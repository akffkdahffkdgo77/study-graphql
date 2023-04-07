import React from 'react';

import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: React.ReactNode }) {
    return createPortal(
        <div role="dialog" aria-modal="true" className="fixed top-0 right-0 left-0 bottom-0 [background:rgba(0,0,0,0.5)] z-[10000] flex items-center justify-center">
            <div className="rounded-md bg-white dark:bg-slate-900 dark:text-slate-50 min-h-[250px] max-h-full max-w-[360px] w-full flex items-center justify-start flex-col">{children}</div>
        </div>,
        document.getElementById('root') as Element
    );
}
