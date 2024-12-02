import React, { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS for the Snow theme

const QuillEditor = forwardRef(
    (
        {
            value = "",
            onChange,
            className = "",
            placeholder = "Start typing here...",
            toolbarOptions = [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"], // Text styles
                [{ list: "ordered" }, { list: "bullet" }],
                ["link"], // Media
                ["clean"], // Remove formatting
            ],
            style = {}, // Accept custom styles
            ...props
        },
        ref
    ) => {
        const modules = {
            toolbar: toolbarOptions,
        };

        const formats = [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
        ];

        // Wrapper to mimic e.target.value behavior
        const handleChange = (content) => {
            const event = {
                target: {
                    value: content,
                },
            };
            onChange(event); // Call the parent onChange handler
        };

        return (
            <ReactQuill
                ref={ref}
                value={value}
                onChange={handleChange} // Use the wrapper here
                modules={modules}
                formats={formats}
                className={`bg-white dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-md shadow-sm ${className} custom-quill-editor`}
                placeholder={placeholder}
                {...props}
                style={style} // Apply custom styles here
            />
        );
    }
);

export default QuillEditor;
