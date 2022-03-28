import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';
import { RadioButton } from './RadioButton';
export const DistInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { opciones_distribucion, type } = release;
    const [formValues, handleInputChange] = useForm(opciones_distribucion);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.opciones_distribucion.trim().length === 0) {
            return shootError('Todos los campos son obligatorios');
        }
        dispatch(startSaveRelease(release));
    };

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(7));
        } else {
            dispatch(tabs(6));
        }
    }, []);

    useEffect(() => {
        release.opciones_distribucion = formValues.opciones_distribucion;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                Distribución
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <div className="flex flex-col w-full">
                        <div className="w-full m-auto text-left my-4">
                            <RadioButton
                                content={'Servicios de Descargas + Streaming.'}
                                id={'descargas_y_streaming'}
                                name={'opciones_distribucion'}
                                checked={
                                    formValues.opciones_distribucion ===
                                    'Descargas y streaming'
                                }
                                value={'Descargas y streaming'}
                                onChange={handleInputChange}
                            />
                            <div>
                                <p>
                                    Incluye todas las plataformas de descargas,
                                    además los servicios de streaming tales
                                    como: Spotify, Apple Music, Pandora, YouTube
                                    Music, Deezer y otros.
                                </p>
                            </div>
                            <RadioButton
                                content={'Solo descargas.'}
                                id={'solo_descargas'}
                                name={'opciones_distribucion'}
                                checked={
                                    formValues.opciones_distribucion ===
                                    'Solo descargas'
                                }
                                value="Solo descargas"
                                onChange={handleInputChange}
                            />
                            <div>
                                <p>
                                    Incluye solamente las tiendas que venden
                                    descargas de tu música y no los servicios de
                                    streaming que provean a los usuarios el
                                    acceso a las pistas que no hayan comprado o
                                    no les hayan pertenecido antes. Esto no
                                    incluirá servicios como Spotify, Youtube, o
                                    Apple Music.
                                </p>
                            </div>
                            <RadioButton
                                content={
                                    'Todos, incluso los que no sean de pago.'
                                }
                                id="todos"
                                name={'opciones_distribucion'}
                                checked={
                                    formValues.opciones_distribucion ===
                                    'Todos, incluso los que no sean de pago'
                                }
                                value="Todos, incluso los que no sean de pago"
                                onChange={handleInputChange}
                            />
                            <div>
                                <p>
                                    Incluye lugares que ofrecen descargas y
                                    transmisiones gratuitas.
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                        >
                            Guardar y continuar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
