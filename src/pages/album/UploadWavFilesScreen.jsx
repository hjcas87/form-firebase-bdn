import { async } from '@firebase/util';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUploadingAudio, startAudioEditing } from '../../actions/releases';
import { tabs } from '../../actions/ui';
import { data } from '../../data/menuAlbum';
import { confirmEditAlert } from '../../helpers/confirmEditAlert';
import { shootError } from '../../helpers/shootError';

export const UploadWavFilesScreen = () => {
    const dispatch = useDispatch();
    const { active: release } = useSelector((state) => state.realeases);
    const { setVisibleTab, progress } = useSelector((state) => state.ui);
    const { canciones, type } = release;
    // console.log(release);
    const [data, setData] = useState({});
    const [song, setSong] = useState({});

    const handleUploadFile = (songChoose) => {
        document.querySelector('#fileSelector').click();
        setSong({
            ...song,
            ...songChoose,
        });
    };
    // console.log(data);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = /(.mpeg|.wav)$/i;
        if (file) {
            // if (!allowedExtensions.exec(file.type)) {
            //     return shootError('Los archivos solo deben ser WAV o MP3');
            // } else {
            dispatch(startUploadingAudio(file, song));
            // }
        }
    };
    const handleEditFile = async (song) => {
        if (await confirmEditAlert(true)) {
            dispatch(startAudioEditing(song));
        }
    };
    useEffect(() => {
        setData({
            ...progress,
        });
    }, [progress]);

    useEffect(() => {
        if (type === 'album') {
            dispatch(tabs(11));
        } else {
            dispatch(tabs(10));
        }
    }, []);
    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Audio
                </h2>
            </div>

            <form
                // onSubmit={handleSubmit}
                className="flex flex-col items-center w-4/5 pt-5"
            >
                <div className="flex flex-col w-full items-center">
                    <p className="font-normal text-lg text-left w-full">
                        Tu audio debe ser:
                    </p>
                    <ul>
                        <li className="font-light text-base text-left w-full">
                            Carga archivos de alta calidad tanto en formato WAV.
                            Los archivos deben ser estéreo, 44,1 kHz velocidad
                            de muestra y 16bit. (Puedes cargar archivos MP3 que
                            cumplan con los requisitos, pero no es
                            recomendable).
                        </li>
                        <li>
                            <span className="font-normal">
                                {' '}
                                Envialos numerados o titulados.
                            </span>
                        </li>
                    </ul>

                    <div className="flex flex-col w-full items-center py-3">
                        {!canciones.length ||
                        !canciones[0].volumen[0].titulo ? (
                            <>
                                <p className="text-lg mt-10">
                                    Aún no has agregado ninguna cancion
                                </p>

                                <button
                                    onClick={() =>
                                        type === 'album'
                                            ? setVisibleTab(4)
                                            : setVisibleTab(3)
                                    }
                                    type="button"
                                    className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                                >
                                    Agregar canciones
                                </button>
                            </>
                        ) : (
                            canciones.map((vol, i) =>
                                vol.volumen.map((song, x) => (
                                    <div
                                        key={x}
                                        className="flex flex-col w-full my-2"
                                    >
                                        <div className="flex justify-between w-full items-center pb-3">
                                            <p className="text-lg capitalize">
                                                {x + 1} - {song.titulo}
                                            </p>
                                            <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                id="fileSelector"
                                                onChange={(e) =>
                                                    handleFileChange(e, song)
                                                }
                                            />
                                            {song.audio ? (
                                                <div className="flex justify-around items-center mb-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-8 w-8"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="green"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    <div
                                                        className="ml-3 cursor-pointer"
                                                        onClick={() =>
                                                            handleEditFile(song)
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="#45a29e"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : data.progress &&
                                              data.id === song.id ? (
                                                <div className="bk-chase">
                                                    <div className="bk-chase-dot"></div>
                                                    <div className="bk-chase-dot"></div>
                                                    <div className="bk-chase-dot"></div>
                                                    <div className="bk-chase-dot"></div>
                                                    <div className="bk-chase-dot"></div>
                                                    <div className="bk-chase-dot"></div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleUploadFile(song)
                                                    }
                                                    disabled={progress}
                                                    type="button"
                                                    className="bg-[#45a29e] hover:bg-[#3d918d] shadow-xl ml-2 text-lg text-white py-2 font-normal px-5 rounded-lg hover:cursor-pointer flex items-center"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 mr-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                        />
                                                    </svg>
                                                    Subir
                                                </button>
                                            )}
                                        </div>

                                        {data.progress &&
                                        data.id === song.id ? (
                                            <>
                                                <div className="w-full">
                                                    <div
                                                        className="h-2 border w-0 bg-indigo-700 transition-all rounded-lg"
                                                        style={{
                                                            width: `${data.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <p>
                                                            {(
                                                                data.current /
                                                                1048576
                                                            ).toFixed(2)}
                                                            /
                                                            {(
                                                                data.total /
                                                                1048576
                                                            ).toFixed(2)}{' '}
                                                            Mb
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                ))
                            )
                        )}
                    </div>
                    <button
                        type="button"
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Ver resumen
                    </button>
                </div>
            </form>
        </div>
    );
};
