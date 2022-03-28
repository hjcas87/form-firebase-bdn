
export const SpinnerScreen = () => {

    return (
        <div
            className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center h-screen"
            style={{ backgroundColor: 'rgba(0,0,0, .5' }}
        >
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
        </div>
    );
};
