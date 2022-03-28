export const BtnReturn = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{ width: '200px' }}
            className="md:hover:bg-[#1f2833] border-b pb-2 text-[#66fcf1] bg-transparent  md:py-3 pr-4 md:pl-4 md:rounded-3xl mb-2 font-normal hover:cursor-pointer flex md:border border-[#888] md:border-[#66fcf1]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
            </svg>
            Volver
        </div>
    );
};
