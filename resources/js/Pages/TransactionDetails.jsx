import InfoRow from "@/Components/InfoRow";
import Pagination from "@/Components/Pagination";
import Section from "@/Components/Section";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function TransactionDetails({ auth, permissions, transaction }) {
    const { can } = usePermission(permissions);

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Transaction Details
                    </h2>
                </div>
            }
        >
            <Head title="Transaction Details" />

            <div className="py-2">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg m-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3">
                        <div className="border-2 dark:border-gray-600 p-2">
                            {/* Personal Information */}
                            <Section title="Personal Information">
                                <InfoRow
                                    label="Member ID"
                                    value={transaction.member.member_id}
                                />
                                <InfoRow
                                    label="Full Name"
                                    value={`${transaction.member.first_name} ${transaction.member.last_name}`}
                                />
                                <InfoRow
                                    label="Gender"
                                    value={transaction.member.gender}
                                />
                                <InfoRow
                                    label="Date of Birth"
                                    value={transaction.member.date_of_birth}
                                />
                                <InfoRow
                                    label="National ID (NIN)"
                                    value={transaction.member.nin}
                                />

                                <InfoRow
                                    label="Email"
                                    value={transaction.member.email}
                                />
                                <InfoRow
                                    label="Phone Number"
                                    value={transaction.member.phone_number}
                                />
                                <InfoRow
                                    label="Country"
                                    value={transaction.member.country}
                                />
                                <InfoRow
                                    label="Region"
                                    value={transaction.member.region}
                                />
                                <InfoRow
                                    label="District"
                                    value={transaction.member.district}
                                />
                                <InfoRow
                                    label="County"
                                    value={transaction.member.county}
                                />
                                <InfoRow
                                    label="Sub-County"
                                    value={transaction.member.sub_county}
                                />
                                <InfoRow
                                    label="Parish"
                                    value={transaction.member.parish}
                                />
                                <InfoRow
                                    label="Village"
                                    value={transaction.member.village}
                                />

                                <InfoRow
                                    label="Membership Type"
                                    value={transaction.member.membership_type}
                                />
                                <InfoRow
                                    label="Status"
                                    value={transaction.member.status}
                                />
                            </Section>
                        </div>

                        <div className="border-2 dark:border-gray-600 p-2">
                            {/* Transaction Details */}
                            <Section title="Transaction Information">
                                <InfoRow
                                    label="Financial Year"
                                    value={transaction.financial_year.name}
                                />
                                <InfoRow
                                    label="Financial Year Status"
                                    value={transaction.financial_year.status}
                                />
                                <InfoRow
                                    label="Cust Account Number"
                                    value={transaction.account.account_number}
                                />
                                <InfoRow
                                    label="Account Status"
                                    value={transaction.account.status}
                                />
                                <InfoRow
                                    label="Acount Type"
                                    value={transaction.account.account_type}
                                />
                                <InfoRow
                                    label="Transaction Type"
                                    value={transaction.transaction_type}
                                />
                                <InfoRow
                                    label="Transaction Amount"
                                    value={transaction.amount}
                                />
                                <InfoRow
                                    label="Payment Method"
                                    value={transaction.payment_method}
                                />
                                <InfoRow
                                    label="Reference Number"
                                    value={transaction.reference_number}
                                />
                                <InfoRow
                                    label="Transaction Date"
                                    value={new Date(
                                        transaction.transaction_date
                                    ).toLocaleDateString()}
                                />
                                <InfoRow
                                    label="Transaction Status"
                                    value={
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
                                    }
                                />
                                <InfoRow
                                    label="Remarks"
                                    value={
                                        <div
                                            className="mt-2 text-gray-600 dark:text-gray-300"
                                            dangerouslySetInnerHTML={{
                                                __html: transaction.remarks,
                                            }}
                                        />
                                    }
                                />
                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
