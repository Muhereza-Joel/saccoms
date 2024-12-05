import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertError from "@/Components/AlertError";
import { usePermission } from "@/Hooks/usePermissions";

export default function AssignPermissions({
    auth,
    roles,
    permissions,
    userPermissions,
    success,
    error,
}) {
    const [selectedRole, setSelectedRole] = useState(null); // Store the selected role
    const { data, setData, post, processing } = useForm({
        assignedPermissions: [], // Ensure this is an array
    });

    const { can } = usePermission(userPermissions);

    // Automatically select the first role on component load
    useEffect(() => {
        if (roles.length > 0) {
            const firstRole = roles[0];
            setSelectedRole(firstRole);
            setData(
                "assignedPermissions",
                firstRole.permissions.map((p) => p.uuid) // Map permissions to UUIDs
            );
        }
    }, [roles]);

    const handleSelectRole = (role) => {
        setSelectedRole(role);
        setData(
            "assignedPermissions",
            role.permissions.map((p) => p.uuid) // Map permissions to UUIDs
        );
    };

    const isChecked = (uuid) => {
        return Array.isArray(data.assignedPermissions)
            ? data.assignedPermissions.includes(uuid)
            : false;
    };

    const togglePermission = (uuid) => {
        setData((prevData) => {
            const assignedPermissions = Array.isArray(
                prevData.assignedPermissions
            )
                ? prevData.assignedPermissions
                : [];

            const isAssigned = assignedPermissions.includes(uuid);
            return {
                ...prevData,
                assignedPermissions: isAssigned
                    ? assignedPermissions.filter((id) => id !== uuid)
                    : [...assignedPermissions, uuid],
            };
        });
    };

    // Toggle all permissions
    const toggleAllPermissions = (checked) => {
        if (checked) {
            // Check all permissions
            setData(
                "assignedPermissions",
                permissions.map((p) => p.uuid)
            );
        } else {
            // Uncheck all permissions
            setData("assignedPermissions", []);
        }
    };

    const savePermissions = (e) => {
        e.preventDefault();
        if (selectedRole) {
            post(route("roles.save-assigned-permissions", selectedRole), {
                onSuccess: () => {},
                onError: () => {},
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={userPermissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Assign Permissions to Roles
                </h2>
            }
        >
            <Head title="Assign Permissions to Roles" />
            <div className="py-2">
                {success && <AlertSuccess success={success} />}
                {error && <AlertError error={error} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Roles
                        </h3>
                        <ul className="mt-4 space-y-2">
                            {roles.map((role) => {
                                // Check if the role is root or admin
                                const isRestrictedRole =
                                    role.name === "root" ||
                                    role.name === "admin";

                                // Check permission for restricted roles
                                if (isRestrictedRole && !can("Create Role")) {
                                    return null; // Skip rendering this role if the user lacks permission
                                }

                                return (
                                    <li
                                        key={role.uuid}
                                        className={`p-2 rounded-md cursor-pointer ${
                                            selectedRole?.uuid === role.uuid
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                                        }`}
                                        onClick={() => handleSelectRole(role)}
                                    >
                                        {role.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                        {selectedRole ? (
                            <form onSubmit={savePermissions}>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Permissions for {selectedRole.name} role
                                </h3>
                                <div className="flex items-center mt-4 justify-end">
                                    <label
                                        htmlFor="select-all"
                                        className="me-3 text-gray-800 dark:text-gray-200"
                                    >
                                        Select All
                                    </label>

                                    <input
                                        type="checkbox"
                                        id="select-all"
                                        onChange={(e) =>
                                            toggleAllPermissions(
                                                e.target.checked
                                            )
                                        }
                                        checked={
                                            data.assignedPermissions.length ===
                                            permissions.length
                                        }
                                        className="form-checkbox text-blue-500 me-2"
                                    />
                                </div>

                                <ul className="mt-4 space-y-2">
                                    {permissions.map((permission) => (
                                        <li
                                            key={permission.uuid}
                                            className="flex items-center justify-between p-2 border-b dark:border-gray-600"
                                        >
                                            <span className="text-gray-800 dark:text-gray-200">
                                                {permission.name}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={isChecked(
                                                    permission.uuid
                                                )}
                                                onChange={() =>
                                                    togglePermission(
                                                        permission.uuid
                                                    )
                                                }
                                                className="form-checkbox text-blue-500"
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 flex justify-end">
                                    {can("Assign Permission") && (
                                        <PrimaryButton
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </PrimaryButton>
                                    )}
                                </div>
                            </form>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">
                                Select a role to manage permissions.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
