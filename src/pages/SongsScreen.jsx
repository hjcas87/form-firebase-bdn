import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { activeRelease } from '../actions/releases';
import { isMenuOpen, setTabs, tabs } from '../actions/ui';
import { getSong } from '../helpers/getSong';
import { ContentScreen } from './components/ContentScreen';
import { Sidebar } from './components/Sidebar';
import { SpinnerScreen } from './components/SpinnerScreen';

export const SongsScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.ui);
    const { active: release } = useSelector((state) => state.realeases);
    const [visibleTab, setVisibleTab] = useState('');

    useEffect(() => {
        dispatch(isMenuOpen(false));
        dispatch(tabs(visibleTab));
        dispatch(setTabs(setVisibleTab));
        const localRelease = JSON.parse(localStorage.getItem('activeRelease'));
        if (localRelease) {
            dispatch(activeRelease(localRelease.id, localRelease));
        }
    }, []);

    if (!release) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="w-full flex gap-5 mt-10 overflow-hidden">
                {loading && <SpinnerScreen />}
                <Sidebar />
                {!loading && <ContentScreen />}
            </div>
        </>
    );
};
