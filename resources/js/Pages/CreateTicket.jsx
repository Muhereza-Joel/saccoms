import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import SelectInput from "@/Components/SelectInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function CreateTicket({
    auth,
    permissions,
    success,
    error,
    users,
}) {
    const quillRef = useRef(null);
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        issue_category: "",
        description: "",
        assigned_to: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tickets.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <div className="flex justify-between items-center">
                    {/* Left-aligned title */}
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create Support Ticket
                    </h2>
                </div>
            }
        >
            <Head title="Create Support Ticket" />

            <div className="py-2">
                {/* Display Success Message */}
                {success && <AlertSuccess success={success} />}

                {/* Display Error Message */}
                {error && <AlertError error={error} />}

                <div className="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div
                        className="bg-orange-100 dark:bg-orange-900 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            Support tickets are used to communicate issues you
                            are facing as you use this sacco management
                            software.
                        </span>
                    </div>

                    <div className="px-4 pt-4 pb-2">
                        {can("Create Support Ticket") && (
                            <form onSubmit={submit} className="space-y-8">
                                <div className="space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="issue_category"
                                            value="Username"
                                        />

                                        <SelectInput
                                            id="issue_category"
                                            name="issue_category"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Issue Category",
                                                },
                                                {
                                                    value: "Loan",
                                                    label: "Loan",
                                                },
                                                {
                                                    value: "Account",
                                                    label: "Account",
                                                },
                                                {
                                                    value: "Savings",
                                                    label: "Savings",
                                                },
                                                {
                                                    value: "Technical",
                                                    label: "Technical",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "issue_category",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.issue_category}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="assigned_to"
                                            value="Direct Ticket To"
                                        />

                                        <SelectInput
                                            id="assigned_to"
                                            name="assigned_to"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select User",
                                                }, // Updated placeholder label
                                                ...users
                                                    .filter((user) => {
                                                        // Filter out users with "root" or "admin" roles if the current user lacks permission
                                                        const restrictedRoles =
                                                            ["root"];
                                                        if (
                                                            !can(
                                                                "Create Role"
                                                            ) &&
                                                            user.roles.some(
                                                                (role) =>
                                                                    restrictedRoles.includes(
                                                                        role.name
                                                                    )
                                                            )
                                                        ) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })
                                                    .map((user) => ({
                                                        value: user.id, // Use user.id as the value
                                                        label: `${
                                                            user.name
                                                        } - ${user.roles
                                                            .map(
                                                                (role) =>
                                                                    role.name
                                                            )
                                                            .join(", ")}`, // Combine all roles for the label
                                                    })),
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "assigned_to",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.assigned_to}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="description"
                                            value="Briefly provide a description about your issue"
                                        />
                                        <QuillEditor
                                            id="description"
                                            ref={quillRef}
                                            value={data.description}
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                height: "300px",
                                                marginBottom: "3.5em",
                                            }}
                                            placeholder="Write issue description here..."
                                        />
                                        <InputError
                                            message={errors.description}
                                            className="mt-2"
                                        />
                                    </div>

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
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
