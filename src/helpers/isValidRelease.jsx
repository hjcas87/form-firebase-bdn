export const isValidRelease = (release) => {
    const {
        info_basica,
        idArtista,
        generoYLocalizacion,
        codigo_barra,
        canciones: songs,
        canciones_extendidas,
        ISRC,
        finalized,
        opciones_distribucion,
        type,
    } = release;

    console.log(release);
    // if (
    //     info_basica.artista_principal.trim().length === 0 ||
    //     info_basica.fecha_lanzamiento.trim().length === 0 ||
    //     info_basica.idioma.trim().length === 0 ||
    //     (info_basica.album_recopilatorio.trim().length === 0 &&
    //         type === 'album') ||
    //     info_basica.titulo_album.trim().length === 0 ||
    //     !info_basica.photoUrl ||
    //     info_basica.photoUrl.trim().length === 0 ||
    //     (info_basica.artistas_secundarios.length &&
    //         info_basica.artistas_secundarios.some(
    //             (artista) => artista.artista_secundario.trim().length === 0
    //         ))
    // ) {
    //     return false;
    // } else if (
    //     !opciones_distribucion ||
    //     opciones_distribucion.trim().length === 0
    // ) {
    //     return false;
    // } else if (
    //     codigo_barra.solicitaUpc.trim().length === 0 ||
    //     (codigo_barra.solicitaUpc === 'No necesito un código de barras' &&
    //         codigo_barra.UPC.trim().length === 0)
    // ) {
    //     return false;
    // } else if (
    //     generoYLocalizacion.genero_1.trim().length === 0 ||
    //     generoYLocalizacion.genero_2.trim().length === 0 ||
    //     generoYLocalizacion.localizacion.trim().length === 0 ||
    //     generoYLocalizacion.artista_similar_1.trim().length === 0 ||
    //     generoYLocalizacion.artista_similar_2.trim().length === 0 ||
    //     generoYLocalizacion.artista_similar_3.trim().length === 0
    // ) {
    //     return false;
    // } else if (
    //     !idArtista.length ||
    //     idArtista.some((id) => Object.values(id)[0].trim().length === 0)
    // ) {
    //     return false;
    // } else if (
    //     canciones_extendidas.cancion_extendida.trim().length === 0 ||
    //     (canciones_extendidas.cancion_extendida === 'si' &&
    //         canciones_extendidas.solo_album.trim().length === 0)
    // ) {
    //     return false;
    // } else if (
    //     ISRC.codigo_ISRC.length === 0 ||
    //     (ISRC.codigo_ISRC === 'no_necesita_codigos' &&
    //         ISRC.num_codigo.every(
    //             (ipt) => ipt[Object.keys(ipt)[0]].trim().length === 0
    //         ))
    // ) {
    //     return false;
    // } else
    const valid = songs.map((item) => {
        return item.volumen.map(
            (song) =>
                (!song.artista_principal ||
                !song.titulo ||
                !song.id ||
                !song.artistas_destacados ||
                !song.composicion ||
                !song.compositores ||
                !song.idioma ||
                !song.lenguaje_explicito ||
                !song.otro_idioma ||
                !song.version ||
                !song.audio ||
                song.lenguaje_explicito.trim().length === 0 ||
                (song.artistas_destacados.length !== 0 &&
                    song.artistas_destacados.some(
                        (artist) =>
                            artist.rol.trim().length === 0 ||
                            artist.artista_destacado.trim().length === 0
                    )) ||
                song.idioma.trim().length === 0 ||
                (song.idioma.trim() === 'Otro' &&
                    song.otro_idioma.trim().length === 0) ||
                song.version.trim().length === 0 ||
                song.composicion.trim().length === 0 ||
                song.compositores.length === 0 ||
                song.compositores.some(
                    (composer) =>
                        composer.compositor.trim().length === 0 ||
                        composer[`rol_autor_${composer.counter}`].trim()
                            .length === 0
                )) ? null : true
        );
    });
    console.log(valid);
    if (
        songs.some((item) => {
            item.volumen.some((song) => {
                !song.artista_principal ? false : true;
            });
        })
    ) {
        console.log('no hay audio');
    }
};
