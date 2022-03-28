import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFromSong } from '../../actions/ui';
import { BtnReturn } from './BtnReturn';
import { SidebarButtons } from './SidebarButtons';
import { SidebarLogo } from './SidebarLogo';

export const Sidebar = ({ data, setVisibleTab, visibleTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isPhoneScreen } = useSelector((state) => state.ui);
    const handleReturn = () => {
        localStorage.removeItem('activeRelease');
        if (!data || !data.length) {
            dispatch(setFromSong(true));
            navigate('/album');
            return;
        }
        navigate('/');
    };
    // console.log(data);
    return (
        <div
            id="sidebar"
            className="basis-80 bg-black md:bg-transparent z-10 fixed overflow-hidden p-5 md:p-0 md:static flex flex-col md:translate-x-0 -translate-x-[22rem] top-0 left-0 bottom-0 pt-32  md:justify-start transition-transform duration-1000 border-r md:border-0 w-[16rem] md:w-full"
        >
            <div className="z-11 overflow-auto md:static flex flex-col w-[22rem]">
                {isPhoneScreen && <SidebarLogo />}

                <>
                    {(!data || !data.length || !data[0].home) && (
                        <BtnReturn onClick={handleReturn} />
                    )}
                    <SidebarButtons
                        data={data}
                        visibleTab={visibleTab}
                        setVisibleTab={setVisibleTab}
                    />
                </>
            </div>
        </div>
    );
};
