import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { createArrayIsrcCodes } from '../../helpers/createArrayIsrcCodes';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';
import { RadioButton } from './RadioButton';

export const IsrcInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { ISRC, type, canciones } = release;
    const [
        formValues,
        handleInputChange,
        ,
        ,
        handleArrayInputChange,
        setValues,
    ] = useForm(ISRC);

    const { codigo_ISRC, num_codigo } = formValues;
    // console.log(canciones[0].volumen[0].titulo);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.codigo_ISRC.length === 0) {
            return shootError('Todos los campos son obligatorios');
        } else if (
            formValues.codigo_ISRC === 'no_necesita_codigos' &&
            num_codigo.every(
                (ipt) => ipt[Object.keys(ipt)[0]].trim().length === 0
            )
        ) {
            return shootError(
                'Por favor dinos al menos un código para tus canciones'
            );
        }
        if (formValues.codigo_ISRC === 'necesita_codigos') {
            formValues.num_codigo = [];
        }
        dispatch(startSaveRelease(release));
    };

    useEffect(() => {
        if (codigo_ISRC === 'no_necesita_codigos') {
            setValues({
                ...formValues,
                num_codigo: createArrayIsrcCodes(canciones, num_codigo),
            });
        }
    }, [codigo_ISRC]);

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(6));
        } else {
            dispatch(tabs(5));
        }
    }, []);

    useEffect(() => {
        release.ISRC = formValues;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Códigos ISRC
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <p className="font-light text-lg text-left w-full">
                        El ISRC es un código identificativo único para cada
                        canción de un álbum. Como un código de barras, los ISRC
                        son necesarios para la distribución digital.
                    </p>

                    <div className="flex flex-col w-full">
                        <div className="w-full m-auto text-left my-4">
                            <RadioButton
                                content={'Necesito los códigos ISRC.'}
                                id={'necesita_codigos'}
                                name={'codigo_ISRC'}
                                checked={codigo_ISRC === 'necesita_codigos'}
                                value={'necesita_codigos'}
                                onChange={handleInputChange}
                            />
                            <RadioButton
                                content={'Tengo mis propios códigos ISRC.'}
                                id={'no_necesita_codigos'}
                                name={'codigo_ISRC'}
                                checked={codigo_ISRC === 'no_necesita_codigos'}
                                value={'no_necesita_codigos'}
                                onChange={handleInputChange}
                            />
                        </div>
                        {codigo_ISRC === 'no_necesita_codigos' &&
                            (!canciones.length ||
                            canciones[0].volumen[0].titulo === '' ? (
                                <p className="font-light text-base text-left">
                                    Completá la información del álbum para continuar.
                                </p>
                            ) : (
                                <>
                                    <p className="font-light text-base text-left">
                                        A continuación escribi al menos el
                                        código para una canción Si necesitas el
                                        código para alguna cancion en particular
                                        deja el espacio en blanco.
                                    </p>
                                    {num_codigo.map((cancion, i) => (
                                        <div
                                            key={i}
                                            className="w-full mx-auto justify-end items-center"
                                        >
                                            <input
                                                type="text"
                                                placeholder={Object.keys(
                                                    cancion
                                                )}
                                                name={Object.keys(cancion)}
                                                className="w-full bg-transparent border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                                                autoComplete="off"
                                                value={Object.values(cancion)}
                                                onChange={(e) =>
                                                    handleArrayInputChange(
                                                        e,
                                                        i,
                                                        num_codigo,
                                                        'num_codigo'
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                </>
                            ))}

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
