export default function RecentActivity() {
    const activities = [
        { id: 1, description: "User John created a loan plan." },
        { id: 2, description: "Loan application approved for Member #345." },
        { id: 3, description: "Support ticket resolved by admin." },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h3>
            <ul className="text-gray-600 dark:text-gray-400">
                {activities.map((activity) => (
                    <li key={activity.id} className="mb-2">
                        - {activity.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
