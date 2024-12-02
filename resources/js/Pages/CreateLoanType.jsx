import React, { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import QuillEditor from "@/Components/QuillEditor";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertError from "@/Components/AlertError";

export default function CreateLoanType({ auth, success, error }) {
    const quillRef = useRef(null); // Reference for QuillEditor
    const { data, setData, post, processing, errors, reset } = useForm({
        loan_type_name: "",
        loan_type_description: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("loan-types.store"), {
            onSuccess: () => {
                reset(); // Reset the form state
                if (quillRef.current) {
                    quillRef.current.getEditor().setText(""); // Clear QuillEditor content
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Loan Plans
                </h2>
            }
        >
            <Head title="Create Loan Plans" />

            <div className="py-2">
                {success && <AlertSuccess success={success} />}

                {error && <AlertError error={error} />}

                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mx-2">
                    <div className="p-6">
                        <form onSubmit={submit}>
                            <div className="mt-4 space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="loan_type_name"
                                        value="What is the name of this loan type"
                                    />
                                    <TextInput
                                        id="loan_type_name"
                                        name="loan_type_name"
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "loan_type_name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter the name of the loan"
                                    />
                                    <InputError
                                        message={errors.loan_type_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="loan_type_description"
                                        value="Briefly provide a description about this loan type"
                                    />
                                    <QuillEditor
                                        id="loan_type_description"
                                        ref={quillRef}
                                        value={data.loan_type_description}
                                        isFocused={false}
                                        onChange={(e) =>
                                            setData(
                                                "loan_type_description",
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            height: "300px",
                                            marginBottom: "3.5em",
                                        }}
                                        placeholder="Write loan description here..."
                                    />
                                    <InputError
                                        message={errors.loan_type_description}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-start">
                                    <PrimaryButton
                                        className="ms-0 mb-3"
                                        disabled={processing}
                                    >
                                        Save Loan Type
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
