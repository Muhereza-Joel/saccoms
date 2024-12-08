import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AlertSuccess from "@/Components/AlertSuccess";
import AlertError from "@/Components/AlertError";
import TicketList from "@/Components/TicketList";

export default function Tickets({
    auth,
    permissions,
    createdTickets,
    assignedTickets,
    createdTicketUser,
    assignedTicketUser,
    success,
    error,
}) {
    const [activeTab, setActiveTab] = useState("created");

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Support Tickets
                </h2>
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
                        <TicketList
                            tickets={createdTickets}
                            permissions={permissions}
                            allowEdit={false} 
                            createdTicketUser={createdTicketUser}
                        />
                    )}
                    {activeTab === "assigned" && (
                        <TicketList
                            tickets={assignedTickets}
                            permissions={permissions}
                            allowEdit={true}
                            assignedTicketUser={assignedTicketUser}
                        />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
