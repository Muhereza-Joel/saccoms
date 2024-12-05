import DateInput from "@/Components/DateInput";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function FinancialYear({ auth, success, permissions }) {
    const { can } = usePermission(permissions);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        start_date: "",
        end_date: "",
        status: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("financial-years.store"), {
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
                        Start a new financial years
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
                                <Dropdown.Link
                                    href={route("financial-years.index")}
                                >
                                    List Financial Years
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            }
        >
            <Head title="Manage Financial Years" />

            <div>
                {/* Display Success Message */}
                {success && (
                    <div
                        className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
                <div class="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div
                        className="bg-orange-100 dark:bg-orange-900 border border-orange-400 dark:border-orange-700 text-orange-700 dark:text-orange-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            A financial year is required because its where all
                            transactions in the system are attached!{" "}
                            <strong>
                                Note: When you start a new financial year, it
                                will become active automatically and will close
                                all currently active financial years.
                            </strong>
                        </span>
                    </div>
                    <div class="px-4 pt-4 pb-2">
                        {can("Create Financial Year") && (
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name of Financial Year"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Name of financial year goes here."
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="start_date"
                                            value="Start Date of Financial Year"
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
                                            htmlFor="end_date"
                                            value="Ending Date of Financial Year"
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
                                            message={errors.end_date}
                                            className="mt-2"
                                        />
                                    </div>
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
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
