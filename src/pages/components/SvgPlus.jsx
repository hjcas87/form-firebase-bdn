import { useSelector } from "react-redux";


export const SvgPlus = ({onClick}) => {
    const { isPhoneScreen, isOpen } = useSelector((state) => state.ui);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 justify-self-end hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={isPhoneScreen && isOpen ? null : onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    )
}
