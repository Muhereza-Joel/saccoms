export default function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{label}:</span>
            <span>{value || "N/A"}</span>
        </div>
    );
}