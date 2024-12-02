import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function LoanPlans({ auth, loanPlans }) {
    const [expanded, setExpanded] = useState(null);

    const toggleAccordion = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Showing All Loan Plans
                    </h2>

                    {/* Right-aligned button */}
                    <Link
                        href={route("loan-plans.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        Create Loan Plan
                    </Link>
                </div>
            }
        >
            <Head title="Loan Plans" />

            <div className="py-2 px-2">
                {/* Check if there are no loan plans */}
                {loanPlans.length === 0 ? (
                    <div className="flex justify-center items-center min-h-screen flex-col space-y-2">
                        {/* SVG for no plans */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-24 w-24 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m4 0h-1.6a9.005 9.005 0 00-8.8-6.7A7.987 7.987 0 0012 3c-3.866 0-7 3.134-7 7a7.987 7.987 0 002.4 5.3A9.005 9.005 0 003 12H2"
                            />
                        </svg>

                        {/* Message */}
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            No loan plans available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {loanPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        {/* Loan Plan Name */}
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                            {`${plan.loan_plan_name}`}
                                        </h3>

                                        {/* Action icons */}
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={route(
                                                    "loan-plans.edit",
                                                    plan.id
                                                )}
                                                className="text-blue-500 hover:text-blue-700 transition"
                                            >
                                                <FaEdit size={15} />
                                            </Link>
                                            <Link
                                                href={route(
                                                    "loan-plans.destroy",
                                                    plan.id
                                                )}
                                                method="delete"
                                                as="button"
                                                className="text-red-400 hover:text-red-700 transition"
                                            >
                                                <FaTrash size={15} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Loan Plan Details */}
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <strong>Repayment Period:</strong>{" "}
                                            {`${plan.loan_plan_months} Months` || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            <strong>Interest Rate:</strong>{" "}
                                            {plan.loan_plan_interest_rate ||
                                                "N/A"}
                                            %
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                            <strong>Missed Payment Penalty:</strong>{" "}
                                            {`Ugx ${plan.loan_plan_penalty}` || "N/A"}
                                        </p>
                                    </div>

                                    {/* Expandable Section */}
                                    <div className="mt-4">
                                        <button
                                            onClick={() =>
                                                toggleAccordion(plan.id)
                                            }
                                            className="w-full text-left text-sm font-medium text-gray-600 dark:text-gray-300"
                                        >
                                            {expanded === plan.id
                                                ? `Hide More Details`
                                                : `Show More Details`}
                                        </button>
                                        {expanded === plan.id && (
                                            <>
                                                <hr />
                                                <div className="mt-2 text-gray-600 dark:text-gray-300">
                                                    <p>
                                                        <strong>
                                                            Additional Info:
                                                        </strong>{" "}
                                                        {plan.additional_info ||
                                                            "N/A"}
                                                    </p>
                                                </div>
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
