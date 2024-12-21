import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import DangerButton from "@/Components/DangerButton";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Loans({
    auth,
    permissions,
    loans,
    links,
    success,
    error,
}) {
    const { can } = usePermission(permissions);
    const [updateLoanStatus, setUpdateLoanStatus] = useState(false);
    const [id, setID] = useState(null);
    const { data, setData, patch, errors, processing, reset } = useForm({
        status: "",
    });

    const closeModal = () => {
        setUpdateLoanStatus(false);
        reset();
        setID(null);
    };

    const submitLoanStatus = (e) => {
        e.preventDefault();

        patch(route("update-loan-status", id), {
            onSuccess: () => {
                closeModal();
            },
            onError: () => {
                // Keep the ID intact; no reset here
            },
            onFinish: () => {
                setData("status", "");
            },
        });
    };

    const getStatusOptions = (currentStatus, canApprove, canDisburse) => {
        switch (currentStatus) {
            case "Pending":
                const options = [];
                if (canApprove) {
                    options.push({ value: "Approved", label: "Approved" });
                }
                if (canApprove) {
                    options.push({ value: "Rejected", label: "Rejected" });
                }
                return options;

            case "Approved":
                return canDisburse
                    ? [{ value: "Disbursed", label: "Disbursed" }]
                    : [];

            case "Disbursed":
            case "Rejected":
            default:
                return [];
        }
    };

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
                <div className="bg-white dark:bg-gray-800  shadow-sm sm:rounded-lg m-2 p-6 px-0 h-full">
                    <table className="w-full mt-2 text-left table-auto min-w-max overflow-y-visible">
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
                                    Interest
                                </th>
                                <th class="p-2 border-y border-blue-gray-100 bg-blue-gray-50/50 dark:bg-gray-800">
                                    Balance Due
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
                                    <td className="p-2 border-b dark:border-gray-700">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                loan.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : loan.status === "Rejected"
                                                    ? "bg-red-100 text-red-800"
                                                    : loan.status === "Approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : loan.status ===
                                                      "Disbursed"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {loan.status}
                                        </span>
                                    </td>

                                    <td className="p-2 border-b dark:border-gray-700">
                                        {`Ugx ${loan.principal_amount}`}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {`${loan.interest_rate}%`}
                                    </td>
                                    <td class="p-2 border-b dark:border-gray-700">
                                        {`Ugx ${loan.outstanding_balance}`}
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

                                                {can("Update Loan") && (
                                                    <Dropdown.Link
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setUpdateLoanStatus(
                                                                true
                                                            );
                                                            setID(loan.id);
                                                        }}
                                                    >
                                                        Update Loan Status
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

                <Pagination links={links} />

                {/* Approve Loan Modal */}
                <Modal show={updateLoanStatus} onClose={closeModal}>
                    <div className="p-4">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Update Loan Application Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                The loan status can only progress forward in the
                                application process. Once rejected, a loan
                                cannot be updated further. Please select a valid
                                next status based on the current stage.
                            </p>
                        </header>
                        <form onSubmit={submitLoanStatus}>
                            <div className="space-y-6 mt-5">
                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="Loan Status"
                                    />

                                    <SelectInput
                                        id="status"
                                        name="status"
                                        isFocused={false}
                                        className="mt-1 block w-full"
                                        options={[
                                            {
                                                value: "",
                                                label: "Select Status",
                                            },
                                            ...getStatusOptions(
                                                loans.find((l) => l.id === id)
                                                    ?.status,
                                                can("Approve Loan"),
                                                can("Disburse Loan")
                                            ),
                                        ]}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />

                                    {/* Submit and Cancel Buttons */}
                                    <div className="flex items-center justify-start mt-3">
                                        <PrimaryButton
                                            className="ms-0 mb-3"
                                            disabled={processing}
                                        >
                                            Save
                                        </PrimaryButton>

                                        <DangerButton
                                            className="ms-2 mb-3"
                                            onClick={() => closeModal()}
                                        >
                                            Cancel
                                        </DangerButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
