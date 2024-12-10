export default function LongTextInfoRow({ label, value }) {
    return (
        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{label}:</span>
            <div
                className="max-w-full overflow-x-auto whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: value || "N/A" }}
            />
        </div>
    );
}
