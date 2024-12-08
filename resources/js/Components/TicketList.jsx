import { FaSync, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { usePermission } from "@/Hooks/usePermissions";

export default function TicketList({
    tickets,
    createdTicketUser,
    assignedTicketUser,
    permissions,
    allowEdit,
    openModal,
}) {
    const [expanded, setExpanded] = useState(null);

    const toggleAccordion = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const { can } = usePermission(permissions)

    const deleteTicket = (id) => {
        if (confirm("Are you sure you want to delete this ticket?")) {
            // Handle delete logic
        }
    };

    return tickets.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
            No tickets available.
        </p>
    ) : (
        <div className="grid grid-cols-1 gap-2">
            {tickets.map((ticket) => (
                <div
                    key={ticket.id}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full dark:bg-blue-500">
                                    Category: {ticket.issue_category}
                                </span>
                                <span
                                    className={`px-3 mx-2 py-1 text-sm text-white rounded-full ${
                                        ticket.status === "Open"
                                            ? "bg-green-600"
                                            : ticket.status === "In Progress"
                                            ? "bg-yellow-500"
                                            : ticket.status === "Resolved"
                                            ? "bg-blue-600"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    Status: {ticket.status}
                                </span>

                                {createdTicketUser ? (
                                    <div className="my-4">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                            You assigned ticket to{" "}
                                            {createdTicketUser.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            On{" "}
                                            {new Date(
                                                createdTicketUser.created_at
                                            ).toLocaleDateString()}{" "}
                                            at{" "}
                                            {new Date(
                                                createdTicketUser.created_at
                                            ).toLocaleTimeString()}
                                        </p>
                                    </div>
                                ) : assignedTicketUser ? (
                                    <div className="my-4">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                            Ticket Opened by{" "}
                                            {assignedTicketUser.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            On{" "}
                                            {new Date(
                                                ticket.created_at
                                            ).toLocaleDateString()}{" "}
                                            at{" "}
                                            {new Date(
                                                ticket.created_at
                                            ).toLocaleTimeString()}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="my-4">
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                            Unassigned Ticket
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Created on{" "}
                                            {new Date(
                                                created_at
                                            ).toLocaleDateString()}{" "}
                                            at{" "}
                                            {new Date(
                                                created_at
                                            ).toLocaleTimeString()}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                {can('Update Support Ticket') && (
                                    <button
                                        onClick={() => openModal(ticket)}
                                        className="text-blue-500 hover:text-blue-700 transition"
                                    >
                                        <FaSync size={15} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteTicket(ticket.id)}
                                    className="text-red-400 hover:text-red-700 transition"
                                >
                                    <FaTrash size={15} />
                                </button>
                            </div>
                        </div>
                        <hr className="my-4 border-t border-gray-300 dark:border-gray-600" />

                        <button
                            onClick={() => toggleAccordion(ticket.id)}
                            className="text-sm font-medium text-gray-600 dark:text-gray-300"
                        >
                            {expanded === ticket.id
                                ? "Hide Details"
                                : "Show Details"}
                        </button>
                        {expanded === ticket.id && (
                            <div
                                className="mt-2 text-gray-600 dark:text-gray-300"
                                dangerouslySetInnerHTML={{
                                    __html: ticket.description,
                                }}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
