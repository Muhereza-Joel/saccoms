import Dropdown from "@/Components/Dropdown";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Transaction({ auth, permissions, transactions }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Sacco Transactions
                </h2>
            }
        >
            <Head title="All Sacco Transactions" />

            <div className="py-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0">
                    <table className="w-full mt-4 mx-2 text-left table-auto min-w-max border-collapse border border-blue-gray-200 dark:border-gray-700">
                        <thead>
                            <tr className="bg-blue-gray-50/50 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    SNo
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Transaction ID
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Member
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Transaction Type
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Transaction Amount
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Transaction Date
                                </th>
                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Status
                                </th>

                                <th className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr
                                    key={transaction.id}
                                    className={`text-gray-800 dark:text-gray-100 ${
                                        index % 2 === 0
                                            ? "bg-white dark:bg-gray-900"
                                            : "bg-blue-gray-50/50 dark:bg-gray-800"
                                    }`}
                                >
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        {index + 1}
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        {transaction.reference_number}{" "}
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        <div className="flex flex-col">
                                            <span>
                                                {transaction.member.first_name}{" "}
                                                {transaction.member.last_name}
                                            </span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {
                                                    transaction.member
                                                        .phone_number
                                                }
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        {transaction.transaction_type}
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        Ugx{" "}
                                        {transaction.amount.toLocaleString()}
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        {new Date(
                                            transaction.transaction_date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border border-blue-gray-200 dark:border-gray-700">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                transaction.status ===
                                                "Completed"
                                                    ? "bg-green-500 text-white"
                                                    : transaction.status ===
                                                      "Failed"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-yellow-500 text-white"
                                            }`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>

                                    <td className="p-3 border-b dark:border-gray-700">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                                >
                                                    Select Action
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
                                                    href={route(
                                                        "transactions.show",
                                                        transaction.id
                                                    )}
                                                >
                                                    View Transaction Details
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
