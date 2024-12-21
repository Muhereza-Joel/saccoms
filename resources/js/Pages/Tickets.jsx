import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertError from "@/Components/AlertError";
import TicketList from "@/Components/TicketList";
import { usePermission } from "@/Hooks/usePermissions";
import Modal from "@/Components/Modal";
import SelectInput from "@/Components/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Pagination from "@/Components/Pagination";

export default function Tickets({
    auth,
    permissions,
    createdTickets,
    assignedTickets,
    createdTicketUser,
    createdTicketsLinks,
    assignedTicketUser,
    assignedTicketsLinks,
    success,
    error,
}) {
    const [activeTab, setActiveTab] = useState("created");
    const { can } = usePermission(permissions);
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const { data, setData, put, processing, errors, reset } = useForm({
        status: "In Progress",
    });

    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setData("status", "In Progress");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedTicket(null);
    };

    const updateStatus = () => {
        if (selectedTicket) {
            put(route("tickets.update", selectedTicket.id), {
                data,
            });

            closeModal();
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
                        Support Tickets
                    </h2>

                    {/* Right-aligned button */}
                    {can("Create Support Ticket") && (
                        <Link
                            href={route("tickets.create")}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                        >
                            Create Support Ticket
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Support Tickets" />

            <div className="p-4">
                {/* Display Success and Error Messages */}
                {success && <AlertSuccess success={success} />}
                {error && <AlertError error={error} />}

                {/* Tabs for Navigation */}
                <div className="flex space-x-4 border-b pb-2">
                    <button
                        onClick={() => setActiveTab("created")}
                        className={`px-4 py-2 ${
                            activeTab === "created"
                                ? "border-b-2 border-blue-600 dark:text-gray-200 dark:border-gray-200 text-blue-600"
                                : "text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                    >
                        Your Tickets
                    </button>
                    <button
                        onClick={() => setActiveTab("assigned")}
                        className={`px-4 py-2 ${
                            activeTab === "assigned"
                                ? "border-b-2 border-blue-600 dark:text-gray-200 dark:border-gray-200 text-blue-600"
                                : "text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                        }`}
                    >
                        Tickets Assigned
                    </button>
                </div>

                {/* Ticket List */}
                <div className="mt-4">
                    {activeTab === "created" && (
                        <>
                            <TicketList
                                tickets={createdTickets}
                                permissions={permissions}
                                allowEdit={false}
                                createdTicketUser={createdTicketUser}
                                assignedTicketUser={assignedTicketUser}
                                openModal={openModal}
                            />

                            <Pagination links={createdTicketsLinks} />
                        </>
                    )}
                    {activeTab === "assigned" && (
                        <>
                            <TicketList
                                tickets={assignedTickets}
                                permissions={permissions}
                                allowEdit={true}
                                assignedTicketUser={assignedTicketUser}
                                createdTicketUser={createdTicketUser}
                                openModal={openModal}
                            />

                            <Pagination links={assignedTicketsLinks} />
                        </>
                    )}
                </div>

                {/* Modal for Updating Status */}
                {showModal && (
                    <Modal show={showModal} onClose={closeModal}>
                        <div className="p-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Update Ticket Status
                            </h2>
                            <SelectInput
                                options={[
                                    {
                                        value: "In Progress",
                                        label: "In Progress",
                                    },
                                    { value: "Resolved", label: "Resolved" },
                                    { value: "Closed", label: "Closed" },
                                ]}
                                className="block w-full"
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="mr-2 text-gray-900 dark:text-white"
                                >
                                    Cancel
                                </button>
                                <PrimaryButton onClick={updateStatus}>
                                    Update
                                </PrimaryButton>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
