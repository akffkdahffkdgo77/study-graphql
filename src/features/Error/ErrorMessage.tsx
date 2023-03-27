import BugImage from 'assets/images/bug.png';

import type { ErrorMessageProps } from 'features/Error/ErrorMessage.types';

export default function ErrorMessage({ error }: ErrorMessageProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="bg-slate-300 flex items-center justify-center flex-col rounded-md p-5">
                <img className="rounded-md mb-2.5" width={768} height="100%" src={BugImage} alt="bug fixing" />
                <p className="text-2xl font-bold">일시적인 문제가 발생하였습니다.</p>
                <p className="text-base font-medium mb-5">{error?.message}</p>
                <button className="w-[250px] rounded-md font-bold text-slate-50 p-2.5 bg-slate-900" type="button" onClick={() => window.location.reload()}>
                    이전 페이지로 돌아가기
                </button>
            </div>
        </div>
    );
}
