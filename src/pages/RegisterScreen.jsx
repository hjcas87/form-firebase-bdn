import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import validator from 'validator';
import { startRegisterWithEmailAndPassword } from '../actions/auth';
import { useForm } from '../hooks/useForm';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPass: '',
    });
    const { name, email, password, confirmPass } = formValues;
    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailAndPassword(email, password, name));
        }
    };

    const isFormValid = () => {
        if (
            Object.values(formValues).some((value) => value.trim().length === 0)
        ) {
            shootBug('Todos los campos son obligatorios');
            return false;
        } 
        // else if (!validator.isEmail(email)) {
        //     shootBug('Introduce un email válido');
        //     return false;
        // }
         else if (password.trim().length < 6) {
            shootBug('La contraseña debe tener al menos 6 caracteres');
            return false;
        } else if (password !== confirmPass) {
            shootBug('Asegurate de que las contraseñas coincidan');
            return false;
        }
        return true;
    };
    const shootBug = (msg) => {
        Swal.fire({
            title: 'Error!',
            text: msg,
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    };
    return (
        <div className="md:w-6/12 w-full shadow-xl shadow-black bg-white rounded-2xl flex flex-col items-center px-3">
            <h2 className="text-4xl my-12 text-center">Registrate</h2>

            <form
                onSubmit={handleRegister}
                className="md:w-4/6 w-full flex flex-col items-center"
            >
                <div className="flex flex-col px-8 md:w-full w-5/6">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                            autoComplete="off"
                            value={name}
                            onChange={handleInputChange}
                        />

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
                            className="border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                            autoComplete="off"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="confirmPass"
                            className="border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                            autoComplete="off"
                            value={confirmPass}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-stone-900 shadow-xl shadow-black hover:bg-black text-white font-bold py-2 px-4 rounded-lg mt-14 mb-10"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
            <p className='text-center mb-10 px-8'>
                Ya tenes una cuenta? <Link to="/auth" className="font-bold">Inicia Sesión</Link>
            </p>
        </div>
    );
};
