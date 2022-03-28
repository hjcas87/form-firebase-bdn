import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startNewRelease } from '../../actions/releases';
import {
    isMenuOpen,
    newAlbumRelease,
    newSimpleRelease,
} from '../../actions/ui';
import { formSimpleData } from '../../data/formSimpleData';

export const SidebarButtons = ({ data, setVisibleTab, visibleTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isPhoneScreen, isOpen, albumRelease, simpleRelease } = useSelector(
        (state) => state.ui
    );
    const handleClick = (item) => {
        // console.log(formSimpleData);
        if (item.tabTitle === 'Crear álbum') {
            dispatch(startNewRelease('album'));
            return;
        } else if (item.tabTitle === 'Crear simple') {
            dispatch(startNewRelease('simple'));
            return;
        }
        if (isPhoneScreen && isOpen) {
            dispatch(isMenuOpen(!isOpen));
            document
                .querySelector('#sidebar')
                .classList.toggle('translate-x-0');
            document
                .querySelector('#sidebar')
                .classList.toggle('-translate-x-[22rem]');
        }
        setVisibleTab(item.id);
    };

    useEffect(() => {
        if (albumRelease) {
            navigate('/album');
            dispatch(newAlbumRelease(false));
        } else if (simpleRelease) {
            navigate('/simple');
            dispatch(newSimpleRelease(false));
        }
    }, [albumRelease, simpleRelease]);
    if (!data) {
        return <></>;
    }

    return (
        <>
            {data.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleClick(item)}
                    style={{ width: '200px' }}
                    className={
                        visibleTab === item.id
                            ? 'md:hover:bg-[#1f2833] border-b pb-2 text-[#66fcf1] md:bg-[#1f2833] md:py-3 pr-4 md:pl-4 md:rounded-3xl mb-2 font-normal hover:cursor-pointer flex md:border  md:border-[#66fcf1]'
                            : 'md:hover:bg-[#1f2833] border-b pb-2 text-[#66fcf1] md:bg-[#0b0c10] md:py-3 pr-4 md:pl-4 md:rounded-3xl mb-2 font-normal hover:cursor-pointer flex md:border border-[#888] md:border-[#66fcf1]'
                    }
                >
                    {item.tabTitle}
                </div>
            ))}
        </>
    );
};
