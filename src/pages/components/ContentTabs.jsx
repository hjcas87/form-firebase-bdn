import { useEffect } from "react";

export const ContentTabs = ({ data, visibleTab }) => {
    // useEffect(() => {
    //     window.scroll({ top: 0 });
    // }, [visibleTab]);
    return (
        <>
            {data.map((item) => (
                <div key={item.id} className="overflow-hidden">
                    {visibleTab === item.id && item.tabContent}
                </div>
            ))}
        </>
    );
};
