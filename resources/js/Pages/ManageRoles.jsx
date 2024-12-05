import AlertError from "@/Components/AlertError";
import AlertSuccess from "@/Components/AlertSuccess";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { usePermission } from "@/Hooks/usePermissions";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ManageRolesPermissions({
    auth,
    success,
    error,
    roles,
    permissions,
    userPermissions,
}) {
    const [activeTab, setActiveTab] = useState("roles");
    const [editingRole, setEditingRole] = useState(null);
    const [editingPermission, setEditingPermission] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { can } = usePermission(userPermissions);

    const {
        data: roleData,
        setData: setRoleData,
        post: postRole,
        put: putRole,
        delete: deleteRole,
        processing: roleProcessing,
        errors: roleErrors,
        reset: resetRole,
    } = useForm({ name: "" });

    const {
        data: permissionData,
        setData: setPermissionData,
        post: postPermission,
        put: putPermission,
        delete: deletePermission,
        processing: permissionProcessing,
        errors: permissionErrors,
        reset: resetPermission,
    } = useForm({ name: "" });

    const submitRole = (e) => {
        e.preventDefault();
        postRole(route("roles.store"), {
            onSuccess: () => resetRole(),
        });
    };

    const submitEditRole = (e) => {
        e.preventDefault();
        // Assuming the role has a 'uuid' for identification
        putRole(route("roles.update", editingRole.uuid), {
            data: { name: roleData.name },
            onSuccess: () => {
                resetRole(); // Reset the form
                setEditingRole(null); // Clear the editing state
            },
        });
    };

    const submitPermission = (e) => {
        e.preventDefault();
        postPermission(route("permissions.store"), {
            onSuccess: () => resetPermission(),
        });
    };

    const submitEditPermission = (e) => {
        e.preventDefault();
        // Assuming the permission has a 'uuid' for identification
        putPermission(route("permissions.update", editingPermission.uuid), {
            data: { name: permissionData.name },
            onSuccess: () => {
                resetPermission(); // Reset the form
                setEditingPermission(null); // Clear the editing state
            },
        });
    };

    const handleEditRole = (role) => {
        setEditingRole(role);
        setRoleData({ name: role.name });
    };

    const handleEditPermission = (permission) => {
        setEditingPermission(permission);
        setPermissionData({ name: permission.name });
    };

    const handleDeleteRole = (role) => {
        setConfirmDelete({ type: "role", uuid: role.uuid });
    };

    const handleDeletePermission = (permission) => {
        setConfirmDelete({ type: "permission", uuid: permission.uuid });
    };

    const deleteItem = () => {
        if (confirmDelete.type === "role") {
            deleteRole(route("roles.destroy", confirmDelete.uuid), {
                onSuccess: () => {
                    console.log("Role deleted successfully");
                    // Optionally update your state to reflect the changes
                },
                onError: (error) => {
                    console.log("Error deleting role:", error);
                },
            });
        } else if (confirmDelete.type === "permission") {
            deletePermission(route("permissions.destroy", confirmDelete.uuid), {
                onSuccess: () => {
                    console.log("Permission deleted successfully");
                    // Optionally update your state to reflect the changes
                },
                onError: (error) => {
                    console.log("Error deleting permission:", error);
                },
            });
        }
        setConfirmDelete(null); // Reset confirmation after deletion
    };

    const cancelDelete = () => {
        setConfirmDelete(null); // Reset confirmation if canceled
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={userPermissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Manage Roles & Permissions
                </h2>
            }
        >
            <Head title="Manage Roles & Permissions" />

            <div className="py-2">
                {/* Display Success and Error Messages */}
                {success && <AlertSuccess success={success} />}
                {error && <AlertError error={error} />}

                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mx-2">
                    <div className="p-6">
                        {/* Tabs for Roles and Permissions */}
                        <div className="flex space-x-4 mb-6">
                            {can("Create Role") && (
                                <button
                                    className={`px-4 py-2 rounded ${
                                        activeTab === "roles"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300"
                                    }`}
                                    onClick={() => setActiveTab("roles")}
                                >
                                    Manage Roles
                                </button>
                            )}

                            {can("Create Permissions") && (
                                <button
                                    className={`px-4 py-2 rounded ${
                                        activeTab === "permissions"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300"
                                    }`}
                                    onClick={() => setActiveTab("permissions")}
                                >
                                    Manage Permissions
                                </button>
                            )}
                        </div>

                        {/* Role Management */}
                        {activeTab === "roles" && (
                            <>
                                {can("Create Role") && (
                                    <form
                                        onSubmit={
                                            editingRole
                                                ? submitEditRole
                                                : submitRole
                                        }
                                    >
                                        <div className="mt-4 space-y-6">
                                            <div>
                                                <InputLabel
                                                    htmlFor="roleName"
                                                    value="Role"
                                                />
                                                <TextInput
                                                    id="roleName"
                                                    name="name"
                                                    type="text"
                                                    value={roleData.name}
                                                    autoComplete="off"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setRoleData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter role name here."
                                                />
                                                <InputError
                                                    message={roleErrors.name}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="flex items-center justify-start">
                                                <PrimaryButton
                                                    disabled={roleProcessing}
                                                >
                                                    {editingRole
                                                        ? "Update Role"
                                                        : "Save Role"}
                                                </PrimaryButton>
                                                <SecondaryButton
                                                    className="ms-2"
                                                    onClick={(e) => resetRole()}
                                                >
                                                    Reset Form
                                                </SecondaryButton>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {can("View Roles") && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold text-lg mb-2 text-dark-200 dark:text-gray-200">
                                            Existing Roles
                                        </h3>
                                        {roles.length > 0 ? (
                                            <table className="min-w-full table-auto">
                                                <thead className="border-b">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-dark-200 dark:text-gray-200">
                                                            Role Name
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-dark-200 dark:text-gray-200">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {roles.map((role) => (
                                                        <tr
                                                            key={role.uuid}
                                                            className="border-b dark:border-gray-600"
                                                        >
                                                            <td className="px-4 py-2 text-dark-200 dark:text-gray-200">
                                                                {role.name}
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                <div className="flex space-x-2">
                                                                    {can(
                                                                        "Update Role"
                                                                    ) && (
                                                                        <SecondaryButton
                                                                            onClick={() =>
                                                                                handleEditRole(
                                                                                    role
                                                                                )
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </SecondaryButton>
                                                                    )}

                                                                    {can(
                                                                        "Delete Role"
                                                                    ) && (
                                                                        <DangerButton
                                                                            onClick={() =>
                                                                                handleDeleteRole(
                                                                                    role
                                                                                )
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </DangerButton>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-dark-200 dark:text-gray-200">
                                                No roles found.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* Permission Management */}
                        {activeTab === "permissions" && (
                            <>
                                {can("Create Permissions") && (
                                    <form
                                        onSubmit={
                                            editingPermission
                                                ? submitEditPermission
                                                : submitPermission
                                        }
                                    >
                                        <div className="mt-4 space-y-6">
                                            <div>
                                                <InputLabel
                                                    htmlFor="permissionName"
                                                    value="Permission"
                                                />
                                                <TextInput
                                                    id="permissionName"
                                                    name="name"
                                                    type="text"
                                                    value={permissionData.name}
                                                    autoComplete="off"
                                                    className="mt-1 block w-full"
                                                    onChange={(e) =>
                                                        setPermissionData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter permission name here."
                                                />
                                                <InputError
                                                    message={
                                                        permissionErrors.name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="flex items-center justify-start">
                                                <PrimaryButton
                                                    disabled={
                                                        permissionProcessing
                                                    }
                                                >
                                                    {editingPermission
                                                        ? "Update Permission"
                                                        : "Save Permission"}
                                                </PrimaryButton>
                                                <SecondaryButton
                                                    className="ms-2"
                                                    onClick={(e) =>
                                                        resetPermission()
                                                    }
                                                >
                                                    Reset Form
                                                </SecondaryButton>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {can("View Permissions") && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold text-lg mb-2 text-dark-200 dark:text-gray-200">
                                            Existing Permissions
                                        </h3>
                                        {permissions.length > 0 ? (
                                            <table className="min-w-full table-auto">
                                                <thead className="border-b">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-dark-200 dark:text-gray-200">
                                                            Permission Name
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-dark-200 dark:text-gray-200">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {permissions.map(
                                                        (permission) => (
                                                            <tr
                                                                key={
                                                                    permission.uuid
                                                                }
                                                                className="border-b dark:border-gray-600"
                                                            >
                                                                <td className="px-4 py-2 text-dark-200 dark:text-gray-200">
                                                                    {
                                                                        permission.name
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    <div className="flex space-x-2">
                                                                        {can(
                                                                            "Update Permission"
                                                                        ) && (
                                                                            <SecondaryButton
                                                                                onClick={() =>
                                                                                    handleEditPermission(
                                                                                        permission
                                                                                    )
                                                                                }
                                                                            >
                                                                                Edit
                                                                            </SecondaryButton>
                                                                        )}

                                                                        {can(
                                                                            "Delete Permission"
                                                                        ) && (
                                                                            <DangerButton
                                                                                onClick={() =>
                                                                                    handleDeletePermission(
                                                                                        permission
                                                                                    )
                                                                                }
                                                                            >
                                                                                Delete
                                                                            </DangerButton>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-dark-200 dark:text-gray-200">
                                                No permissions found.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Confirmation Modal for Deletion */}
            {(can("Delete Role") && can("Delete Permission")) &&
                confirmDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-900 dark:text-gray-300">
                                Are you sure you want to delete this{" "}
                                {confirmDelete.type}?
                            </p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    onClick={cancelDelete}
                                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>

                                {/* Check specific delete permission */}
                                {(confirmDelete.type === "role" &&
                                    can("Delete Role")) ||
                                (confirmDelete.type === "permission" &&
                                    can("Delete Permission")) ? (
                                    <button
                                        onClick={deleteItem}
                                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                                    >
                                        Delete
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
        </AuthenticatedLayout>
    );
}
