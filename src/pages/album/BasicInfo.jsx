import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { activeRelease, startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { getAllArtists } from '../../helpers/getAllArtists';
import { shootError } from '../../helpers/shootError';
import { shootInfo } from '../../helpers/shootInfo';
import { useForm } from '../../hooks/useForm';
import { SvgInfo } from '../components/SvgInfo';
import { SvgMinus } from '../components/SvgMinus';
import { SvgPlus } from '../components/SvgPlus';
import { RadioButton } from './RadioButton';

export const BasicInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { info_basica, type, canciones, idArtista } = release;
    const [
        formValues,
        handleInputChange,
        handleAddArtist,
        handleSubstracArtist,
        handleArrayInputChange,
    ] = useForm(info_basica);
    const {
        artista_principal,
        artistas_secundarios,
        fecha_lanzamiento,
        idioma,
        titulo_album,
        album_recopilatorio,
    } = formValues;

    const handleSave = () => {
        if (
            artista_principal.trim().length === 0 ||
            fecha_lanzamiento.trim().length === 0 ||
            idioma.trim().length === 0 ||
            (album_recopilatorio.trim().length === 0 && type === 'album') ||
            titulo_album.trim().length === 0
        ) {
            return shootError('Todos los campos son obligatorios');
        } else if (
            artistas_secundarios.length !== 0 &&
            artistas_secundarios.some(
                (artista) => artista.artista_secundario.trim().length === 0
            )
        ) {
            return shootError('Dinos el nombre de los artistas secundarios');
        } else {
            // console.log(album_recopilatorio);
            if (
                album_recopilatorio === '' ||
                (album_recopilatorio === 'No' && canciones.length)
            ) {
                canciones.forEach((item) =>
                    item.volumen.forEach((song) => {
                        song.titulo = titulo_album;
                        song.artista_principal = artista_principal;
                        song.artistas_secundarios = artistas_secundarios;
                    })
                );
            }
            const { form } = getAllArtists(info_basica, canciones, idArtista);
            release.idArtista = form;
            dispatch(startSaveRelease(release));
        }
    };
    useEffect(() => {
        release.info_basica = formValues;
        dispatch(activeRelease(release.id, { ...release }));
    }, [formValues]);

    useEffect(() => {
        dispatch(tabs(1));
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Informacion Básica
                </h2>
            </div>

            <form className="flex flex-col items-center w-4/5 pt-5">
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full mx-auto">
                        {type === 'album' && (
                            <>
                                <div className="grid grid-cols-[8fr_1fr] mt-5 w-full mx-auto justify-end items-center">
                                    <p className="text-lg text-left">
                                        ¿Este es un álbum recopilatorio?
                                    </p>

                                    <SvgInfo
                                        onClick={() =>
                                            shootInfo('recopilacion')
                                        }
                                    />
                                </div>
                                <RadioButton
                                    content={'No'}
                                    id={'no_lenguaje'}
                                    name={'album_recopilatorio'}
                                    checked={
                                        formValues.album_recopilatorio === 'No'
                                    }
                                    value={'No'}
                                    onChange={handleInputChange}
                                />
                                <RadioButton
                                    content={'Si'}
                                    id={'si_lenguaje'}
                                    name={'album_recopilatorio'}
                                    checked={
                                        formValues.album_recopilatorio === 'Si'
                                    }
                                    value={'Si'}
                                    onChange={handleInputChange}
                                />
                            </>
                        )}
                        <div className="grid grid-cols-[8fr_1fr] mx-auto w-full justify-end items-center">
                            <input
                                type="text"
                                placeholder="Idioma del Lanzamiento"
                                name="idioma"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                autoComplete="off"
                                value={idioma}
                                onChange={handleInputChange}
                            />
                            <SvgInfo
                                onClick={() => shootInfo('idioma_lanzamiento')}
                            />
                        </div>

                        <div className="grid grid-cols-[7fr_1fr] mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Nombre del Artista/Banda"
                                name="artista_principal"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                autoComplete="off"
                                value={artista_principal}
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                                <SvgPlus
                                    onClick={
                                        artistas_secundarios.length <= 10
                                            ? () =>
                                                  handleAddArtist(
                                                      artistas_secundarios,
                                                      'artistas_secundarios',
                                                      'artista_secundario'
                                                  )
                                            : () =>
                                                  shootError(
                                                      'No puedes agregar mas de 10 artistas'
                                                  )
                                    }
                                />
                                <SvgInfo
                                    onClick={() =>
                                        shootInfo('artista_principal')
                                    }
                                />
                            </div>
                        </div>
                        {artistas_secundarios.map((artista, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[8fr_1fr] w-full mx-auto items-center"
                            >
                                <input
                                    type="text"
                                    placeholder="Nombre del Artista Secundario"
                                    name="artista_secundario"
                                    className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                    autoComplete="off"
                                    value={artista.artista_secundario}
                                    onChange={(e) =>
                                        handleArrayInputChange(
                                            e,
                                            i,
                                            artistas_secundarios,
                                            'artistas_secundarios'
                                        )
                                    }
                                />
                                <div className="justify-self-end">
                                    <SvgMinus
                                        onClick={() =>
                                            handleSubstracArtist(
                                                i,
                                                artistas_secundarios,
                                                'artistas_secundarios'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Título del Lanzamiento"
                                name="titulo_album"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                autoComplete="off"
                                value={titulo_album}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                            <input
                                type="date"
                                placeholder="Fecha de Lanzamiento"
                                name="fecha_lanzamiento"
                                className="w-full bg-transparent border-b border-slate-400 pb-1 pt-6 outline-none mb-3 appearance-none"
                                autoComplete="off"
                                value={fecha_lanzamiento}
                                onChange={handleInputChange}
                            />

                            <SvgInfo onClick={() => shootInfo('fecha')} />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </form>
        </div>
    );
};
