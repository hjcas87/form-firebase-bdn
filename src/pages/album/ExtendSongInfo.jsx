import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';
import { RadioButton } from './RadioButton';
export const ExtendSongInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { canciones_extendidas, type } = release;
    const [formValues, handleInputChange] = useForm(canciones_extendidas);
    // console.log(formValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.cancion_extendida.trim().length === 0) {
            return shootError('Todos los campos son obligatorios');
        } else if (
            formValues.cancion_extendida === 'si' &&
            formValues.solo_album.trim().length === 0
        ) {
            return shootError('Todos los campos son obligatorios');
        } else if (formValues.cancion_extendida === 'no') {
            formValues.solo_album = '';
        }

        dispatch(startSaveRelease(release, null));
    };

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(9));
        } else {
            dispatch(tabs(8));
        }
    }, []);

    useEffect(() => {
        release.canciones_extendidas = formValues;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Canciones Extendidas
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <p className="font-light text-lg text-left w-full">
                        ??Tenes alguna canci??n que dure 10 o m??s minutos?
                    </p>
                    <div className="flex flex-col w-full">
                        <div className="w-full m-auto text-left my-4">
                            <RadioButton
                                content={'No'}
                                id={'no_tengo_cancion_ext'}
                                name="cancion_extendida"
                                checked={formValues.cancion_extendida === 'no'}
                                value="no"
                                onChange={handleInputChange}
                            />
                            <RadioButton
                                content={'Si'}
                                id="si_tengo_cancion_ext"
                                name="cancion_extendida"
                                checked={formValues.cancion_extendida === 'si'}
                                value="si"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {formValues.cancion_extendida === 'si' && (
                        <>
                            <p className="font-light text-base text-left w-full">
                                Algunas plataformas digitales ofrecen una
                                funci??n de "solo ??lbum" para canciones
                                extendidas de m??s de 10 minutos.
                                <br />
                                Si optas por vender tus canciones extendidas en
                                "solo ??lbum", las plataformas elegibles har??n
                                que tu canci??n extendida est?? disponible SOLO
                                como parte de una descarga de ??lbum completo.{' '}
                                <br />
                                Sin embargo, elegir esta opci??n hace que tu
                                ??lbum no sea elegible para su distribuci??n en
                                los servicios de transmisi??n y su monetizaci??n
                                en YouTube.
                                <br />
                                Nota: Apple Music convierte autom??ticamente
                                todas las canciones de m??s de 10 minutos en
                                canciones para "solo ??lbum", independientemente
                                de la selecci??n que hagas aqu??.
                            </p>
                            <div className="flex flex-col">
                                <div className="w-full m-auto text-left my-4">
                                    <RadioButton
                                        content={
                                            'Hacer que las canciones extendidas est??n disponibles para descargas y transmisiones con precio predeterminado.'
                                        }
                                        id="solo_album"
                                        name="solo_album"
                                        checked={
                                            formValues.solo_album ===
                                            'no_solo_album'
                                        }
                                        value="no_solo_album"
                                        onChange={handleInputChange}
                                    />
                                    <RadioButton
                                        content={
                                            'Hacer que las canciones extendidas est??n disponibles para "solo ??lbum" y no distribuir esta versi??n a los servicios de transmisi??n.'
                                        }
                                        id="no_solo_album"
                                        name="solo_album"
                                        checked={
                                            formValues.solo_album ===
                                            'si_solo_album'
                                        }
                                        value="si_solo_album"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </form>
        </div>
    );
};
