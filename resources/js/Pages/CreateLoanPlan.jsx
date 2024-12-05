import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateLoanPlan({ auth, success, error, permissions }) {
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        loan_plan_name: "",
        loan_plan_months: "",
        loan_plan_interest_rate: "",
        loan_plan_penalty: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("loan-plans.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create New Loan Plan
                </h2>
            }
        >
            <Head title="Create Loan Plans" />

            <div className="py-2">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mx-2">
                    <div className="p-6">
                        {can("Create Loan Plan") && (
                            <form onSubmit={submit}>
                                {/* Form Container */}
                                <div className="mt-4 space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="loan_plan_name"
                                            value="Name of loan plan"
                                        />

                                        <TextInput
                                            id="loan_plan_name"
                                            name="loan_plan_name"
                                            type="text"
                                            value={data.loan_plan_name}
                                            className="mt-1 block w-full"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "loan_plan_name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter the name of the loan plan here."
                                        />

                                        <InputError
                                            message={errors.loan_plan_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    {/* Loan Plan Months */}
                                    <div>
                                        {/* Label for Loan Plan Months */}
                                        <InputLabel
                                            htmlFor="loan_plan_months"
                                            value="Loan Plan Duration (Months)"
                                        />

                                        {/* Input Field for Loan Plan Months */}
                                        <TextInput
                                            id="loan_plan_months"
                                            name="loan_plan_months"
                                            type="number"
                                            value={data.loan_plan_months}
                                            className="mt-1 block w-full"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "loan_plan_months",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter the number of months allowed for the loan plan"
                                        />

                                        {/* Error Message for Loan Plan Months */}
                                        <InputError
                                            message={errors.loan_plan_months}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Loan Plan Interest Rate */}
                                    <div>
                                        {/* Label for Interest Rate */}
                                        <InputLabel
                                            htmlFor="loan_plan_interest_rate"
                                            value="Interest Rate (%)"
                                        />

                                        {/* Input Field for Interest Rate */}
                                        <TextInput
                                            id="loan_plan_interest_rate"
                                            name="loan_plan_interest_rate"
                                            type="number"
                                            step="0.1"
                                            value={data.loan_plan_interest_rate}
                                            className="mt-1 block w-full"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "loan_plan_interest_rate",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter the interest rate for this loan plan"
                                        />

                                        {/* Error Message for Interest Rate */}
                                        <InputError
                                            message={
                                                errors.loan_plan_interest_rate
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Loan Plan Penalty */}
                                    <div>
                                        {/* Label for Loan Penalty */}
                                        <InputLabel
                                            htmlFor="loan_plan_penalty"
                                            value="Penalty for Missed Installments (Amount)"
                                        />

                                        {/* Input Field for Loan Penalty */}
                                        <TextInput
                                            id="loan_plan_penalty"
                                            name="loan_plan_penalty"
                                            type="number"
                                            value={data.loan_plan_penalty}
                                            className="mt-1 block w-full"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "loan_plan_penalty",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter the penalty amount for missed installments"
                                        />

                                        {/* Error Message for Loan Penalty */}
                                        <InputError
                                            message={errors.loan_plan_penalty}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-start">
                                        <PrimaryButton
                                            className="ms-0 mb-3"
                                            disabled={processing}
                                        >
                                            Save Plan
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
