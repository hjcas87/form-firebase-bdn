
import { useSelector } from 'react-redux';
import { SongScreen } from '../album/SongScreen';
import { ContentTabs } from './ContentTabs';

export const ContentScreen = ({ data, visibleTab }) => {
    const { isPhoneScreen, isOpen } = useSelector((state) => state.ui);

    return (
        <div
            className={
                isOpen && isPhoneScreen
                    ? 'w-full blur-[3px]'
                    : 'w-full blur-none'
            }
        >
            {!data ? (
                <SongScreen />
            ) : (
                <ContentTabs data={data} visibleTab={visibleTab} />
            )}
        </div>
    );
};
