export const getSong = (release, id) => {
    const { canciones } = release;
    const { artista_principal, artistas_secundarios, titulo_album } = release.info_basica;

    if (release.type === 'simple') {
        return [{
            titulo: titulo_album,
            id: 1,
            artista_principal: artista_principal,
            artistas_secundarios: artistas_secundarios,
            artistas_destacados:
                canciones[0].volumen[0].artistas_destacados || [],
            composicion: canciones[0].volumen[0].composicion || '',
            compositores: canciones[0].volumen[0].compositores || [],
            idioma: canciones[0].volumen[0].idioma || '',
            lenguaje_explicito:
                canciones[0].volumen[0].lenguaje_explicito || '',
            otro_idioma: canciones[0].volumen[0].otro_idioma || '',
            version: canciones[0].volumen[0].version || '',
            audio: canciones[0].volumen[0].audio || false,
        }];
    } else {
        let songs = [];
        canciones.forEach((album) =>
            album.volumen.forEach((song) => (songs = [...songs, song]))
        );
        return songs
            .map((song, i) => ({
                ...song,
                titulo_album,
                artista_principal,
                artistas_secundarios,
            }))
            .filter((song) => (song.id === id));
    }
};
