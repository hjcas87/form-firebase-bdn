export const getAllArtists = (
    info_basica,
    albumsAndSongsValues,
    idArtista = []
) => {
    const { artista_principal, artistas_secundarios } = info_basica;
    // console.log(albumsAndSongsValues);
    let artistas = [artista_principal];

    artistas_secundarios?.forEach(
        (artist) => (artistas = [...artistas, artist.artista_secundario])
    );

    albumsAndSongsValues?.forEach((album) =>
        album.volumen.forEach((song) =>
            song.artistas_destacados?.forEach(
                (artist) => (artistas = [...artistas, artist.artista_destacado])
            )
        )
    );
    // console.log(artistas);
    const artist = artistas.map((a) => a.toLowerCase());

    const result = artist.filter(
        (item, index) => artist.indexOf(item) === index
    );

    const form = result.map((res, i) => {
        return idArtista[i] &&
            Object.keys(idArtista[i]) &&
            Object.keys(idArtista[i])[0] === res
            ? { [res]: Object.values(idArtista[i])[0] }
            : { [res]: '' };
    });

    const artistsProfiles = form.map((profile, i) => ({
        name: Object.keys(profile)[0],
        loading: false,
        notFound: false,
        datos: [],
        id: i,
        value: Object.values(profile)[0],
    }));

    // console.log(artistsProfiles);
    return {
        form,
        artistsProfiles,
    };
};
