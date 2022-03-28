

export const BtnMenu = ({onClick}) => {
    return (
        <div
        className="text-[#66fcf1] shadow-lg shadow-black bg-black p-5 w-20 rounded-full hover:cursor-pointer border border-[#66fcf1] fixed z-10 bottom-5 right-3"
        onClick={onClick}>
            <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </div>
    );
};
