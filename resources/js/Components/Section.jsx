export default function Section({ title, children }) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {title}
            </h3>
            <div className="space-y-2">{children}</div>
        </div>
    );
}