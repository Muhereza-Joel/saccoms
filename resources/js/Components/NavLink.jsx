import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, count, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 pb-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-l-2 border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 focus:border-indigo-700 ' // Border on the left without radius
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            {children}
            {/* Display count if exists */}
            {count && (
                <span className="ml-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    {count}
                </span>
            )}
        </Link>
    );
}
