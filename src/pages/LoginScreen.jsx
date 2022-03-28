import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import validator from 'validator';
import {
    startLoginWithEmailAndPassword,
    startLoginWithGoogle,
} from '../actions/auth';
import { shootError } from '../helpers/shootError';
import { useForm } from '../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.ui);
    const [formValues, handleInputChange] = useForm({
        email: 'correo@correo.com',
        password: '123456',
    });
    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startLoginWithEmailAndPassword(email, password));
        }
    };
    const handleGoogleLogin = () => {
        dispatch(startLoginWithGoogle());
    };
    const isFormValid = () => {
        if (
            Object.values(formValues).some((value) => value.trim().length === 0)
        ) {
            shootError('Todos los campos son obligatorios');
            return false;
        } 
        // else if (!validator.isEmail(email)) {
        //     shootError('Introduce un email válido');
        //     return false;
        // }
        return true;
    };

    return (
        <div className="md:w-6/12 w-full bg-white rounded-2xl flex flex-col items-center px-3 shadow-xl shadow-black">
            <h2 className="text-4xl my-12 text-center">Inicia sesión</h2>
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <div className="flex flex-col px-8 md:w-full w-5/6">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            className="border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                            autoComplete="off"
                            value={email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="border-b border-slate-400 pb-1 pt-3 outline-none mb-3"
                            autoComplete="off"
                            value={password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-stone-900 shadow-xl shadow-black hover:bg-black text-white font-bold py-2 px-4 rounded-lg mt-14 mb-10"
                        disabled={loading}
                    >
                        Login
                    </button>
                </div>
                <div className='flex flex-col items-center px-8'>
                    <p className="text-center">O inicia sesión con tu cuenta de Google</p>
                    <div className="border-slate-400 border rounded-lg hover:cursor-pointer w-full p-6 flex flex-col items-center justify-center my-10 text-center shadow-2xl shadow-black" onClick={handleGoogleLogin}>
                        <div className="w-10 mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                            >
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                        </div>
                        <p className="font-light">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <p className='text-center mb-10 px-8'>
                    No tenes cuenta?{' '}
                    <Link to="/auth/register" className="font-bold">Crear Cuenta</Link>
                </p>
            </form>
        </div>
    );
};
