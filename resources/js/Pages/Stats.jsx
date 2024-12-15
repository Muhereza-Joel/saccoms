import { FaCalendarAlt, FaUsers, FaUserCircle, FaPiggyBank, FaClipboardList, FaHandHoldingUsd, FaMoneyBillWave, FaTicketAlt } from 'react-icons/fa';

export default function Stats({financialYears, members, accounts, users, loanPlans, loanTypes, loans, shares, tickets}) {
    const stats = [
        { title: "Financial Years", value: financialYears, icon: <FaCalendarAlt className="text-blue-500 text-3xl" /> },
        { title: "SACCO Members", value: members, icon: <FaUsers className="text-green-500 text-3xl" /> },
        { title: "Member Accounts", value: accounts, icon: <FaUserCircle className="text-yellow-500 text-3xl" /> },
        { title: "Users", value: users, icon: <FaUserCircle className="text-purple-500 text-3xl" /> },
        { title: "Loan Plans", value: loanPlans, icon: <FaClipboardList className="text-red-500 text-3xl" /> },
        { title: "Loan Types", value: loanTypes, icon: <FaHandHoldingUsd className="text-indigo-500 text-3xl" /> },
        { title: "Loans", value: loans, icon: <FaMoneyBillWave className="text-teal-500 text-3xl" /> },
        { title: "Shares Holders", value: shares, icon: <FaPiggyBank className="text-orange-500 text-3xl" /> },
        { title: "Support Tickets", value: tickets, icon: <FaTicketAlt className="text-pink-500 text-3xl" /> },
    ];

    return (
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
    );
}
