import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import ThemeToggleButton from "@/Components/ThemeToggleButton";
import {
    FaTachometerAlt,
    FaUsers,
    FaWallet,
    FaMoneyBill,
    FaExchangeAlt,
    FaTicketAlt,
    FaClipboardList,
    FaCogs,
    FaHandHoldingUsd,
    FaFileInvoiceDollar,
    FaUserShield,
    FaLifeRing,
    FaPiggyBank,
    FaChartPie,
    FaBriefcase,
} from "react-icons/fa";
import { usePermission } from "@/Hooks/usePermissions";

export default function Authenticated({
    user,
    header,
    children,
    permissions = [],
}) {
    const { can } = usePermission(permissions);
    const [showLeftPane, setShowLeftPane] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Left Pane */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-900 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 z-50 w-64 overflow-y-auto p-4 transition-transform transform ${
                    showLeftPane ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
            >
                <div className="font-bold text-center text-gray-800 dark:text-gray-200 z-50">
                    <Link href="/" className="text-white">
                        Sacco Management System
                    </Link>
                </div>

                <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                <small className="text-gray-200 dark:text-gray-300">
                    General Section
                </small>
                <ul className="mt-4 space-y-2 text-lg">
                    <li>
                        <NavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                        >
                            <FaTachometerAlt className="mr-3 text-xl" />
                            Dashboard
                        </NavLink>
                    </li>

                    {can("View Financial Years") && (
                        <li>
                            <NavLink
                                href={route("financial-years.index")}
                                active={route().current(
                                    "financial-years.index"
                                )}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaWallet className="mr-3 text-xl" />
                                Financial Years
                            </NavLink>
                        </li>
                    )}

                    {can("View Members") && (
                        <li>
                            <NavLink
                                href={route("members.index")}
                                active={route().current("members.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaUsers className="mr-3 text-xl" />
                                Sacco Members
                            </NavLink>
                        </li>
                    )}

                    {can("View Accounts") && (
                        <li>
                            <NavLink
                                href={route("accounts.index")}
                                active={route().current("accounts.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaWallet className="mr-3 text-xl" />
                                Member Accounts
                            </NavLink>
                        </li>
                    )}

                    {can("View Transactions") && (
                        <li>
                            <NavLink
                                href={route("transactions.index")}
                                active={route().current("transactions.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaExchangeAlt className="mr-3 text-xl" />
                                Member Transactions
                            </NavLink>
                        </li>
                    )}

                    {can("View My Transactions") && (
                        <li>
                            <NavLink
                                href={route("myTransactions")}
                                active={route().current("myTransactions")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaExchangeAlt className="mr-3 text-xl" />
                                My Transactions
                            </NavLink>
                        </li>
                    )}

                    {can("Create Role") && (
                        <li>
                            <NavLink
                                href={route("roles.index")}
                                active={route().current("roles.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaUserShield className="mr-3 text-xl" />
                                Manage Roles
                            </NavLink>
                        </li>
                    )}

                    {can("Create Role") && (
                        <li>
                            <NavLink
                                href={route("assign-permissions")}
                                active={route().current("assign-permissions")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaCogs className="mr-3 text-xl" />
                                Assign Permissions
                            </NavLink>
                        </li>
                    )}

                    {can("View Users") && (
                        <li>
                            <NavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaBriefcase className="mr-3 text-xl" />
                                Manage Users
                            </NavLink>
                        </li>
                    )}

                    {can("View Loans") && (
                        <>
                            <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                            <small className="text-gray-200 dark:text-gray-300">
                                Loans Section
                            </small>
                        </>
                    )}
                    {can("Create Loan Plan") && (
                        <li>
                            <NavLink
                                href={route("loan-plans.index")}
                                active={route().current("loan-plans.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaHandHoldingUsd className="mr-3 text-xl" />
                                Loans Plans
                            </NavLink>
                        </li>
                    )}

                    {can("Create Loan Type") && (
                        <li>
                            <NavLink
                                href={route("loan-types.index")}
                                active={route().current("loan-types.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaChartPie className="mr-3 text-xl" />
                                Loans Types
                            </NavLink>
                        </li>
                    )}

                    {can("View Loans") && (
                        <li>
                            <NavLink
                                href={route("loans.index")}
                                active={route().current("loans.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaMoneyBill className="mr-3 text-xl" />
                                Loans
                            </NavLink>
                        </li>
                    )}

                    {can("View My Loans") && (
                        <li>
                            <NavLink
                                href={route("myLoans")}
                                active={route().current("myLoans")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaMoneyBill className="mr-3 text-xl" />
                                My Loans
                            </NavLink>
                        </li>
                    )}

                    <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />
                    <small className="text-gray-200 dark:text-gray-300">
                        Support Section
                    </small>

                    {can("Create Support Ticket") && (
                        <li>
                            <NavLink
                                href={route("tickets.index")}
                                active={route().current("tickets.index")}
                                className="flex items-center w-full px-4 py-4 rounded-md text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-0"
                            >
                                <FaLifeRing className="mr-3 text-xl" />
                                Support Tickets
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>

            {/* Mobile Overlay */}
            {showLeftPane && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                    onClick={() => setShowLeftPane(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 ml-0 sm:ml-64">
                <nav className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() =>
                                        setShowLeftPane(!showLeftPane)
                                    }
                                    className="sm:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none transition duration-150"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <ApplicationLogo className="block h-9 w-auto text-white fill-current text-gray-800 dark:text-gray-200" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-base w-fit sm:w-80 focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-200"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <ThemeToggleButton />
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}
                                            <svg
                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
