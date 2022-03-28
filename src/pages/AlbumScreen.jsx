import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { activeRelease } from '../actions/releases';
import { isMenuOpen, setFromSong, setMenu, setTabs, tabs } from '../actions/ui';
import { data } from '../data/menuAlbum';
import { menuSimple } from '../data/menuSimple';
// import { data } from '../data/menuAlbum';
import { ContentScreen } from './components/ContentScreen';
import { Sidebar } from './components/Sidebar';
import { SpinnerScreen } from './components/SpinnerScreen';

export const AlbumScreen = () => {
    const { active: release } = useSelector((state) => state.realeases);
    const { loading, songTab, data: menu } = useSelector((state) => state.ui);
    const navigate = useNavigate();
    const [visibleTab, setVisibleTab] = useState([]);
    const dispatch = useDispatch();
    const [local, setLocal] = useState(null);
    const [noLocal, setNoLocal] = useState(true);
    useEffect(() => {
        if (menu.length) {
            setVisibleTab(menu[0].id);
        }

        if (local) {
            dispatch(activeRelease(local.id, local));
            if (release && release.type === 'album') {
                dispatch(setMenu(data));
                navigate('/album');
            } else {
                dispatch(setMenu(menuSimple));
                navigate('/simple');
            }
        } else {
            setNoLocal(false);
        }
    }, [menu, local]);
    useEffect(() => {
        dispatch(isMenuOpen(false));
        if (songTab) {
            setVisibleTab(4);
            dispatch(setFromSong(false));
        } else {
            dispatch(tabs(visibleTab));
        }
        dispatch(setTabs(setVisibleTab));
    }, [songTab, visibleTab, setVisibleTab]);

    useEffect(() => {
        const localRelease =
            JSON.parse(localStorage.getItem('activeRelease')) || null;
        setLocal(localRelease);
    }, []);

    if (!release && !noLocal) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <div className="w-full flex gap-5 mt-10">
                {loading && <SpinnerScreen />}
                <Sidebar
                    data={menu}
                    visibleTab={visibleTab}
                    setVisibleTab={setVisibleTab}
                />

                <ContentScreen data={menu} visibleTab={visibleTab} />
            </div>
        </>
    );
};
