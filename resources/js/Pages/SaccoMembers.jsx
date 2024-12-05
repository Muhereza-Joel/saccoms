import Dropdown from "@/Components/Dropdown";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function SaccoMembers({ auth, members, permissions }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Sacco Members
                    </h2>

                    {can("Create Member") && (
                        <Link
                            href={route("members.create")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Add Member
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Members" />

            {/* Content */}
            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-2 lg:px-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-2 text-gray-900 dark:text-gray-100">
                            <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl dark:bg-gray-800 dark:text-gray-200 bg-clip-border">
                                <div class="relative mx-4 mt-2 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border dark:bg-gray-900">
                                    <div class="flex flex-wrap p-2 items-center justify-between gap-8">
                                        {/* <!-- Buttons --> */}

                                        {can("Create Member") && (
                                            <div class="flex items-center gap-2 shrink-0">
                                                <button
                                                    class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:border-gray-200 dark:text-gray-200"
                                                    type="button"
                                                >
                                                    Download Members Template
                                                </button>
                                                <button class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-gray-700 dark:shadow-gray-700/10">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        class="w-4 h-4"
                                                    >
                                                        <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                                                    </svg>
                                                    Upload Members Sheet
                                                </button>
                                            </div>
                                        )}
                                        {/* <!-- Filters --> */}
                                        <div class="flex flex-wrap items-center gap-4">
                                            <div class="flex items-center gap-2">
                                                <label
                                                    for="gender"
                                                    class="text-sm font-semibold dark:text-gray-300"
                                                >
                                                    Gender:
                                                </label>
                                                <select
                                                    id="gender"
                                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                    <option value="">
                                                        All
                                                    </option>
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <label
                                                    for="status"
                                                    class="text-sm font-semibold dark:text-gray-300"
                                                >
                                                    Status:
                                                </label>
                                                <select
                                                    id="status"
                                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                    <option value="">
                                                        All
                                                    </option>
                                                    <option value="active">
                                                        Active
                                                    </option>
                                                    <option value="suspended">
                                                        Suspended
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <label
                                                    for="membership-type"
                                                    class="text-sm font-semibold dark:text-gray-300"
                                                >
                                                    Membership:
                                                </label>
                                                <select
                                                    id="membership-type"
                                                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-gray-400 focus:outline-none sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                    <option value="">
                                                        All
                                                    </option>
                                                    <option value="ordinary">
                                                        Ordinary
                                                    </option>
                                                    <option value="premium">
                                                        Premium
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Members Table --> */}
                                <div class="p-6 px-0">
                                    <table class="w-full mt-2 text-left table-auto min-w-max">
                                        <thead>
                                            <tr>
                                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                                    Member
                                                </th>
                                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                                    Member ID
                                                </th>
                                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                                    Phone Number
                                                </th>
                                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                                    Date of Birth
                                                </th>
                                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member) => (
                                                <tr key={member.id}>
                                                    <td class="px-2 border-b dark:border-gray-700">
                                                        <div class="flex items-center gap-3">
                                                            <img
                                                                src={
                                                                    member.member_photo_url
                                                                }
                                                                alt="John Michael"
                                                                class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                                                            />
                                                            <div class="flex flex-col">
                                                                {` ${member.first_name} ${member.last_name}`}
                                                                <span class="block text-sm text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        member.email
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="p-3 border-b dark:border-gray-700">
                                                        {member.member_id}
                                                    </td>
                                                    <td class="p-3 border-b dark:border-gray-700">
                                                        {member.phone_number}
                                                    </td>
                                                    <td class="p-3 border-b dark:border-gray-700">
                                                        {member.date_of_birth}
                                                    </td>
                                                    <td class="p-3 border-b dark:border-gray-700">
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                                                >
                                                                    Select
                                                                    Action
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
                                                                    "View Member Details"
                                                                ) && (
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "members.show",
                                                                            member.id
                                                                        )}
                                                                    >
                                                                        View
                                                                        Member
                                                                        Details
                                                                    </Dropdown.Link>
                                                                )}

                                                                {can(
                                                                    "Create Account"
                                                                ) && (
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "create-member-account",
                                                                            member.id
                                                                        )}
                                                                    >
                                                                        Create
                                                                        Account
                                                                    </Dropdown.Link>
                                                                )}

                                                                {can(
                                                                    "View Member Transactions"
                                                                ) && (
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "members.index"
                                                                        )}
                                                                    >
                                                                        Member
                                                                        Transactions
                                                                    </Dropdown.Link>
                                                                )}

                                                                {can(
                                                                    "View Member Loans"
                                                                ) && (
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "members.index"
                                                                        )}
                                                                    >
                                                                        Member
                                                                        Loans
                                                                    </Dropdown.Link>
                                                                )}

                                                                {can(
                                                                    "View Member Tickets"
                                                                ) && (
                                                                    <Dropdown.Link
                                                                        href={route(
                                                                            "members.index"
                                                                        )}
                                                                    >
                                                                        Member
                                                                        Tickets
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
