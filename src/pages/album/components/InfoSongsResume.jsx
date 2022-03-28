import { InfoSongCard } from './InfoSongCard';

export const InfoSongsResume = ({ data }) => {
    const { canciones, type, info_basica, ISRC } = data;
    // console.log(ISRC);
    return (
        <>
            {!canciones.length ? (
                <div className="flex justify-center md:w-4/5 w-full py-10 px-3 rounded-lg shadow-md shadow-black/50">
                    <h2 className="text-xl mb-1 md:text-left font-normal text-slate-500">
                        Aún no has agregado ninguna canción
                    </h2>
                </div>
            ) : canciones[0] === 1 ? null : canciones.length === 1 &&
              type === 'album' ? (
                <div></div>
            ) : canciones.length > 1 && type === 'album' ? (
                canciones.map((album, i) => (
                    <div key={i} className="w-full">
                        <h3 className="text-xl mb-5">Volumen Nº{i + 1}</h3>
                        {album.volumen.map((song, x) => (
                            <InfoSongCard
                                key={song.id}
                                song={song}
                                info={info_basica}
                                codes={ISRC}
                            />
                        ))}
                    </div>
                ))
            ) : (
                canciones.map((album, i) => (
                    <div key={i} className="w-full">
                        {album.volumen.map((song) => (
                            <InfoSongCard
                                key={123}
                                song={song}
                                info={info_basica}
                                codes={ISRC}
                            />
                        ))}
                    </div>
                ))
            )}
        </>
    );
};

// {
// artistas_destacados: []
// audio: false
// composicion: ""
// compositores: []
// id: "abm-1-sng-1"
// idioma: ""
// lenguaje_explicito: ""
// otro_idioma: ""
// titulo: "a"
// version: ""
// }
