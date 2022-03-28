import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCoverEditing, startUploadingCover } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { confirmEditAlert } from '../../helpers/confirmEditAlert';
import { shootError } from '../../helpers/shootError';

export const UploadFileScreen = () => {
    const { active: release } = useSelector((state) => state.realeases);
    const { setVisibleTab, visibleTab } = useSelector((state) => state.ui);
    const { info_basica, type } = release;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(null);
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const URL = window.URL || window.webkitURL;
        const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        // console.log(file);
        if (file) {
            if (file.size <= 25000000) {
                if (!allowedExtensions.exec(file.type)) {
                    return shootError(
                        'Los archivos solo deben ser PNG, GIF, JPG, o JPEG'
                    );
                }
                const img = new Image();
                img.onload = function () {
                    if (this.width >= 1400 && this.height >= 1400 && this.width === this.height) {
                        setLoading(true);
                        dispatch(startUploadingCover(file));
                    } else {
                        return shootError(
                            'Asegurate que las medidas de la imagen no esten por debajo de lo requerido y sea una imagen cuadrada'
                        );
                    }
                };
                img.src = URL.createObjectURL(file);
            } else {
                return shootError('El archivo no puede pesar mas de 25mb');
            }
        }
    };
    const handleFileEdit = async () => {
        if (await confirmEditAlert(false)) {
            dispatch(startCoverEditing());
        }
    };

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(10));
        } else {
            dispatch(tabs(9));
        }
    }, []);
    useEffect(() => {
        if (info_basica.photoUrl) {
            setLoading(null)
        }
    }, [info_basica.photoUrl]);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Portada
                </h2>
            </div>

            <form
                // onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <p className="font-normal text-lg text-left w-full">
                        Tu portada debe ser:
                    </p>
                    <ul>
                        <li className="font-light text-base text-left w-full">
                            3000 x 3000 píxeles (preferido) o 1400 x 1400
                            píxeles
                        </li>
                        <li className="font-light text-base text-left w-full">
                            Tipo de archivo PNG, GIF, JPG, o JPEG
                        </li>
                        <li className="font-light text-base text-left w-full">
                            72 - 300ppp (300ppp es el mejor)
                        </li>
                        <li className="font-light text-base text-left w-full">
                            Menos de 25mb
                        </li>
                        <li className="font-light text-base text-left w-full">
                            Esquema de color RGB (no CMYK)
                        </li>
                        <li className="font-light text-base text-left w-full">
                            Exclusiva para este proyecto. No podemos aceptar
                            diseños que han sido usados en otro proyecto.
                        </li>
                        <li className="font-light text-base text-left w-full">
                            Tu imagen debe ser igual a la de tu producto físico.
                        </li>
                    </ul>

                    <div className="flex flex-col w-full items-center">
                        {info_basica.photoUrl ? (
                            <div
                                className="w-80 md:mb-0 mb-5 h-80 overflow-hidden flex justify-center items-center mt-5 hover:cursor-pointer hover:opacity-90 relative"
                                style={
                                    info_basica.photoUrl && {
                                        backgroundImage: `url(${info_basica.photoUrl})`,
                                        backgroundSize: 'cover',
                                    }
                                }
                            >
                                <p
                                    onClick={handleFileEdit}
                                    className="text-lg opacity-0 hover:opacity-100 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center transition-all"
                                >
                                    <span className="p-3 bg-white/75 rounded-full transition-all">
                                        Cambiar portada
                                    </span>
                                </p>
                            </div>
                        ) : !info_basica.photoUrl && loading ? (
                            <div className='flex justify-center items-center w-72 h-72 animate__animated animate__flash'>

                                <p className='text-xl'>Cargando...</p>
                            </div>
                        ) : (
                            <div
                                onClick={handlePictureClick}
                                className="border-2 border-[#888] flex justify-center mt-10 rounded-xl w-72 p-8 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-40 w-40"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="#888"
                                    strokeWidth={1}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                        )}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            id="fileSelector"
                            onChange={handleFileChange}
                        />
                        {info_basica.photoUrl ? (
                            <button
                                onClick={() => setVisibleTab(visibleTab + 1)}
                                type="button"
                                className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                            >
                                Continuar
                            </button>
                        ) : (
                            <button
                                onClick={handlePictureClick}
                                type="button"
                                className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                            >
                                Cargar portada
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};
