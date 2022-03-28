import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { inputsForAlbums, inputsForSongs, tabs } from '../../actions/ui';
import { createAlbumsWithSongsAndId } from '../../helpers/createAlbumsWithSongsAndId';
import { createInputsForAlbums } from '../../helpers/createInputsForAlbums';
import { createInputsForSongs } from '../../helpers/createInputsForSongs';
import { validateDuplicateElements } from '../../helpers/validateDuplicateElements';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';
import { NameOfSongs } from './NameOfSongs';

export const AlbumInformation = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { info_album, canciones } = release;
    const { inputsAlbums, inputsSongs } = useSelector((state) => state.ui);
    const [
        formValues,
        handleInputChange,
        ,
        ,
        handleArrayInputChange,
        setValues,
    ] = useForm(info_album);
    const { cantidad_discos } = formValues;

    const handleCreateAlbums = (e) => {
        e.preventDefault();
        if (
            cantidad_discos.trim().length > 0 &&
            Number(cantidad_discos) <= 10 &&
            Number(cantidad_discos) > 0
        ) {
            const values = createInputsForAlbums(
                cantidad_discos,
                formValues.inputsAlbums
            );
            dispatch(inputsForAlbums(values));
        } else {
            shootError(
                'Este campo no puede ir vacio, ingresá una cantidad del 1 al 10 para continuar'
            );
        }
    };

    const handleCreateSongs = (e) => {
        e.preventDefault();
        if (
            formValues.inputsAlbums.some((ipt) => ipt.disco.trim().length === 0)
        ) {
            shootError('Este campo no puede ir vacio');
            return;
        }
        if (
            formValues.inputsAlbums.some((ipt) => Number(ipt.disco) <= 0) ||
            formValues.inputsAlbums.some((ipt) => Number(ipt.disco) > 50)
        ) {
            shootError('Ingresá una cantidad del 1 al 50 para continuar');
            return;
        } else {
            const values = createInputsForSongs(
                formValues.inputsAlbums,
                formValues.inputsSongs
            );
            dispatch(inputsForSongs(values));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Number(cantidad_discos) !== formValues.inputsAlbums.length) {
            shootError('Asegurate de completar los campos correctamente 1');
            return;
        } else if (
            formValues.inputsAlbums.length !== formValues.inputsSongs.length
        ) {
            shootError('Asegurate de completar los campos correctamente');
            return;
        } else if (areTheySameValues().some((value) => value !== true)) {
            shootError('Asegurate de completar los campos correctamentes');
            return;
        } else if (noEmptyField().some((value) => value !== false)) {
            shootError('Los nombres de las canciones no pueden ir vacios');
        } else if (
            validateDuplicateElements(formValues.inputsSongs, 'cancion').some(
                (arr) => arr.length !== 0
            )
        ) {
            shootError('Revisa que los nombres de tus canciones no se repitan');
            return;
        } else {
            release.canciones = createAlbumsWithSongsAndId(
                formValues.inputsSongs,
                canciones
            );
            dispatch(startSaveRelease(release));
        }
    };
    const areTheySameValues = () => {
        return formValues.inputsAlbums.map((ipt, i) =>
            formValues.inputsSongs[i] &&
            Number(ipt.disco) !== formValues.inputsSongs[i].volumen.length
                ? false
                : true
        );
    };
    const noEmptyField = () => {
        const arr = formValues.inputsSongs.map((iptArr) =>
            iptArr.volumen.map((ipt) =>
                ipt.cancion.trim().length === 0 ? true : false
            )
        );
        return arr.map((iptarr) => iptarr.some((ipt) => ipt !== false));
    };

    useEffect(() => {
        setValues({
            ...formValues,
            inputsAlbums,
        });
    }, [inputsAlbums]);

    useEffect(() => {
        setValues({
            ...formValues,
            inputsSongs,
        });
    }, [inputsSongs]);
    useEffect(() => {
        setValues(info_album);
    }, []);
    useEffect(() => {
        dispatch(tabs(3));
    }, []);

    useEffect(() => {
        release.info_album = formValues;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);
    return (
        <div className="bg-transparent">
            <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
                <div className="w-full bg-[#1f2833] rounded-t-xl">
                    <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                        Número de discos
                    </h2>
                </div>

                <div className="flex flex-col items-center w-4/5 pt-5">
                    <p className="font-light text-lg text-left w-full">
                        ¿Cuántos discos/volúmenes tiene tu álbum? (Para la
                        mayoría de los artistas, la respuesta será uno, pero si
                        estás lanzando un álbum doble o una caja de colección,
                        por favor dinos cuántos discos hay en la caja).
                    </p>
                    <div className="mx-auto w-full justify-center items-end flex mt-8 pb-20">
                        <div className="w-14 mr-2">
                            <input
                                type="number"
                                id="cantidad_discos"
                                min="0"
                                max="10"
                                name="cantidad_discos"
                                className="border-b w-full pl-5 text-2xl border-slate-400 pb-1 outline-none"
                                autoComplete="off"
                                value={cantidad_discos}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            onClick={handleCreateAlbums}
                            disabled={
                                Number(cantidad_discos) === inputsAlbums.length
                            }
                            type="button"
                            className="bg-[#45a29e] shadow-xl ml-2 text-xl hover:bg-[#3d918d] text-white py-4 font-normal px-5 rounded-lg hover:cursor-pointer"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {formValues.inputsAlbums.length ? (
                    <div className="w-full mt-8 rounded-2xl bg-white flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
                        <div className="w-full rounded-t-xl bg-[#0b0c10] mb-8">
                            <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white w-4/5 mx-auto">
                                Número de canciones por disco
                            </h2>
                        </div>
                        <div className="mx-auto w-3/5 flex flex-col items-center">
                            {formValues.inputsAlbums.map((input, i) => (
                                <div key={i} className="w-14 mx-auto">
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        name="disco"
                                        className="border-b w-full mt-4 pl-5 text-2xl border-slate-400 pb-1 outline-none"
                                        autoComplete="off"
                                        value={input.disco}
                                        onChange={(e) =>
                                            handleArrayInputChange(
                                                e,
                                                i,
                                                formValues.inputsAlbums,
                                                'inputsAlbums'
                                            )
                                        }
                                    />
                                </div>
                            ))}

                            {formValues.inputsAlbums.length && (
                                <button
                                    onClick={handleCreateSongs}
                                    type="button"
                                    className="bg-[#45a29e] shadow-xl ml-2 text-xl hover:bg-[#3d918d] text-white py-4 font-normal px-5 rounded-lg my-8"
                                >
                                    Ok
                                </button>
                            )}
                        </div>
                    </div>
                ) : null}
                {formValues.inputsSongs.length ? (
                    <div className="w-full mt-8 rounded-2xl bg-white flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
                        <div className="w-full rounded-t-xl bg-[#0b0c10] mb-8">
                            <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white w-4/5 mx-auto">
                                Titúlos
                            </h2>
                        </div>
                        <form className="flex flex-col items-center w-4/5 pt-5">
                            <div className="flex flex-col w-full">
                                {formValues.inputsSongs.map((album, i) => (
                                    <NameOfSongs
                                        key={i}
                                        album={album}
                                        index={i}
                                    />
                                ))}
                                {formValues.inputsSongs.length && (
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                                    >
                                        Guardar y continuar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
