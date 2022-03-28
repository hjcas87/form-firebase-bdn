import { SpinnerScreen } from '../pages/components/SpinnerScreen';
import { HeaderLogo } from './HeaderLogo';


export const LoadingScreen = () => {
    return (
        <>
            <div className="fondo px-3">
                <div className="container mx-auto mt-5 flex items-center flex-col justify-center pb-40">
                    <header className="flex text-white w-full justify-between">
                        <HeaderLogo />
                    </header>
                </div>
                <SpinnerScreen />
            </div>
        </>
    );
};
