import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <h2 className="font-bold text-lg text-left w-full p-2.5 italic flex items-center gap-1">
            <CalendarDaysIcon className="w-6 h-6 text-pink-500" />
            What is your plan?
        </h2>
    );
}
