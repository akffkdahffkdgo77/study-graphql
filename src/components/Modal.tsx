import { createPortal } from 'react-dom';

type ModalType = {
    children: React.ReactNode;
};

export default function Modal({ children }: ModalType) {
    return createPortal(
        <div role="dialog" aria-modal="true" className="fixed bottom-0 left-0 right-0 top-0 z-[10000] flex items-center justify-center bg-black/50">
            <div className="flex max-h-full min-h-[250px] w-full max-w-[360px] flex-col items-center justify-start rounded-md bg-white dark:bg-slate-900 dark:text-slate-50">{children}</div>
        </div>,
        document.getElementById('root') as Element
    );
}
