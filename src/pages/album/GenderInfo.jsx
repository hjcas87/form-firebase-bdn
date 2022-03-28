import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';

export const GenderInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { generoYLocalizacion, type } = release;
    const [formValues, handleInputChange] = useForm(generoYLocalizacion);

    const {
        genero_1,
        genero_2,
        localizacion,
        artista_similar_1,
        artista_similar_2,
        artista_similar_3,
    } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            genero_1.trim().length === 0 ||
            genero_2.trim().length === 0 ||
            localizacion.trim().length === 0 ||
            artista_similar_1.trim().length === 0 ||
            artista_similar_2.trim().length === 0 ||
            artista_similar_3.trim().length === 0
        ) {
            return shootError('Todos los campos son obligatorios');
        } else {
            dispatch(startSaveRelease(release));
        }
    };

    useEffect(() => {
        release.generoYLocalizacion = formValues;
    }, [formValues]);

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(5));
        } else {
            dispatch(tabs(4));
        }
    }, []);

    return (
        <div className="bg-transparent">
            <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight mb-10">
                <div className="w-full bg-[#1f2833] rounded-t-xl">
                    <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                        Género Musical
                    </h2>
                </div>

                <div className="flex flex-col items-center w-4/5 py-5 mb-8">
                    <p className="font-light text-lg text-left w-full">
                        Decinos dos generos musicales con los cuales
                        identifiques tu música
                    </p>
                    <div className="w-full ">
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Género Nº1"
                                name="genero_1"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={genero_1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Género Nº2"
                                name="genero_2"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={genero_2}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight mb-10">
                <div className="w-full bg-[#0b0c10] rounded-t-xl">
                    <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                        Localización
                    </h2>
                </div>

                <div className="flex flex-col items-center w-4/5 py-5 mb-8">
                    <p className="font-light text-lg text-left w-full">
                        De donde es la banda o artista?
                    </p>
                    <div className='w-full'>
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Localización"
                                name="localizacion"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={localizacion}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
                <div className="w-full bg-[#0b0c10] rounded-t-xl">
                    <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                        Artistas Similares
                    </h2>
                </div>

                <div className="flex flex-col items-center w-4/5 pt-5">
                    <p className="font-light text-lg text-left w-full">
                        Decinos tres artistas con los cuales te identifiques
                    </p>
                    <div className='w-full'>
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Artista Nº1"
                                name="artista_similar_1"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={artista_similar_1}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Artista Nº2"
                                name="artista_similar_2"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={artista_similar_2}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Artista Nº3"
                                name="artista_similar_3"
                                autoComplete="off"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                value={artista_similar_3}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </div>
        </div>
    );
};
