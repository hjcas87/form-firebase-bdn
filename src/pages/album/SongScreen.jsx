import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { startSaveRelease } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { getAllArtists } from '../../helpers/getAllArtists';
import { getSong } from '../../helpers/getSong';
import { isValidateSong } from '../../helpers/isValidateSong';
import { shootInfo } from '../../helpers/shootInfo';
import { useComposers } from '../../hooks/useComposers';
import { useFeatArtist } from '../../hooks/useFeatArtist';
import { useForm } from '../../hooks/useForm';
import { SvgInfo } from '../components/SvgInfo';
import { SvgMinus } from '../components/SvgMinus';
import { SvgPlus } from '../components/SvgPlus';
import { RadioButton } from './RadioButton';

export const SongScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { active: release } = useSelector((state) => state.realeases);
    const { canciones, info_basica, type, idArtista } = release;
    const { id:idParam } = useParams();
    // const data = getSong(release, idParam);
    // console.log(data);
    const {
        artista_principal,
        artistas_secundarios,
        artistas_destacados,
        composicion,
        compositores,
        idioma,
        titulo,
        lenguaje_explicito,
        otro_idioma,
        version,
        id,
        audio,
    } = getSong(release, idParam)[0];
    // console.log(compositores);

    const [song, setSong] = useState([]);

    const [composers, onAdd, onDelete, changes] = useComposers(compositores);
    // console.log(composers);

    const [featArtist, addArtist, deleteArtist, changesArtist] =
        useFeatArtist(artistas_destacados);

    const [formValues, handleInputChange] = useForm({
        artista_principal,
        lenguaje_explicito,
        version,
        composicion,
        idioma,
        otro_idioma,
        audio,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidateSong(song)) {
            release.canciones = canciones.map((album) => {
                return {
                    volumen: album.volumen.map((cancion) =>
                        cancion.id === id
                            ? {
                                  ...cancion,
                                  ...song,
                              }
                            : cancion
                    ),
                };
            });
            const { form } = getAllArtists(info_basica, release.canciones, idArtista)
            release.idArtista = form;
            if (type === 'album') {
                dispatch(await startSaveRelease(release, true));
                // dispatch(setFromSong(true));
                // navigate('/album');
            } else {
                // console.log(release);
                dispatch(await startSaveRelease(release));
            }
        }
    };
    useEffect(() => {
        if (type === 'simple') {
            dispatch(tabs(3));
            formValues.titulo = info_basica.titulo_album;
            formValues.artista_principal = info_basica.artista_principal;
            formValues.artistas_secundarios = info_basica.artistas_secundarios;
        }
    }, []);

    useEffect(() => {
        setSong({
            ...formValues,
            compositores: composers,
            artistas_destacados: featArtist,
        });
    }, [formValues, composers, featArtist]);
    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl mb-8">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    {titulo === '' ? 'Aún no agregaste el título' : titulo}
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 mx-auto"
            >
                <div className="flex flex-col w-full mx-auto">
                    <div className="flex flex-col w-full mx-auto">
                        <div className="grid grid-cols-[7fr_1fr] mx-auto justify-end items-center">
                            <input
                                type="text"
                                placeholder="Nombre del Artista/Banda"
                                name="artista_principal"
                                className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                autoComplete="off"
                                value={formValues.artista_principal || ''}
                                readOnly={
                                    info_basica.album_recopilatorio === 'No' ||
                                    info_basica.album_recopilatorio === ''
                                }
                                onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                                <SvgPlus onClick={addArtist} />
                                <SvgInfo
                                    onClick={() => shootInfo('colaboradores')}
                                />
                            </div>
                        </div>

                        {artistas_secundarios?.map((artist, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center"
                            >
                                <input
                                    type="text"
                                    name="artista_secundario"
                                    readOnly={
                                        info_basica.album_recopilatorio === 'No'
                                    }
                                    className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                    autoComplete="off"
                                    defaultValue={artist.artista_secundario}
                                />
                            </div>
                        ))}
                        {featArtist.map((artist, index) => (
                            <div key={`artist_${index}`}>
                                <select
                                    name="rol"
                                    className="mb-1 select focus:outline-none mt-4"
                                    onChange={(e) => changesArtist(e, index)}
                                    value={artist.rol}
                                >
                                    <option value="">Seleccioná un rol</option>
                                    <option value="Artista Destacado">
                                        Artista Destacado
                                    </option>
                                    <option value="Productor">Productor</option>
                                    <option value="Remixer">Remixer</option>
                                </select>
                                <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Artista Destacado"
                                        className="border-b w-full border-slate-400 pb-1 pt-3 outline-none mb-3"
                                        name="artista_destacado"
                                        value={artist.artista_destacado}
                                        onChange={(e) =>
                                            changesArtist(e, index)
                                        }
                                    />
                                    <SvgMinus
                                        onClick={() => deleteArtist(index)}
                                    />
                                </div>
                            </div>
                        ))}

                        <h2 className="text-2xl mt-12 mb-6 text-left">
                            Detalles de la canción
                        </h2>
                        <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                            <p className="text-lg text-left">
                                1-¿Esta canción contiene lenguaje explícito?
                            </p>

                            <SvgInfo onClick={() => shootInfo('explicito')} />
                        </div>
                        <RadioButton
                            content={'No'}
                            id={'no_lenguaje'}
                            name={'lenguaje_explicito'}
                            checked={formValues.lenguaje_explicito === 'No'}
                            value={'No'}
                            onChange={handleInputChange}
                        />
                        <RadioButton
                            content={'Si'}
                            id={'si_lenguaje'}
                            name={'lenguaje_explicito'}
                            checked={formValues.lenguaje_explicito === 'Si'}
                            value={'Si'}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                        <p className="text-lg text-left">
                            2-Idioma de la letra
                        </p>
                        <SvgInfo onClick={() => shootInfo('idioma_cancion')} />
                    </div>

                    <p className="my-4">
                        En que idioma se canta la letra de tu cancion:
                    </p>
                    <div className="d-flex flex-column mb-3">
                        <select
                            onChange={handleInputChange}
                            name="idioma"
                            value={formValues.idioma}
                            className="mb-1 select focus:outline-none"
                        >
                            <option value="">Seleccioná un idioma</option>
                            <option value="Español">Español</option>
                            <option value="Ingles">Ingles</option>
                            <option value="Instrumental">Instrumental</option>
                            <option value="Otro">Otro</option>
                        </select>

                        {formValues.idioma === 'Otro' && (
                            <div className="w-50">
                                <input
                                    type="text"
                                    placeholder="Idioma"
                                    autoComplete="off"
                                    className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                    value={formValues.otro_idioma}
                                    name="otro_idioma"
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                        <p className="text-lg text-left">
                            3-¿Esta version esta grabada en vivo?
                        </p>
                        <SvgInfo onClick={() => shootInfo('version')} />
                    </div>
                    <RadioButton
                        content={'No'}
                        id={'no_vivo'}
                        name={'version'}
                        checked={formValues.version === 'Grabación de estudio'}
                        value="Grabación de estudio"
                        onChange={handleInputChange}
                    />
                    <RadioButton
                        content={'Si'}
                        id={'en_vivo'}
                        name={'version'}
                        checked={formValues.version === 'Grabación en vivo'}
                        value="Grabación en vivo"
                        onChange={handleInputChange}
                    />

                    <div className="grid grid-cols-[8fr_1fr] w-full mx-auto justify-end items-center">
                        <p className="text-lg text-left">
                            4-Tipo de composición
                        </p>
                        <SvgInfo onClick={() => shootInfo('composicion')} />
                    </div>
                    <RadioButton
                        content={'Composición original'}
                        id="original"
                        name="composicion"
                        checked={formValues.composicion === 'original'}
                        value="original"
                        onChange={handleInputChange}
                    />
                    <RadioButton
                        content={'Cover'}
                        id="cover"
                        name="composicion"
                        checked={formValues.composicion === 'cover'}
                        value="cover"
                        onChange={handleInputChange}
                    />
                    <RadioButton
                        content={'Dominio Público'}
                        id="dominio"
                        name="composicion"
                        checked={formValues.composicion === 'dominio_publico'}
                        value="dominio_publico"
                        onChange={handleInputChange}
                    />

                    {composers.map((field, index) => (
                        <div key={index} className="w-full mx-auto">
                            <div className="w/full sm:w-4/5 mx-auto">
                                <p className="my-4 text-xl text-left">
                                    Nombre del compositor de esta canción.
                                </p>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nombre compositor"
                                        autoComplete="off"
                                        className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                                        name="compositor"
                                        value={field.compositor}
                                        onChange={(e) => changes(e, index)}
                                    />
                                </div>

                                <p className="my-4 text-lg text-left">
                                    Como contribuyó este artista en esta
                                    canción.
                                </p>
                                <RadioButton
                                    content={'Letra'}
                                    id={`letra_${index + 1}`}
                                    name={`rol_autor_${field.counter}`}
                                    checked={
                                        field[`rol_autor_${field.counter}`] ===
                                        'Letra'
                                    }
                                    value="Letra"
                                    onChange={(e) => changes(e, index)}
                                />

                                <RadioButton
                                    content={'Música'}
                                    id={`musica_${index + 1}`}
                                    name={`rol_autor_${field.counter}`}
                                    checked={
                                        field[`rol_autor_${field.counter}`] ===
                                        'Música'
                                    }
                                    value="Música"
                                    onChange={(e) => changes(e, index)}
                                />

                                <RadioButton
                                    content={'Letra y Música'}
                                    id={`letra_y_musica_${index + 1}`}
                                    name={`rol_autor_${field.counter}`}
                                    checked={
                                        field[`rol_autor_${field.counter}`] ===
                                        'Letra y Música'
                                    }
                                    value="Letra y Música"
                                    onChange={(e) => changes(e, index)}
                                />

                                <RadioButton
                                    content={'No se'}
                                    id={`no_sabe_${index + 1}`}
                                    name={`rol_autor_${field.counter}`}
                                    checked={
                                        field[`rol_autor_${field.counter}`] ===
                                        'no_sabe'
                                    }
                                    value="no_sabe"
                                    onChange={(e) => changes(e, index)}
                                />
                            </div>
                            <div className="w-full mx-auto flex">
                                <button
                                    type="button"
                                    className="bg-[#f26659] shadow-lg  hover:bg-[#f78479] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                                    onClick={() => onDelete(index)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex mt-3">
                        <div
                            className="bg-[#45a29e] hover:bg-[#3d918d] shadow-xl text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto text-center cursor-pointer"
                            onClick={onAdd}
                        >
                            + Agregar Compositor
                        </div>
                    </div>

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
