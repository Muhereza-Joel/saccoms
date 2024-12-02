import React from 'react';

const AlertSuccess = ({ success, className = '', ...props }) => {
    if (!success) return null; // Render nothing if there's no success message

    return (
        <div
            className={`bg-green-50 border border-green-300 text-green-800 px-4 py-3 m-2 rounded relative flex items-center shadow-md ${className}`}
            role="alert"
            {...props}
        >
            {/* Icon for Visual Indication */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
            </svg>

            {/* Success Message */}
            <span className="block sm:inline">{success}</span>
        </div>
    );
};

export default AlertSuccess;
