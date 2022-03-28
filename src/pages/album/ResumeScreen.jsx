import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isValidRelease } from '../../helpers/isValidRelease';
import { SvgMinus } from '../components/SvgMinus';
import { SvgPlus } from '../components/SvgPlus';
import { BasicInfoResume } from './components/BasicInfoResume';
import { DistResume } from './components/DistResume';
import { Fields } from './components/Fields';
import { InfoSongsResume } from './components/InfoSongsResume';

export const ResumeScreen = () => {
    const { active: release } = useSelector((state) => state.realeases);
    // console.log(release);
    const {
        info_basica,
        idArtista,
        generoYLocalizacion,
        codigo_barra,
        canciones: songs,
        ISRC,
        finalized,
        opciones_distribucion,
        type,
    } = release;
    // console.log(ISRC);
    const [canciones, setCanciones] = useState(songs);
    // console.log(idArtista);

    const handleClose = () => {
        if (canciones[0] === 1) {
            setCanciones(songs);
        } else {
            setCanciones([1]);
        }
    };
    useEffect(() => {
      isValidRelease(release)
    }, [])
    

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col items-center shadow-xl animate__animated animate__slideInRight">
            <div className="w-full bg-[#1f2833] rounded-t-xl">
                <h2 className="md:text-4xl text-3xl my-10 text-center font-light text-white w-4/5 mx-auto">
                    Resumen del proyecto
                </h2>
            </div>

            <form
                className="flex flex-col md:items-center w-full pt-5 p-3"
            >
                <BasicInfoResume
                    data={{ info_basica, generoYLocalizacion, codigo_barra }}
                />
                {type === 'album' ? (
                    <>
                        <div className="flex w-full items-center justify-between sm:justify-start my-10">
                            <h2 className="md:text-4xl text-3xl font-light">
                                Canciones
                            </h2>
                            <div className="sm:ml-10">
                                {canciones[0] === 1 ? (
                                    <SvgPlus onClick={handleClose} />
                                ) : (
                                    <SvgMinus onClick={handleClose} />
                                )}
                            </div>
                        </div>
                        <InfoSongsResume
                            data={{ canciones, type, info_basica, ISRC }}
                        />
                    </>
                ) : (
                    <>
                        <h2 className="md:text-4xl text-3xl my-10 font-light">
                            Canción
                        </h2>
                        <InfoSongsResume
                            data={{ canciones, type, info_basica, ISRC }}
                        />
                    </>
                )}
                <div className="w-full mt-5">
                    <h2 className="md:text-4xl mb-5 text-3xl font-light">
                        Distribución
                    </h2>
                    <DistResume
                        idArtista={idArtista}
                        opciones_distribucion={opciones_distribucion}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                        <button
                            type="submit"
                            className="bg-[#1f2833] shadow-xl hover:bg-[#171a21] text-white font-normal py-2 px-4 rounded-lg mt-14 mb-10 w-4/5 mx-auto"
                        >
                            Distribuir
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
