import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
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
import { useRef, useState, useEffect } from "react";

export default function CreateLoanApplication({
    auth,
    permissions,
    member_id,
    loan_types,
    loan_plans,
    success,
    error,
    member,
}) {
    const { can } = usePermission(permissions);
    const quillRef = useRef(null); // Reference for QuillEditor
    const [showCustomPeriod, setShowCustomPeriod] = useState(false);
    const [repaymentScheduleDetails, setRepaymentScheduleDetails] = useState(
        []
    );

    const { data, setData, post, errors, processing, reset } = useForm({
        member_id: member_id,
        loan_type: "",
        loan_plan: "",
        loan_plan_months: "",
        loan_plan_limit: "",
        loan_plan_interest_rate: "",
        principal_amount: "",
        repayment_period: "",
        repayment_schedule: "",
        repayment_dates: [],
        repayment_installments: [],
        collateral: "",
        status: "Pending",
        due_date: "",
        outstanding_balance: "",
    });

    const calculateOutstandingBalance = () => {
        const principal = parseFloat(data.principal_amount) || 0;
        const interestRate = parseFloat(data.loan_plan_interest_rate) || 0;
        return principal + (principal * interestRate) / 100;
    };

    const calculateRepaymentScheduleDetails = () => {
        const schedule = data.repayment_schedule;
        const months = showCustomPeriod
            ? data.repayment_period
            : data.loan_plan_months;
        const today = new Date();
        const dates = [];
        const installments = []; // New array to store installment details

        if (schedule && months) {
            let increment;
            switch (schedule) {
                case "Daily":
                    increment = 1;
                    break;
                case "Weekly":
                    increment = 7;
                    break;
                case "Monthly":
                    increment = 30;
                    break;
                case "Quarterly":
                    increment = 90;
                    break;
                default:
                    increment = 30;
            }

            const totalInstallments = Math.ceil((months * 30) / increment);
            const balance = calculateOutstandingBalance();

            const installmentAmount = balance / totalInstallments;

            let date = new Date(today);
            for (let i = 0; i < totalInstallments; i++) {
                date.setDate(date.getDate() + increment);
                const formattedDate = new Date(date)
                    .toISOString()
                    .split("T")[0];
                dates.push(formattedDate); // Push date to the dates array

                installments.push({
                    date: formattedDate,
                    installment: installmentAmount.toFixed(2), // Push installment details
                });
            }

            // Get the last date from the generated schedule
            const dueDate = dates.length > 0 ? dates[dates.length - 1] : null;

            // Set the calculated values, including installments
            setData({
                ...data, // Assuming `data` contains the current state
                outstanding_balance: balance,
                repayment_dates: dates,
                repayment_installments: installments, // New array
                due_date: dueDate,
            });
        }

        // Update repayment schedule details
        setRepaymentScheduleDetails(installments);
    };

    useEffect(() => {
        const balance = calculateOutstandingBalance();
        setData("outstanding_balance", balance);

        if (!showCustomPeriod) {
            calculateRepaymentScheduleDetails();
        }
    }, [
        data.loan_plan,
        data.principal_amount,
        data.loan_plan_interest_rate,
        data.repayment_schedule,
    ]);

    const toggleCustomPeriod = () => {
        setShowCustomPeriod(!showCustomPeriod);
        if (!showCustomPeriod) {
            setData("repayment_period", "");
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("loans.store"), {
            // onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Loan Application
                </h2>
            }
        >
            <Head title="Create Loan Application" />

            <div className="py-2">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm mx-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div className="px-2 pt-2 pb-2">
                        {can("Create Loan") && (
                            <div className="flex flex-col md:flex-row space-x-2">
                                <form
                                    onSubmit={submit}
                                    className="space-y-8 md:w-2/3"
                                >
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Bio Data Section */}
                                            <div className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-md shadow">
                                                <Section title="Applicant Bio Data">
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
                                                        value={
                                                            member.date_of_birth
                                                        }
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
                                                        value={
                                                            member.phone_number
                                                        }
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
                                                        value={
                                                            member.sub_county
                                                        }
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
                                            </div>

                                            {/* Loan Application Form Section */}
                                            <div className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-md shadow">
                                                {/* Loan Type */}
                                                <div>
                                                    <InputLabel
                                                        htmlFor="loan_type"
                                                        value="Loan Type"
                                                    />
                                                    <SelectInput
                                                        id="loan_type"
                                                        name="loan_type"
                                                        value={data.loan_type}
                                                        className="mt-1 block w-full"
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Select Loan Type",
                                                            },
                                                            ...loan_types.map(
                                                                (type) => ({
                                                                    value: type.id,
                                                                    label: type.loan_type_name,
                                                                })
                                                            ),
                                                        ]}
                                                        onChange={(e) =>
                                                            setData(
                                                                "loan_type",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.loan_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                {/* Loan Plan */}
                                                <div>
                                                    <InputLabel
                                                        htmlFor="loan_plan"
                                                        value="Loan Plan"
                                                    />
                                                    <SelectInput
                                                        id="loan_plan"
                                                        name="loan_plan"
                                                        className="mt-1 block w-full"
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Select Loan Plan",
                                                            },
                                                            ...loan_plans.map(
                                                                (plan) => ({
                                                                    value: plan.id,
                                                                    label: plan.loan_plan_name,
                                                                })
                                                            ),
                                                        ]}
                                                        onChange={(
                                                            selected
                                                        ) => {
                                                            const selectedPlan =
                                                                loan_plans.find(
                                                                    (plan) =>
                                                                        plan.id ===
                                                                        selected
                                                                            .target
                                                                            .value
                                                                );

                                                            setData(
                                                                (prevData) => ({
                                                                    ...prevData,
                                                                    loan_plan:
                                                                        selected
                                                                            .target
                                                                            .value,
                                                                    loan_plan_months:
                                                                        selectedPlan?.loan_plan_months ||
                                                                        "",
                                                                    loan_plan_interest_rate:
                                                                        selectedPlan?.loan_plan_interest_rate ||
                                                                        "",
                                                                    loan_plan_limit:
                                                                        selectedPlan?.loan_plan_limit ||
                                                                        "",
                                                                })
                                                            );
                                                        }}
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.loan_plan
                                                        }
                                                        className="mt-2"
                                                    />

                                                    <InputLabel
                                                        htmlFor="loan_plan_interest_rate"
                                                        value="Interest rate (%)"
                                                    />
                                                    <TextInput
                                                        type="number"
                                                        value={
                                                            data.loan_plan_interest_rate
                                                        }
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputLabel
                                                        htmlFor="loan_plan_months"
                                                        value="Repayment Period in Months"
                                                    />
                                                    <TextInput
                                                        type="number"
                                                        value={
                                                            data.loan_plan_months
                                                        }
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputLabel
                                                        htmlFor="loan_plan_limit"
                                                        value="Maximumn amount a member can borrow"
                                                    />
                                                    <TextInput
                                                        type="number"
                                                        value={
                                                            data.loan_plan_limit
                                                        }
                                                        className="mt-1 block w-full"
                                                    />
                                                </div>

                                                {/* Principal Amount */}
                                                <div>
                                                    <InputLabel
                                                        htmlFor="principal_amount"
                                                        value="Principal Amount (Ugx)"
                                                    />
                                                    <TextInput
                                                        id="principal_amount"
                                                        name="principal_amount"
                                                        type="number"
                                                        value={
                                                            data.principal_amount
                                                        }
                                                        className="mt-1 block w-full"
                                                        onChange={(e) =>
                                                            setData(
                                                                "principal_amount",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.principal_amount
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>

                                                {/* Repayment Schedule */}
                                                <div>
                                                    <InputLabel
                                                        htmlFor="repayment_schedule"
                                                        value="Repayment Schedule"
                                                    />
                                                    <SelectInput
                                                        id="repayment_schedule"
                                                        name="repayment_schedule"
                                                        className="mt-1 block w-full"
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Select Repayment Schedule",
                                                            },
                                                            {
                                                                value: "Daily",
                                                                label: "Daily",
                                                            },
                                                            {
                                                                value: "Weekly",
                                                                label: "Weekly",
                                                            },
                                                            {
                                                                value: "Monthly",
                                                                label: "Monthly",
                                                            },
                                                            {
                                                                value: "Quarterly",
                                                                label: "Quarterly",
                                                            },
                                                        ]}
                                                        onChange={(e) =>
                                                            setData(
                                                                "repayment_schedule",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.repayment_schedule
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Collateral */}
                                        <div>
                                            <InputLabel
                                                htmlFor="collateral"
                                                value="Collateral Security Description"
                                            />
                                            <QuillEditor
                                                id="collateral"
                                                value={data.collateral}
                                                ref={quillRef}
                                                isFocused={false}
                                                onChange={(e) =>
                                                    setData(
                                                        "collateral",
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    height: "200px",
                                                    marginBottom: "3.5em",
                                                }}
                                                placeholder="Collateral description goes here..."
                                            />

                                            <InputError
                                                message={errors.collateral}
                                                className="mt-2"
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <div className="flex justify-start">
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </form>

                                <div className="md:w-1/3 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
                                    {repaymentScheduleDetails.length > 0 && (
                                        <>
                                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-300 dark:border-gray-600">
                                                Sample Loan Repayment Schedule.
                                            </h2>
                                            <div
                                                className="bg-orange-100 dark:bg-orange-900 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-2 py-1 rounded relative"
                                                role="alert"
                                            >
                                                <span className="block sm:inline">
                                                    <strong>
                                                        Note: This is note the
                                                        actual repayment
                                                        schedule, the actual
                                                        schedule will be
                                                        generated when the loan
                                                        is disbursed.
                                                    </strong>
                                                </span>
                                            </div>
                                        </>
                                    )}
                                    <ul className="space-y-3">
                                        {repaymentScheduleDetails.map(
                                            (detail, index) => (
                                                <li
                                                    key={index}
                                                    className="text-gray-700 dark:text-gray-300"
                                                >
                                                    <span className="block text-sm">
                                                        <strong>Date:</strong>{" "}
                                                        {detail.date}
                                                    </span>
                                                    <span className="block text-sm">
                                                        <strong>Amount:</strong>{" "}
                                                        Ugx{" "}
                                                        {detail.installment.toLocaleString()}
                                                    </span>
                                                    <hr className="border-t border-gray-300 dark:border-gray-600" />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
