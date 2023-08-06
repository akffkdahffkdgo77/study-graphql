import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <h2 className="flex w-full items-center gap-1 p-2.5 text-left text-lg font-bold italic">
            <CalendarDaysIcon className="h-6 w-6 text-pink-500" />
            What is your plan?
        </h2>
    );
}
