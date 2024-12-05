import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import { useState } from "react";
import { usePermission } from "@/Hooks/usePermissions";

export default function LoanTypes({ auth, loanTypes, permissions }) {
    // Set the first loan's ID as the default expanded card, or null if no loans exist
    const [expanded, setExpanded] = useState(
        loanTypes.length > 0 ? loanTypes[0].id : null
    );
    const { can } = usePermission(permissions);

    const toggleAccordion = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Showing All Loan Types
                    </h2>

                    {/* Right-aligned button */}
                    {can("Create Loan Type") && (
                        <Link
                            href={route("loan-types.create")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Create Loan Type
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Loan Types" />

            <div className="p-2">
                {/* Check if there are loan types, otherwise show SVG */}
                {loanTypes.length === 0 ? (
                    <div className="flex justify-center items-center flex-col space-y-4">
                        {/* SVG for no loan types */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-24 w-24 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m4 0h-1.6a9.005 9.005 0 00-8.8-6.7A7.987 7.987 0 0012 3c-3.866 0-7 3.134-7 7a7.987 7.987 0 002.4 5.3A9.005 9.005 0 003 12H2"
                            />
                        </svg>
                        {/* Message */}
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            No loan types available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-2">
                        {loanTypes.map((loan) => (
                            <div
                                key={loan.id}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        {/* Loan type name */}
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                            {loan.loan_type_name}
                                        </h3>

                                        {/* Action icons */}
                                        <div className="flex items-center space-x-2">
                                            {can("Update Loan Type") && (
                                                <Link
                                                    href={route(
                                                        "loan-types.edit",
                                                        loan.id
                                                    )}
                                                    className="text-blue-500 hover:text-blue-700 transition"
                                                >
                                                    <FaEdit size={15} />
                                                </Link>
                                            )}

                                            {can("Delete Loan Type") && (
                                                <Link
                                                    href={route(
                                                        "loan-types.destroy",
                                                        loan.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-400 hover:text-red-700 transition"
                                                >
                                                    <FaTrash size={15} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Accordion for description */}
                                    <div className="mt-4">
                                        <button
                                            onClick={() =>
                                                toggleAccordion(loan.id)
                                            }
                                            className="w-full text-left text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center space-x-2"
                                        >
                                            {/* SVG Icon for expanding/contracting */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-600 dark:text-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d={
                                                        expanded === loan.id
                                                            ? "M19 9l-7 7-7-7"
                                                            : "M5 15l7-7 7 7"
                                                    }
                                                />
                                            </svg>

                                            <span>
                                                {expanded === loan.id
                                                    ? `Hide ${loan.loan_type_name} Details`
                                                    : `Show ${loan.loan_type_name} Details`}
                                            </span>
                                        </button>
                                        {expanded === loan.id && (
                                            <>
                                                <hr />
                                                <div
                                                    className="mt-2 text-gray-600 dark:text-gray-300"
                                                    dangerouslySetInnerHTML={{
                                                        __html: loan.loan_type_description,
                                                    }}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
