import Dropdown from "@/Components/Dropdown";
import InfoRow from "@/Components/InfoRow";
import Section from "@/Components/Section";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function MemberDetails({
    auth,
    member,
    transactions,
    loans,
    accounts,
    permissions,
}) {
    const { can } = usePermission(permissions);
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Showing Details For ${member.first_name} ${member.last_name}`}
                    </h2>

                    {/* Right-aligned dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                >
                                    On This Page
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
                                {can("View Members") && (
                                    <Dropdown.Link
                                        href={route("members.index")}
                                    >
                                        List Members
                                    </Dropdown.Link>
                                )}

                                {can("Create Account") && (
                                    <Dropdown.Link
                                        href={route(
                                            "create-member-account",
                                            member.id
                                        )}
                                    >
                                        Create Account
                                    </Dropdown.Link>
                                )}

                                {can("Create Loan") && (
                                    <Dropdown.Link
                                        href={route(
                                            "create-member-loan-application",
                                            member.id
                                        )}
                                    >
                                        Create Loan Application
                                    </Dropdown.Link>
                                )}

                                {can("View Member Transactions") && (
                                    <Dropdown.Link
                                        href={route("members.index")}
                                    >
                                        Member Transactions
                                    </Dropdown.Link>
                                )}

                                {can("View Member Loans") && (
                                    <Dropdown.Link
                                        href={route("members.index")}
                                    >
                                        Member Loans
                                    </Dropdown.Link>
                                )}

                                {can("View Member Tickets") && (
                                    <Dropdown.Link
                                        href={route("members.index")}
                                    >
                                        Member Tickets
                                    </Dropdown.Link>
                                )}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            }
        >
            <Head title="Member Details" />

            <div className="py-2">
                <div className="max-w-7xl mx-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Member Details */}
                    <div className="col-span-2 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-6">
                            {/* Member Photo */}
                            <div className="flex items-center justify-center mb-3">
                                {member.member_photo ? (
                                    <img
                                        src={member.member_photo}
                                        alt={`${member.first_name} ${member.last_name}`}
                                        className="w-60 h-60 rounded-full border-2 border-gray-300 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                        No Photo
                                    </div>
                                )}
                            </div>

                            {/* Sections */}
                            <div className="space-y-6">
                                {/* Personal Information */}
                                <Section title="Personal Information">
                                    <InfoRow
                                        label="Member ID"
                                        value={member.member_id}
                                    />
                                    <InfoRow
                                        label="Full Name"
                                        value={`${member.first_name} ${member.last_name}`}
                                    />
                                    <InfoRow
                                        label="Gender"
                                        value={member.gender}
                                    />
                                    <InfoRow
                                        label="Date of Birth"
                                        value={member.date_of_birth}
                                    />
                                    <InfoRow
                                        label="National ID (NIN)"
                                        value={member.nin}
                                    />
                                </Section>

                                {/* Contact Details */}
                                <Section title="Contact Details">
                                    <InfoRow
                                        label="Email"
                                        value={member.email}
                                    />
                                    <InfoRow
                                        label="Phone Number"
                                        value={member.phone_number}
                                    />
                                </Section>

                                {/* Location Information */}
                                <Section title="Location Information">
                                    <InfoRow
                                        label="Country"
                                        value={member.country}
                                    />
                                    <InfoRow
                                        label="Region"
                                        value={member.region}
                                    />
                                    <InfoRow
                                        label="District"
                                        value={member.district}
                                    />
                                    <InfoRow
                                        label="County"
                                        value={member.county}
                                    />
                                    <InfoRow
                                        label="Sub-County"
                                        value={member.sub_county}
                                    />
                                    <InfoRow
                                        label="Parish"
                                        value={member.parish}
                                    />
                                    <InfoRow
                                        label="Village"
                                        value={member.village}
                                    />
                                </Section>

                                {/* Membership Details */}
                                <Section title="Membership Details">
                                    <InfoRow
                                        label="Membership Type"
                                        value={member.membership_type}
                                    />
                                    <InfoRow
                                        label="Status"
                                        value={member.status}
                                    />
                                </Section>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Transactions and Loans */}
                    <div className="space-y-3">
                        {/* Account Details */}
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    {`All accounts for ${member.first_name} ${member.last_name}`}
                                </h3>
                                {accounts && accounts.length > 0 ? (
                                    <ul className="space-y-4">
                                        {accounts.map((acc, index) => (
                                            <li
                                                key={index}
                                                className="border-t border-gray-200 dark:border-gray-700 pt-4"
                                            >
                                                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Account {index + 1}
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>
                                                            Account Number
                                                        </span>
                                                        <span>
                                                            {acc.account_number ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>
                                                            Account Balance
                                                        </span>
                                                        <span>
                                                            {`Ugx ${acc.amount}` ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>
                                                            Account Type
                                                        </span>
                                                        <span>
                                                            {`${acc.account_type} Account` ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                        <span>
                                                            Account Status
                                                        </span>
                                                        <span>
                                                            {`Account ${acc.status}` ||
                                                                "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No account details found.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Last 5 Transactions */}
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    Last 5 Transactions
                                </h3>
                                <ul className="space-y-2">
                                    {transactions.length > 0 ? (
                                        transactions.map(
                                            (transaction, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                                                >
                                                    <span>
                                                        {
                                                            transaction.description
                                                        }
                                                    </span>
                                                    <span>
                                                        {transaction.amount}
                                                    </span>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No transactions found.
                                        </p>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Loans */}
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    Loans
                                </h3>
                                <ul className="space-y-2">
                                    {loans.length > 0 ? (
                                        loans.map((loan, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                                            >
                                                <span>{loan.type}</span>
                                                <span>{loan.balance}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No loans found.
                                        </p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
