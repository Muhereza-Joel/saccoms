import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaCalendarAlt, FaUsers, FaUserCircle, FaPiggyBank, FaClipboardList, FaHandHoldingUsd, FaMoneyBillWave, FaTicketAlt } from 'react-icons/fa';

export default function Dashboard({ auth, permissions }) {
    const stats = [
        { title: "Financial Years", value: 5, icon: <FaCalendarAlt className="text-blue-500 text-3xl" /> },
        { title: "SACCO Members", value: 1200, icon: <FaUsers className="text-green-500 text-3xl" /> },
        { title: "Member Accounts", value: 950, icon: <FaUserCircle className="text-yellow-500 text-3xl" /> },
        { title: "Users", value: 50, icon: <FaUserCircle className="text-purple-500 text-3xl" /> },
        { title: "Loan Plans", value: 10, icon: <FaClipboardList className="text-red-500 text-3xl" /> },
        { title: "Loan Types", value: 6, icon: <FaHandHoldingUsd className="text-indigo-500 text-3xl" /> },
        { title: "Loans", value: 200, icon: <FaMoneyBillWave className="text-teal-500 text-3xl" /> },
        { title: "Shares", value: 150, icon: <FaPiggyBank className="text-orange-500 text-3xl" /> },
        { title: "Support Tickets", value: 15, icon: <FaTicketAlt className="text-pink-500 text-3xl" /> },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-2">
                <div className="max-w-7xl mx-auto sm:px-0 lg:px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex items-center"
                            >
                                <div className="mr-4">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                        {stat.title}
                                    </h3>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
