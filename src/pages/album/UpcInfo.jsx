import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { shootError } from '../../helpers/shootError';
import { shootInfo } from '../../helpers/shootInfo';
import { useForm } from '../../hooks/useForm';
import { SvgInfo } from '../components/SvgInfo';
import { RadioButton } from './RadioButton';

export const UpcInfo = () => {
    const dispatch = useDispatch();
    const { setVisibleTab, visibleTab } = useSelector((state) => state.ui);
    const { active: release } = useSelector((state) => state.realeases);
    const { codigo_barra } = release;
    const [formValues, handleInputChange] = useForm(codigo_barra);

    const { solicitaUpc, UPC } = formValues;
    const handleSave = () => {
        if (solicitaUpc.trim().length === 0) {
            return shootError('Todos los campos son obligatorios');
        } else if (
            solicitaUpc === 'No necesito un código de barras' &&
            UPC.trim().length === 0
        ) {
            return shootError(
                'Por favor dinos el código de barra para este lanzamiento'
            );
        } else {
            dispatch(startSaveRelease(release));
        }
    };

    useEffect(() => {
        release.codigo_barra = formValues;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);

    useEffect(() => {
        dispatch(tabs(2));
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Código de barras (UPC)
                </h2>
            </div>

            <form className="flex flex-col items-center w-4/5 pt-5">
                <div className="flex flex-col w-full">
            <p className="font-light text-lg text-left w-full">
                Un código de barras (UPC) le da a tu álbum un identificador
                exclusivo para la distribución digital y física.
            </p>
                    <div className="flex flex-col w-full mx-auto">
                        <RadioButton
                            content={'Necesito un código de barras.'}
                            id={'Necesito_upc'}
                            name={'solicitaUpc'}
                            checked={
                                solicitaUpc === 'Necesito un código de barras'
                            }
                            value={'Necesito un código de barras'}
                            onChange={handleInputChange}
                        />
                        <RadioButton
                            content={'Tengo mi propio código de barras.'}
                            id={'No_necesito_upc'}
                            checked={
                                solicitaUpc ===
                                'No necesito un código de barras'
                            }
                            name={'solicitaUpc'}
                            value={'No necesito un código de barras'}
                            onChange={handleInputChange}
                        />
                    </div>

                    {solicitaUpc === 'No necesito un código de barras' ? (
                        <div>
                            <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                                <input
                                    type="text"
                                    placeholder="Código de Barras"
                                    name="UPC"
                                    className="w-full bg-transparent border-b border-slate-400 pb-1 pt-6 outline-none mb-3"
                                    autoComplete="off"
                                    value={UPC}
                                    onChange={handleInputChange}
                                />
                                <SvgInfo onClick={() => shootInfo('upc')} />
                            </div>
                        </div>
                    ) : (
                        (formValues.UPC = '')
                    )}

                    <button
                        onClick={handleSave}
                        type="button"
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </form>
        </div>
    );
};
