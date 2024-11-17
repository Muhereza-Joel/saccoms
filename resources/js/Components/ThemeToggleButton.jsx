import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing icons from react-icons

const ThemeToggleButton = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center p-2 ms-4 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <>
                    <span className="mr-2">Light</span>
                    <FaMoon
                        size={20}
                        className="text-gray-900 dark:text-gray-100"
                    />
                </>
            ) : (
                <>
                    <span className="mr-2">Dark</span>
                    <FaSun size={20} className="text-yellow-500" />
                </>
            )}
        </button>
    );
};

export default ThemeToggleButton;
