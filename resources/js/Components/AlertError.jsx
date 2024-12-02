import React from "react";

const AlertError = ({ error, className = "", ...props }) => {
    if (!error) return null; // Render nothing if there's no error message

    return (
        <div
            className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 m-2 rounded relative flex items-center"
            role="alert"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                />
            </svg>
            <span className="block sm:inline">{error}</span>
        </div>
    );
};

export default AlertError;
