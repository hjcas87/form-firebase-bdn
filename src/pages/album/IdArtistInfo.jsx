import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllArtists } from '../../helpers/getAllArtists';
import { startSaveRelease } from '../../actions/releases';
import {
    filterSpotifyArtists,
    getArtistForSpotify,
} from '../../actions/services';

import { tabs } from '../../actions/ui';
import { shootError } from '../../helpers/shootError';
import { useForm } from '../../hooks/useForm';
import { RadioButton } from './RadioButton';

export const IdArtistInfo = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { artistId } = useSelector((state) => state.services);
    const { info_basica, canciones, idArtista, type } = release;
    const { form, artistsProfiles } = useMemo(
        () => getAllArtists(info_basica, canciones, idArtista),
        [info_basica, canciones, idArtista]
    );

    const [formValues, , , , handleInputChange, setValues] = useForm({ form });

    const handleSubmit = () => {
        const regEx = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
        if (
            formValues.form.some(
                (value) => Object.values(value)[0].trim().length === 0
            )
        ) {
            return shootError('Todos los campos son obligatorios');
        }
        if (
            formValues.form.some(
                (value) =>
                    Object.values(value)[0] !== 'No tiene perfil de artista' &&
                    !regEx.test(Object.values(value)[0])
            )
        ) {
            return shootError('Esa no es una URL válida');
        }
        release.idArtista = formValues.form;
        dispatch(startSaveRelease(release));
    };

    const handleClickArtists = (artist, id) => {
        artistsProfiles.map((art) => art.id === id && (art.loading = true));
        dispatch(filterSpotifyArtists(artistsProfiles));
        dispatch(getArtistForSpotify(artist, artistsProfiles, id));
    };

    const handleFocus = (e) => {
        [...document.querySelectorAll('input')].forEach((ipt) =>
            ipt.name === e.target.name ? (ipt.checked = false) : null
        );
    };

    const handleChangeRadio = (e) => {
        [...document.querySelectorAll('input[type=text]')].forEach((ipt) =>
            ipt.name === e.target.name ? (ipt.value = '') : null
        );
    };

    const handleClickResetArtists = (id) => {
        artistsProfiles.map((art) => art.id === id && (art.value = ''));
        const newForm = form.map((art, i) => {
            if (i === id) {
                art[Object.keys(art)[0]] = '';
                return art;
            } else {
                return art;
            }
        });
        formValues.form = newForm;
        setValues({ form });
        dispatch(filterSpotifyArtists(artistsProfiles));
    };
    useEffect(() => {
        dispatch(filterSpotifyArtists(artistsProfiles));
    }, [artistsProfiles]);
    useEffect(() => {
        setValues({ form });
    }, [form]);

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(8));
        } else {
            dispatch(tabs(7));
        }
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Perfil de artista
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <p className="font-light text-lg text-left w-full">
                        Algunas plataformas (como Spotify y Apple Music) asignan
                        un ID único a cada nombre de artista para agrupar los
                        lanzamientos del artista en el perfil de artista
                        correcto. Si es la primera vez que publicas música en
                        estas plataformas, te crearan un nuevo perfil de artista
                        cuando se envíe tu lanzamiento. Si ya lanzaste música en
                        estas plataformas, ya tenes un perfil de artista en cada
                        plataforma. Si este es tu caso haznoslo saber.
                    </p>

                    <div className="flex flex-col w-full">
                        {artistId.map((artist, i) => (
                            <div
                                key={i}
                                className="rounded-2xl flex flex-col my-10 shadow-lg w-full mx-auto border border-black/30 shadow-black/30"
                            >
                                {artist.name.trim().length !== 0 && (
                                    <div className="bg-[#0b0c10] rounded-t-2xl">
                                        <h2 className="text-xl capitalize my-4 text-white px-4">
                                            {artist.name}
                                        </h2>
                                    </div>
                                )}
                                {artist.value.trim().length > 0 ? (
                                    <>
                                        <p className="mt-5 mb-2 px-5 text-lg">
                                            Perfil seleccionado:
                                        </p>
                                        {artist.value ===
                                        'No tiene perfil de artista' ? (
                                            <div>
                                                <p className="mt-1 mb-3 px-5 font-bold">
                                                    {artist.value}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <a
                                                    href={artist.value}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 mb-3 flex px-5 h-5 gap-3 items-center text-indigo-900 font-bold"
                                                >
                                                    Abrir en una ventana nueva
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                        <div
                                            onClick={() =>
                                                handleClickResetArtists(
                                                    artist.id
                                                )
                                            }
                                            className="bg-[#0b0c10] shadow-lg shadow-black/50 hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg w-4/5 mx-auto flex justify-center my-5 cursor-pointer"
                                        >
                                            Editar
                                        </div>
                                    </>
                                ) : artist.name.trim().length === 0 ? (
                                    <div className="bg-[#c5c6c7] rounded-lg">
                                        <p className="my-5 p-5 text-center text-[#1f2833] text-xl">
                                            Aún no agregaste ningún artista a
                                            este lanzamiento
                                        </p>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column w-100">
                                        {artist.loading ? (
                                            <p className="my-5 px-5 text-lg animate__animated animate__flash">
                                                Loading...
                                            </p>
                                        ) : !artist.loading &&
                                          artist.notFound ? (
                                            <div className="pt-5">
                                                <p className="mb-2 px-5 text-lg">
                                                    Encontramos (
                                                    {artist.datos.length})
                                                    resultados para este artista
                                                </p>
                                                <p className="my-5 px-5 font-bold">
                                                    No encontramos perfil para
                                                    este artista
                                                </p>
                                            </div>
                                        ) : !artist.loading &&
                                          artist.datos.length > 0 ? (
                                            <>
                                                <p className="my-5 px-5">
                                                    Encontramos (
                                                    {artist.datos.length})
                                                    resultados para este artista
                                                </p>
                                                {artist.datos.map((data, x) => (
                                                    <div key={data.name + x}>
                                                        <div className="flex px-5">
                                                            <RadioButton
                                                                content={
                                                                    <a
                                                                        href={
                                                                            data.link
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="mb-3 flex h-5 items-center text-indigo-900"
                                                                    >
                                                                        Abrir en
                                                                        una
                                                                        ventana
                                                                        nueva
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-6 w-6 ml-3"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                                            />
                                                                        </svg>
                                                                    </a>
                                                                }
                                                                id={artist.name}
                                                                name={
                                                                    artist.name
                                                                }
                                                                value={
                                                                    data.link
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        e,
                                                                        i,
                                                                        formValues.form,
                                                                        'form'
                                                                    )
                                                                }
                                                                onClick={
                                                                    handleChangeRadio
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div className="py-5 rounded-b-2xl">
                                                <p className="mb-2 px-5 text-lg">
                                                    Buscá o consultá acerca de
                                                    este perfil de artista
                                                </p>
                                                <div className="w-full px-5">
                                                    <RadioButton
                                                        // dark={true}
                                                        content={
                                                            'No tiene perfil de artista (se creará uno nuevo)'
                                                        }
                                                        id={`no_tengo_id${i}`}
                                                        name={artist.name}
                                                        value="No tiene perfil de artista"
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                i,
                                                                formValues.form,
                                                                'form'
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="d-flex justify-center">
                                                    <div
                                                        onClick={() =>
                                                            handleClickArtists(
                                                                artist,
                                                                i
                                                            )
                                                        }
                                                        className="bg-[#0b0c10] shadow-lg shadow-black/50 hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg w-4/5 mx-auto flex justify-center my-5 cursor-pointer"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                            />
                                                        </svg>
                                                        Buscar
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {(!artist.loading && artist.datos.length > 0) ||
                                artist.notFound ? (
                                    <div className="py-5">
                                        <div className="px-5 flex flex-col">
                                            <p className="text-base font-bold">
                                                Si por alguna razon tu perfil no
                                                aparece aqui, copiá y pegá el
                                                link del mismo.
                                            </p>
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="border-b border-slate-400 pb-1 pt-3 outline-none mb-3 capitalize"
                                                name={artist.name}
                                                placeholder={artist.name}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        i,
                                                        formValues.form,
                                                        'form'
                                                    )
                                                }
                                                onFocus={handleFocus}
                                            />
                                        </div>
                                        <div className="flex px-5 mb-10">
                                            <RadioButton
                                                content={
                                                    'No tiene perfil de artista (se creará uno nuevo)'
                                                }
                                                id={`no_tengo_id${i}`}
                                                name={artist.name}
                                                value="No tiene perfil de artista"
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        e,
                                                        i,
                                                        formValues.form,
                                                        'form'
                                                    )
                                                }
                                                onClick={handleChangeRadio}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                                {!artist.loading && artist.notFound && (
                                    <button
                                        onClick={() =>
                                            handleClickArtists(artist, i)
                                        }
                                        className="bg-[#0b0c10] shadow-lg shadow-black/50 hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg w-4/5 mx-auto flex justify-center mb-5 cursor-pointer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                            />
                                        </svg>
                                        Reintentar
                                    </button>
                                )}
                            </div>
                        ))}
                        {artistId[0] &&
                            artistId[0].name.trim().length !== 0 && (
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="bg-[#1f2833] hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                                >
                                    Guardar y continuar
                                </button>
                            )}{' '}
                    </div>
                </div>
            </form>
        </div>
    );
};
