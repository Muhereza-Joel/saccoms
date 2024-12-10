import InfoRow from "@/Components/InfoRow";
import LongTextInfoRow from "@/Components/LongTextInfoRow";
import RepaymentSchedule from "@/Components/RepaymetSchedule";
import Section from "@/Components/Section";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function LoanDetails({ auth, permissions, loan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Loan Details
                </h2>
            }
        >
            <Head title="Loan Details" />

            <div className="py-2">
                <div className="max-w-7xl mx-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="col-span-2 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-6">
                            <div className="space-y-6">
                                {/* Member Details */}
                                <Section title="Member Information">
                                    <InfoRow
                                        label="Member ID"
                                        value={loan.member.member_id}
                                    />
                                    <InfoRow
                                        label="Full Name"
                                        value={`${loan.member.first_name} ${loan.member.last_name}`}
                                    />
                                    <InfoRow
                                        label="Gender"
                                        value={loan.member.gender}
                                    />
                                    <InfoRow
                                        label="Date of Birth"
                                        value={loan.member.date_of_birth}
                                    />
                                    <InfoRow
                                        label="National ID (NIN)"
                                        value={loan.member.nin}
                                    />

                                    <InfoRow
                                        label="Email"
                                        value={loan.member.email}
                                    />
                                    <InfoRow
                                        label="Phone Number"
                                        value={loan.member.phone_number}
                                    />

                                    <InfoRow
                                        label="Country"
                                        value={loan.member.country}
                                    />
                                    <InfoRow
                                        label="Region"
                                        value={loan.member.region}
                                    />
                                    <InfoRow
                                        label="District"
                                        value={loan.member.district}
                                    />
                                    <InfoRow
                                        label="County"
                                        value={loan.member.county}
                                    />
                                    <InfoRow
                                        label="Sub-County"
                                        value={loan.member.sub_county}
                                    />
                                    <InfoRow
                                        label="Parish"
                                        value={loan.member.parish}
                                    />
                                    <InfoRow
                                        label="Village"
                                        value={loan.member.village}
                                    />
                                </Section>

                                {/* Loan Type Details */}
                                <Section title="Loan Type Information">
                                    <LongTextInfoRow
                                        label="Loan Type Name"
                                        value={loan.loan_type.loan_type_name}
                                    />
                                    <br />
                                    <LongTextInfoRow
                                        label="Loan Type Description"
                                        value={
                                            loan.loan_type.loan_type_description
                                        }
                                    />
                                </Section>

                                {/* Loan Plan Details */}
                                <Section title="Loan Plan Details">
                                    <InfoRow
                                        label="Plan Name"
                                        value={loan.loan_plan.loan_plan_name}
                                    />
                                    <InfoRow
                                        label="Number of Months"
                                        value={`${loan.loan_plan.loan_plan_months} months`}
                                    />
                                    <InfoRow
                                        label="Interest Rate"
                                        value={`${loan.loan_plan.loan_plan_interest_rate}% of principal`}
                                    />
                                    <InfoRow
                                        label="Penalty for Missed Payments"
                                        value={`Ugx ${loan.loan_plan.loan_plan_penalty}`}
                                    />
                                </Section>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-6">
                                <Section title="Loan Details">
                                    <InfoRow
                                        label="Reference Number"
                                        value={loan.reference_number}
                                    />

                                    <InfoRow
                                        label="Principal Amount"
                                        value={loan.principal_amount}
                                    />

                                    <InfoRow
                                        label="Oustanding Balance"
                                        value={loan.outstanding_balance}
                                    />

                                    <InfoRow
                                        label="Approval Date"
                                        value={loan.approval_date}
                                    />
                                    <InfoRow
                                        label="Disbursement Date"
                                        value={loan.disbursement_date}
                                    />

                                    <InfoRow
                                        label="Repayment Schedule"
                                        value={loan.repayment_schedule}
                                    />

                                    <InfoRow
                                        label="Loan Status"
                                        value={
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    loan.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : loan.status ===
                                                          "Rejected"
                                                        ? "bg-red-100 text-red-800"
                                                        : loan.status ===
                                                          "Approved"
                                                        ? "bg-green-100 text-green-800"
                                                        : loan.status ===
                                                          "Disbursed"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {loan.status}
                                            </span>
                                        }
                                    />
                                    <br />
                                    <LongTextInfoRow
                                        label="Collateral"
                                        value={loan.collateral}
                                    />
                                </Section>
                            </div>

                            <div className="p-6">
                                {loan.status === "Disbursed" && (
                                    <RepaymentSchedule loan={loan} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
