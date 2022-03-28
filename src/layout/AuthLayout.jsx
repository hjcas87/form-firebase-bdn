import { Outlet } from 'react-router-dom';

// const imgPath = require.context('../assets', true);

export const AuthLayout = () => {
    return (
        <div className="fondo px-3">
            <div className="container mx-auto mt-12 flex items-center flex-col justify-center pb-40">
                <div className="flex justify-center md:absolute left-8 top-8 w-52">
                    <a href="https://bdn.com.ar/">
                        <img src="../src/assets/bdn-header.png" alt="logo-bdn" />
                    </a>
                </div>
                <header>
                    <h1 className="text-5xl text-center font-light text-white my-10">Comenzá a subir tu música</h1>
                </header>
                <Outlet />
            </div>
        </div>
    );
};
