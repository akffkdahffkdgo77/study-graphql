import BugImage from 'assets/images/bug.png';

type ErrorMessageType = {
    error: Error | null;
};

export default function ErrorMessage({ error }: ErrorMessageType) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="flex flex-col items-center justify-center rounded-md bg-slate-300 p-5">
                <img className="mb-2.5 rounded-md" width={768} height="100%" src={BugImage} alt="bug fixing" />
                <p className="text-2xl font-bold">일시적인 문제가 발생하였습니다.</p>
                <p className="mb-5 text-base font-medium">{error?.message}</p>
                <button className="w-[250px] rounded-md bg-slate-900 p-2.5 font-bold text-slate-50" type="button" onClick={() => window.location.reload()}>
                    이전 페이지로 돌아가기
                </button>
            </div>
        </div>
    );
}
