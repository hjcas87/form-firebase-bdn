import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanRelease } from '../actions/releases';
import { isMenuOpen, setMenu } from '../actions/ui';
import { formAlbumData } from '../data/formAlbumData';
import { formSimpleData } from '../data/formSimpleData';
import { data } from '../data/menuPrincipal';
import { ContentScreen } from './components/ContentScreen';
import { InitialScreen } from './components/InitialScreen';
import { Sidebar } from './components/Sidebar';
import { SpinnerScreen } from './components/SpinnerScreen';

export const DashboardScreen = () => {
    const { releases } = useSelector((state) => state.realeases);
    const [visibleTab, setVisibleTab] = useState(data[0].id);
    const { loading } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isMenuOpen(false));
        dispatch(cleanRelease());
        dispatch(setMenu([]));
    }, []);

    return (
        <>
            {loading ? (
                <SpinnerScreen />
            ) : (
                <div className="w-full flex gap-5 mt-10 justify-center">
                    {releases.length ? (
                        <>
                            <Sidebar
                                data={data}
                                visibleTab={visibleTab}
                                setVisibleTab={setVisibleTab}
                            />
                            <ContentScreen
                                data={data}
                                visibleTab={visibleTab}
                            />
                        </>
                    ) : (
                        <InitialScreen />
                    )}
                </div>
            )}
        </>
    );
};
