import { NoImage } from 'assets/icons';

export default function EmptyData() {
    return (
        <div className="flex min-h-[600px] min-w-[300px] flex-col items-center justify-center gap-2.5">
            <div className="rounded-md p-5 dark:bg-slate-300">
                <NoImage className="mb-2.5 h-[250px] w-[250px] rounded-md dark:bg-slate-900" />
                <h2 className="text-center text-sm font-bold text-slate-50 dark:text-slate-900">No Data</h2>
            </div>
        </div>
    );
}
