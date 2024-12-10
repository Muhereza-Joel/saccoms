import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function RepaymentSchedule({ loan }) {
    const [nextDueDate, setNextDueDate] = useState(null);
    const [installments, setInstallments] = useState([]);
    
    useEffect(() => {
        if (loan.repayment_schedules && loan.repayment_schedules.length > 0) {
            const sortedSchedules = loan.repayment_schedules.sort(
                (a, b) => new Date(a.due_date) - new Date(b.due_date)
            );
            setInstallments(sortedSchedules);

            // Calculate the next due date based on the current date
            const today = new Date();
            const nextInstallment = sortedSchedules.find(
                (schedule) => new Date(schedule.due_date) > today
            );

            if (nextInstallment) {
                setNextDueDate(nextInstallment.due_date);
            } else {
                setNextDueDate(sortedSchedules[0].due_date); // If no upcoming installment, set to first due date
            }
        }
    }, [loan]);

    const formatDate = (dateString) => {
        return format(new Date(dateString), "MMM dd, yyyy");
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Total Balance:</span>
                <span>{loan.outstanding_balance || "N/A"}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Repayment Period:</span>
                <span>{loan.repayment_period} months</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Next Payment Date:</span>
                <span>{nextDueDate ? formatDate(nextDueDate) : "No Upcoming Payments"}</span>
            </div>

            <div className="space-y-2">
                {installments.length > 0 && (
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span>Repayment Schedule:</span>
                    </div>
                )}

                {installments.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Installment {index + 1}:</span>
                        <span>
                            {formatDate(schedule.due_date)} - UGX{" "}
                            {schedule.amount_due}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
