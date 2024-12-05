import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function FinancialYear({ auth, years, permissions }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Manage Financial Years
                    </h2>

                    {/* Right-aligned button */}
                    {can("Create Financial Year") && (
                        <Link
                            href={route("financial-years.create")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Create Financial Year
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Manage Financial Years" />

            <div className="py-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-2 p-6 px-0">
                    <table className="w-full mt-4 mx-2 text-left table-auto min-w-max">
                        <thead>
                            <tr className="text-gray-800 dark:text-gray-100">
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Name of Financial Year
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Start Date
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    End Date
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Status
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {years.map((year) => (
                                <tr
                                    key={year.id}
                                    className="text-gray-800 dark:text-gray-100"
                                >
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {year.name}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {year.start_date}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {year.end_date}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {year.status === "active"
                                            ? "active"
                                            : "closed"}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        <select class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            <option value="">
                                                Select Action
                                            </option>
                                            <option value="view">View</option>
                                            <option value="delete">
                                                Delete
                                            </option>
                                        </select>
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
