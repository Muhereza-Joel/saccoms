export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="currentColor"
            width="100"
            height="100"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30,10 L50,10 L50,40 L70,40 L70,10 L90,10 L90,80 L70,80 L70,50 L50,50 L50,80 L30,80 L30,50 L10,50 L10,10 L30,10 Z"
            />
            <text x="10" y="40" fontSize="30" fill="black" fontWeight="bold">S</text>
            <text x="40" y="70" fontSize="30" fill="black" fontWeight="bold">M</text>
        </svg>
    );
}
