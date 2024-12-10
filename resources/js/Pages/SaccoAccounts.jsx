import Dropdown from "@/Components/Dropdown";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, accounts, permissions }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Sacco Accounts
                </h2>
            }
        >
            <Head title="Sacco Accounts" />

            <div className="py-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0">
                    <table className="w-full mt-4 mx-2 text-left table-auto min-w-max">
                        <thead>
                            <tr className="text-gray-800 dark:text-gray-100">
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    SNo
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Owner
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Account Number
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Account Type
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Member ID
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Opening Date
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Account Status
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((acc, index) => (
                                <tr
                                    key={acc.id}
                                    className="text-gray-800 dark:text-gray-100"
                                >
                                    <td class="p-3 border-b dark:border-gray-700">
                                        {index + 1}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        <div class="flex items-center gap-3">
                                            <img
                                                src={
                                                    acc.member.member_photo_url
                                                }
                                                alt="John Michael"
                                                class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                                            />
                                            <div class="flex flex-col">
                                                {` ${acc.member.first_name} ${acc.member.last_name}`}
                                                <span class="block text-sm text-gray-500 dark:text-gray-400">
                                                    {acc.member.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {acc.account_number}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {`${acc.account_type} Account`}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {acc.member.member_id}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {acc.start_date}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {acc.status}
                                    </td>
                                    <td class="p-3 border-b dark:border-gray-700">
                                        <Dropdown>
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
                                                    {can(
                                                        "View Account Details"
                                                    ) && (
                                                        <Dropdown.Link
                                                            href={route(
                                                                "accounts.show",
                                                                acc.id
                                                            )}
                                                        >
                                                            View Account Details
                                                        </Dropdown.Link>
                                                    )}

                                                    {can(
                                                        "Create Transaction"
                                                    ) && (
                                                        <Dropdown.Link href="#">
                                                            Create Transaction
                                                        </Dropdown.Link>
                                                    )}
                                                </Dropdown.Content>
                                            </Dropdown>
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
