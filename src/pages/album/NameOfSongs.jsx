import { useEffect } from 'react';
import { useForm } from '../../hooks/useForm';

export const NameOfSongs = ({ album, index }) => {
    const [formValues, , , , handleArrayInputChange, setValues] = useForm({
        album,
    });

    useEffect(() => {
        setValues({ album });
    }, [album]);

    return (
        <>
            <div className="w-full bg-[#0bc10] mb-8">
                <h2 className="text-3xl my-10 mb-8 md:text-left text-center font-light w-4/5 mx-auto">
                    Titúlos de las canciones del álbum Nº{index + 1}{' '}
                </h2>
            </div>
            {album.volumen.map((cancion, i) => (
                <div key={i} className="w-4/5 mx-auto">
                    <input
                        type="text"
                        placeholder={`Nombre de la canción Nº${i + 1}`}
                        name="cancion"
                        className="border-b w-full border-slate-400 pb-1 pt-6 outline-none mb-3"
                        autoComplete="off"
                        value={cancion.cancion}
                        onChange={(e) =>
                            handleArrayInputChange(
                                e,
                                i,
                                formValues.album.volumen,
                                'volumen'
                            )
                        }
                    />
                </div>
            ))}
        </>
    );
};
