import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SongCards } from './SongCards';
import { tabs } from '../../actions/ui';

export const SongList = () => {
    const dispatch = useDispatch();
    const { setVisibleTab } = useSelector((state) => state.ui);
    const { active: release } = useSelector((state) => state.realeases);
    const { canciones } = release;

    useEffect(() => {
        dispatch(tabs(4));
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white">
                    Canciones
                </h2>
            </div>
            <form className="flex flex-col items-center w-4/5 pt-5">
                <div className="flex flex-col w-full">
                    {canciones.length === 0 ? (
                        <div className="w-4/5 flex flex-col justify-center items-center mx-auto">
                            <h2 className="text-3xl mt-8 mb-12 text-center">
                                Completá la información del álbum para continuar
                            </h2>

                            <button
                                onClick={() => setVisibleTab(3)}
                                type="button"
                                className="bg-[#45a29e] hover:bg-[#3d918d] shadow-xl ml-2 text-lg text-white py-2 font-normal px-5 rounded-lg hover:cursor-pointer w-3/5"
                            >
                                Ir
                            </button>
                        </div>
                    ) : (
                        canciones.map((album, i) => (
                            <div key={i} className="w-4/5 mx-auto">
                                <h2 className="md:text-4xl text-3xl my-12 text-center md:text-left">
                                    Canciones del álbum Nº{i + 1}
                                </h2>
                                {album.volumen.map((cancion, i) => (
                                    <SongCards
                                        key={i}
                                        song={cancion}
                                        index={i}
                                    />
                                ))}
                            </div>
                        ))
                    )}
                    <button
                        onClick={() => setVisibleTab(5)}
                        type="button"
                        className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
};
