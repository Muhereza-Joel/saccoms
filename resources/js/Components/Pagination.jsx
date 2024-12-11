import React from "react";

const Pagination = ({ links }) => {
    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center space-x-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <button
                            className={`px-2 py-1 rounded-lg
                                ${link.active 
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            } 
                                dark:hover:bg-gray-600 hover:bg-gray-300 transition-all`}
                            onClick={() => { if (link.url) window.location.href = link.url; }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
