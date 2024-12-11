import InfoRow from "@/Components/InfoRow";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import Section from "@/Components/Section";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateTransaction({ auth, permissions, member }) {
    const { can } = usePermission(permissions);
    const { data, setData, post, errors, processing, reset } = useForm({});
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Transactions
                </h2>
            }
        >
            <Head title="Create Transactions" />

            <div className="p-2">
                <div className="max-w-full rounded shadow-sm mx-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                        <div className="space-y-4 p-6 rounded-md border-2 dark:border-gray-600">
                            <Section title="Member profile information">
                                <InfoRow
                                    label="Member ID"
                                    value={member.member_id}
                                />
                                <InfoRow
                                    label="Full Name"
                                    value={`${member.first_name} ${member.last_name}`}
                                />
                                <InfoRow label="Gender" value={member.gender} />
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
                                <InfoRow label="Email" value={member.email} />
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
                                <InfoRow label="Region" value={member.region} />
                                <InfoRow
                                    label="District"
                                    value={member.district}
                                />
                                <InfoRow label="County" value={member.county} />
                                <InfoRow
                                    label="Sub-County"
                                    value={member.sub_county}
                                />
                                <InfoRow label="Parish" value={member.parish} />
                                <InfoRow
                                    label="Village"
                                    value={member.village}
                                />
                            </Section>
                        </div>

                        <div className="space-y-4 p-6 rounded-md border-2 dark:border-gray-600">
                            <Section title="Transaction Details">
                                <form className="space-y-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="transaction_type"
                                            value="Transaction Type"
                                        />

                                        <SelectInput
                                            id="transaction_type"
                                            name="transaction_type"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Type of Transaction",
                                                },
                                                {
                                                    value: "Deposit",
                                                    label: "Deposit",
                                                },
                                                {
                                                    value: "Withdrawal",
                                                    label: "Withdrawal",
                                                },
                                                {
                                                    value: "Loan Repayment",
                                                    label: "Loan Repayment",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "transaction_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.transaction_type}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="amount"
                                            value="Transaction Amount (Ugx)"
                                        />

                                        <TextInput
                                            id="amount"
                                            name="amount"
                                            value={data.amount}
                                            type="number"
                                            min="0"
                                            className="mt-1 block w-full"
                                            autoComplete="amount"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Transaction amount goes here."
                                        />

                                        <InputError
                                            message={errors.amount}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="payment_method"
                                            value="Payment Method"
                                        />

                                        <SelectInput
                                            id="payment_method"
                                            name="payment_method"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Payment Method",
                                                },
                                                {
                                                    value: "Cash",
                                                    label: "Cash",
                                                },
                                                {
                                                    value: "Bank Deposit",
                                                    label: "Bank Deposit",
                                                },
                                                {
                                                    value: "Cheque",
                                                    label: "Cheque",
                                                },
                                                {
                                                    value: "Mobile Money",
                                                    label: "Mobile Money",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.transaction_type}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="payment_method"
                                            value="Payment Method"
                                        />

                                        <SelectInput
                                            id="status"
                                            name="status"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Payment Method",
                                                },
                                                {
                                                    value: "Pending",
                                                    label: "Pending",
                                                },
                                                {
                                                    value: "Completed",
                                                    label: "Completed",
                                                },
                                                {
                                                    value: "Failed",
                                                    label: "Failed",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="remarks"
                                            value="Notes about this transaction"
                                        />

                                        <QuillEditor/>

                                        <InputError
                                            message={errors.remarks}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* <!-- Submit Button --> */}
                                    <div className="flex items-center justify-start">
                                        <PrimaryButton
                                            className="ms-0 mb-3"
                                            disabled={processing}
                                        >
                                            Save Transaction
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </Section>
                        </div>

                        <div className="space-y-4 p-6 rounded-md border-2 dark:border-gray-600">
                            <Section title="Recent Member Transaction"></Section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
