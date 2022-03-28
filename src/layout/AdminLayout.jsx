import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { isMenuOpen, windowSize } from '../actions/ui';
import { HeaderLogo } from '../components/HeaderLogo';
import { LogOut } from '../components/LogOut';
import { BtnMenu } from '../pages/components/BtnMenu';
// const imgPath = require.context('../assets', true);

export const AdminLayout = () => {
    const { name } = useSelector((state) => state.auth);
    const { isPhoneScreen, isOpen } = useSelector((state) => state.ui);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(startLogout());
    };
    useEffect(() => {
        if (window.innerWidth <= 768) {
            dispatch(windowSize(true));
        }
        const resizing = () => {
            if (window.innerWidth <= 768) {
                dispatch(windowSize(true));
            } else {
                dispatch(windowSize(false));
            }
        };
        window.addEventListener('resize', resizing);
        return () => {
            window.removeEventListener('resize', resizing);
        };
    }, []);
    useEffect(() => {
        const inputs = document.querySelectorAll('input');
        const buttons = document.querySelectorAll('button');
        if (!isOpen) {
            inputs.forEach((ipt) => (ipt.disabled = false));
            buttons.forEach((btn) => (btn.disabled = false));
        } else {
            inputs.forEach((ipt) => (ipt.disabled = true));
            buttons.forEach((btn) => (btn.disabled = true));
        }
    }, [isOpen, isPhoneScreen]);
    const handleSidebar = () => {
        dispatch(isMenuOpen(!isOpen));
        document.querySelector('#sidebar').classList.toggle('translate-x-0');
        document
            .querySelector('#sidebar')
            .classList.toggle('-translate-x-[22rem]');
    };

    return (
        <>
            <div className="fondo px-3">
                <div className="container mx-auto mt-5 flex items-center flex-col justify-center pb-40">
                    <header className="flex text-white w-full justify-between">
                        <HeaderLogo />
                        <LogOut name={name} onClick={handleLogout} />
                    </header>
                    <div className="xl:w-4/5 w-full">
                        <Outlet />
                        {isPhoneScreen && <BtnMenu onClick={handleSidebar} />}
                    </div>
                </div>
            </div>
        </>
    );
};
