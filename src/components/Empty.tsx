import { NoImage } from 'assets/icons';

export default function EmptyData() {
    return (
        <div className="flex items-center justify-center gap-2.5 flex-col min-h-[600px] min-w-[300px]">
            <div className="dark:bg-slate-300 p-5 rounded-md">
                <NoImage className="w-[250px] h-[250px] dark:bg-slate-900 mb-2.5 rounded-md" />
                <h2 className="dark:text-slate-900 text-slate-50 text-center text-sm font-bold">No Data</h2>
            </div>
        </div>
    );
}
