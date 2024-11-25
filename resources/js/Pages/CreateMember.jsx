import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import DateInput from "@/Components/DateInput";
import EmailInput from "@/Components/EmailInput";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function CreateMember({ auth, success }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        nin: "",
        date_of_birth: "",
        gender: "",
        country: "",
        region: "",
        district: "",
        county: "",
        sub_county: "",
        parish: "",
        village: "",
        phone_number: "",
        membership_type: "",
        status: "",
        member_photo: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("members.store"), {
            onSuccess: () => reset(), // Reset the form on success
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Member
                </h2>
            }
        >
            <Head title="Create Member" />

            <div>
                {/* Display Success Message */}
                {success && (
                    <div
                        className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 m-2 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            {success || "Me"}
                        </span>
                    </div>
                )}

                <div class="max-w-full rounded shadow-sm m-2 overflow-hidden bg-white dark:bg-gray-800">
                    <div class="px-4 pt-4 pb-2">
                        <form onSubmit={submit} className="space-y-8">
                            {/* <!-- Personal Identification Section --> */}
                            <fieldset class="border rounded p-4">
                                <legend class="text-md font-bold text-gray-700 dark:text-gray-200">
                                    Member Personal Identification
                                </legend>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="first_name"
                                            value="First Name"
                                        />
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            autoComplete="first_name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Member first name goes here."
                                        />
                                        <InputError
                                            message={errors.first_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="last_name"
                                            value="Last Name"
                                        />
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            autoComplete="last_name"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Member last name goes here."
                                        />
                                        <InputError
                                            message={errors.last_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email Address"
                                        />
                                        <EmailInput
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="email"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="Email Address of goes here."
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="nin"
                                            value="NIN Number"
                                        />
                                        <TextInput
                                            id="nin"
                                            name="nin"
                                            value={data.nin}
                                            className="mt-1 block w-full"
                                            autoComplete="nin"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData("nin", e.target.value)
                                            }
                                            placeholder="Member NIN goes here."
                                        />
                                        <InputError
                                            message={errors.nin}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="date_of_birth"
                                            value="Date of Birth"
                                        />
                                        <DateInput
                                            id="date_of_birth"
                                            name="date_of_birth"
                                            value={data.date_of_birth}
                                            className="mt-1 block w-full"
                                            autoComplete="date_of_birth"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "date_of_birth",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.date_of_birth}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="gender"
                                            value="Gender"
                                        />
                                        <SelectInput
                                            id="gender"
                                            name="gender"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Gender",
                                                },
                                                {
                                                    value: "male",
                                                    label: "Male",
                                                },
                                                {
                                                    value: "female",
                                                    label: "Female",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.gender}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* <!-- Location Details Section --> */}
                            <fieldset class="border rounded p-4">
                                <legend class="text-md font-bold text-gray-700 dark:text-gray-200">
                                    Location Details of Member
                                </legend>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="country"
                                            value="Country"
                                        />
                                        <TextInput
                                            id="country"
                                            name="country"
                                            value={data.country}
                                            className="mt-1 block w-full"
                                            autoComplete="country"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "country",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home country of member goes here."
                                        />
                                        <InputError
                                            message={errors.country}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="region"
                                            value="Region"
                                        />
                                        <TextInput
                                            id="region"
                                            name="region"
                                            value={data.region}
                                            className="mt-1 block w-full"
                                            autoComplete="region"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "region",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home region of member goes here."
                                        />
                                        <InputError
                                            message={errors.region}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="district"
                                            value="District"
                                        />
                                        <TextInput
                                            id="district"
                                            name="district"
                                            value={data.district}
                                            className="mt-1 block w-full"
                                            autoComplete="district"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "district",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home district of member goes here."
                                        />
                                        <InputError
                                            message={errors.district}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="county"
                                            value="County"
                                        />
                                        <TextInput
                                            id="county"
                                            name="county"
                                            value={data.county}
                                            className="mt-1 block w-full"
                                            autoComplete="county"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "county",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home county of member goes here."
                                        />
                                        <InputError
                                            message={errors.county}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="sub_county"
                                            value="Sub County"
                                        />
                                        <TextInput
                                            id="sub_county"
                                            name="sub_county"
                                            value={data.sub_county}
                                            className="mt-1 block w-full"
                                            autoComplete="sub_county"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "sub_county",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home sub county of member goes here."
                                        />
                                        <InputError
                                            message={errors.sub_county}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="parish"
                                            value="Parish"
                                        />
                                        <TextInput
                                            id="parish"
                                            name="parish"
                                            value={data.parish}
                                            className="mt-1 block w-full"
                                            autoComplete="parish"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "parish",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home parish of member goes here."
                                        />
                                        <InputError
                                            message={errors.parish}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="village"
                                            value="Village"
                                        />
                                        <TextInput
                                            id="village"
                                            name="village"
                                            value={data.village}
                                            className="mt-1 block w-full"
                                            autoComplete="village"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "village",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Home village of member goes here."
                                        />
                                        <InputError
                                            message={errors.village}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* <!-- Contact Details Section --> */}
                            <fieldset class="border rounded p-4">
                                <legend class="text-md font-bold text-gray-700 dark:text-gray-200">
                                    Contact Details of Member
                                </legend>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="phone_number"
                                            value="Phone Number"
                                        />
                                        <TextInput
                                            id="phone_number"
                                            name="phone_number"
                                            value={data.phone_number}
                                            className="mt-1 block w-full"
                                            autoComplete="phone_number"
                                            isFocused={false}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Member phone number goes here."
                                        />
                                        <InputError
                                            message={errors.phone_number}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* <!-- Membership Section --> */}
                            <fieldset class="border rounded p-4">
                                <legend class="text-md font-bold text-gray-700 dark:text-gray-200">
                                    Membership Details
                                </legend>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="status"
                                            value="Status"
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
                                                {
                                                    value: "Active",
                                                    label: "Active",
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
                                    <div>
                                        <InputLabel
                                            htmlFor="membership_type"
                                            value="Membership Type"
                                        />
                                        <SelectInput
                                            id="membership_type"
                                            name="membership_type"
                                            isFocused={false}
                                            className="mt-1 block w-full"
                                            options={[
                                                {
                                                    value: "",
                                                    label: "Select Membership Type",
                                                },
                                                {
                                                    value: "Ordinary",
                                                    label: "Ordinary",
                                                },
                                                {
                                                    value: "Premium",
                                                    label: "Premium",
                                                },
                                            ]}
                                            onChange={(e) =>
                                                setData(
                                                    "membership_type",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.membership_type}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {/* <!-- Submit Button --> */}
                            <div class="flex items-center justify-start">
                                <PrimaryButton
                                    className="ms-0 mb-3"
                                    disabled={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
