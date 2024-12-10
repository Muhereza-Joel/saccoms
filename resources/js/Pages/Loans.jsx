import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import Dropdown from "@/Components/Dropdown";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Loans({ auth, permissions, loans, success, error }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Showing All Loans
                    </h2>
                </div>
            }
        >
            <Head title="Loans" />

            <div className="py-2">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0">
                    <table className="w-full mt-2 text-left table-auto min-w-max">
                        <thead>
                            <tr className="text-gray-800 dark:text-gray-100">
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    SNo
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Member ID
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Member Names
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Reference Number
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Status
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Principal Amount
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Balance
                                </th>

                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan, index) => (
                                <tr
                                    key={loan.id}
                                    className="text-gray-800 dark:text-gray-100"
                                >
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {index + 1}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {loan.member.member_id}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {`${loan.member.first_name} ${loan.member.last_name}`}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {loan.reference_number}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {loan.status}
                                    </td>
                                    <td className="p-2 border-b dark:border-gray-700">
                                        {loan.principal_amount}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {loan.outstanding_balance}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
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
                                                {can("View Loan Details") && (
                                                    <Dropdown.Link
                                                        href={route(
                                                            "loans.show",
                                                            loan.id
                                                        )}
                                                    >
                                                        View Loan Details
                                                    </Dropdown.Link>
                                                )}
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
