import DateInput from "@/Components/DateInput";
import Dropdown from "@/Components/Dropdown";
import InfoRow from "@/Components/InfoRow";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Section from "@/Components/Section";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function MemberDetails({
    auth,
    success,
    member,
    accounts,
    permissions,
}) {
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        account_type: "",
        member_id: member.id,
        interest_rate: "",
        start_date: "",
        end_date: "",
        status: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("accounts.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Create new account for ${member.first_name} ${member.last_name}`}
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
            <Head title="Create New Account" />

            <div className="py-2">
                {/* Display Success Message */}
                {success && (
                    <div
                        className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}

                <div className="max-w-7xl mx-2 grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {/* Member Details */}
                    <div className="col-span-1 lg:col-span-2 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-6">
                            {/* Member Photo */}
                            <div className="flex items-center justify-center mb-4">
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
                            </div>

                            {/* Contact Details */}
                            <Section title="Contact Details">
                                <InfoRow label="Email" value={member.email} />
                                <InfoRow
                                    label="Phone Number"
                                    value={member.phone_number}
                                />
                            </Section>

                            {/* Membership Details */}
                            <Section title="Membership Details">
                                <InfoRow
                                    label="Membership Type"
                                    value={member.membership_type}
                                />
                                <InfoRow label="Status" value={member.status} />
                            </Section>
                        </div>
                    </div>

                    {/* Right Column: Account Details and Form */}
                    <div className="space-y-6">
                        {/* Member Accounts Details */}
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

                        {/* Form Section */}
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                                    Create New Account
                                </h3>
                                <form onSubmit={submit}>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <InputLabel
                                                htmlFor="account_type"
                                                value="Account Type"
                                            />

                                            <SelectInput
                                                id="account_type"
                                                name="account_type"
                                                isFocused={false}
                                                className="mt-1 block w-full"
                                                options={[
                                                    {
                                                        value: "",
                                                        label: "Select Account Type",
                                                    },
                                                    {
                                                        value: "Savings",
                                                        label: "Savings Account",
                                                    },
                                                    {
                                                        value: "Current",
                                                        label: "Current Account",
                                                    },
                                                    {
                                                        value: "Fixed Deposit",
                                                        label: "Fixed Deposit Account",
                                                    },
                                                ]}
                                                onChange={(e) =>
                                                    setData(
                                                        "account_type",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.account_type}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Conditional Fields for Fixed Deposit */}
                                        {data.account_type ===
                                            "Fixed Deposit" && (
                                            <>
                                                <div>
                                                    <InputLabel
                                                        htmlFor="interest_rate"
                                                        value="Interest Rate"
                                                    />

                                                    <TextInput
                                                        id="interest_rate"
                                                        name="interest_rate"
                                                        type="number"
                                                        step="0.1"
                                                        value={
                                                            data.interest_rate
                                                        }
                                                        className="mt-1 block w-full"
                                                        autoComplete="interest_rate"
                                                        isFocused={false}
                                                        onChange={(e) =>
                                                            setData(
                                                                "interest_rate",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Applies to fixed deposit accounts"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.interest_rate
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div>
                                                    <InputLabel
                                                        htmlFor="end_date"
                                                        value="Date when interest rate ends"
                                                    />

                                                    <DateInput
                                                        id="end_date"
                                                        name="end_date"
                                                        value={data.end_date}
                                                        className="mt-1 block w-full"
                                                        autoComplete="end_date"
                                                        isFocused={false}
                                                        onChange={(e) =>
                                                            setData(
                                                                "end_date",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.end_date
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <div>
                                            <InputLabel
                                                htmlFor="start_date"
                                                value="Date of Account Opening"
                                            />
                                            <DateInput
                                                id="start_date"
                                                name="start_date"
                                                value={data.start_date}
                                                className="mt-1 block w-full"
                                                autoComplete="start_date"
                                                isFocused={false}
                                                onChange={(e) =>
                                                    setData(
                                                        "start_date",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.start_date}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="status"
                                                value="Account Status"
                                            />

                                            <SelectInput
                                                id="status"
                                                name="status"
                                                isFocused={false}
                                                className="mt-1 block w-full"
                                                options={[
                                                    {
                                                        value: "",
                                                        label: "Select Account Status",
                                                    },
                                                    {
                                                        value: "Active",
                                                        label: "Active",
                                                    },
                                                    {
                                                        value: "Closed",
                                                        label: "Closed",
                                                    },
                                                    {
                                                        value: "Suspended",
                                                        label: "Suspended",
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
                                        {/* <!-- Submit Button --> */}
                                        <div className="flex items-center justify-start">
                                            <PrimaryButton
                                                className="ms-0 mb-3"
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
