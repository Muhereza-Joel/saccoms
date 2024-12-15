import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    FaCalendarAlt,
    FaUsers,
    FaUserCircle,
    FaPiggyBank,
    FaClipboardList,
    FaHandHoldingUsd,
    FaMoneyBillWave,
    FaTicketAlt,
} from "react-icons/fa";
import Stats from "./Stats";

export default function Dashboard({
    auth,
    permissions,
    financialYears,
    members,
    accounts,
    users,
    loanPlans,
    loanTypes,
    loans,
    shares,
    tickets,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            permissions={permissions}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="p-2">
                <Stats
                    financialYears={financialYears}
                    members={members}
                    accounts={accounts}
                    users={users}
                    loanPlans={loanPlans}
                    loanTypes={loanTypes}
                    loans={loans}
                    shares={shares}
                    tickets={tickets}
                />
            </div>
        </AuthenticatedLayout>
    );
}
