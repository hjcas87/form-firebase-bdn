export const Fields = ({ data, field }) => {
    return (
        <>
            <div className="my-3">
                {field && (
                    <div className="w-full flex justify-between items-center">
                        <p className="font-light">{field}</p>
                        <div
                            style={
                                data && data !== ''
                                    ? { backgroundColor: 'rgb(4, 120, 87)' }
                                    : { backgroundColor: 'rgb(190, 18, 60)' }
                            }
                            className="w-5 h-5 rounded-full border-2 border-white text-white flex justify-center items-center shadow-sm shadow-black/75 text-sm"
                        >
                            {data && data !== '' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                '!'
                            )}
                        </div>
                    </div>
                )}

                {data !== null ? (
                    data && data !== '' ? (
                        <p className="capitalize">{data}</p>
                    ) : (
                        <p className="capitalize">- -</p>
                    )
                ) : null}
            </div>
        </>
    );
};
